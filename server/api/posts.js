const { Post, User, Booking, db } = require('../db/models')
const CategoryPost = db.model('category_post')
const router = require('express').Router()
const multer = require('multer')
const Op = require('sequelize').Op
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/tmp')
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})
const upload = multer({ storage })
const cloudinaryUpload = require('cloudinary').v2.uploader.upload

router.get('/', (req, res, next) => {
  if (req.query.search) {
    return Post.filterPosts(req.query)
      .then(posts => {
        return res.json(posts)
      })
      .catch(err => next(err))
  } else {
    Post.findAll()
      .then(posts => res.json(posts))
      .catch(err => next(err))
  }
})

router.get('/:id', (req, res, next) => {
  Post.findByPk(req.params.id, {
    include: [User, Booking],
    order: [[Booking, 'startDate']],
  })
    .then(post => {
      post.formatBookings()
      return res.json(post)
    })
    .catch(err => next(err))
})

router.get('/:id/bookings', (req, res, next) => {
  Booking.findAll({
    where: {
      postId: req.params.id,
      startDate: {
        [Op.gte]: new Date(Date.now()),
      },
    },
  })
    .then(bookings => res.json(bookings))
    .catch(err => next(err))
})

router.post('/', upload.single('file'), (req, res, next) => {
  const postData = {
    title: req.body.title,
    description: req.body.description,
    price: +req.body.price,
    userId: req.user.id,
    category: +req.body.category,
  }
  const createPost = newPost => {
    Post.create(newPost)
      .then(post => {
        return CategoryPost.create({
          categoryId: newPost.category,
          postId: post.id,
        })
      })
      .then(categoryPost => res.status(201).json({ id: categoryPost.postId }))
      .catch(dberr => next(dberr))
  }
  if (req.file) {
    return cloudinaryUpload(`/tmp/${req.file.filename}`, (err, result) => {
      if (err) console.error(err.message)
      postData.imageUrl = result.secure_url
      createPost(postData)
    })
  }
  createPost(postData)
})

router.post('/:id/bookings', (req, res, next) => {
  const bookingData = {
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    payment: req.body.payment,
    price: req.body.price,
    userId: req.user.id,
    postId: req.params.id,
  }
  Booking.create(bookingData)
    .then(booking => res.status(201).json(booking))
    .catch(err => next(err))
})

module.exports = router
