const { Post, User, Booking } = require('../db/models')
const router = require('express').Router()
const multer = require('multer')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/tmp/imgs')
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})
const upload = multer({ storage })
const cloudinaryUpload = require('cloudinary').v2.uploader.upload

router.get('/', (req, res, next) => {
  Post.findAll()
    .then(posts => res.json(posts))
    .catch(err => next(err))
})

router.get('/:id', (req, res, next) => {
  Post.findById(req.params.id, { include: [User] })
    .then(post => {
      return res.json(post)
    })
    .catch(err => next(err))
})

router.get('/:id/bookings', (req, res, next) => {
  Booking.findAll({ where: { postId: req.params.id } })
    .then(bookings => res.json(bookings))
    .catch(err => next(err))
})

router.post('/', upload.single('file'), (req, res, next) => {
  const postData = {
    title: req.body.title,
    description: req.body.description,
    price: +req.body.price,
    userId: req.user.id,
  }
  const createPost = newPost => {
    Post.create(newPost)
      .then(post => res.status(201).json(post))
      .catch(dberr => next(dberr))
  }
  if (req.file) {
    return cloudinaryUpload(`/tmp/imgs/${req.file.filename}`, (err, result) => {
      if (err) console.error(err.message)
      postData.imageUrl = result.secure_url
      createPost(postData)
    })
  }
  createPost(postData)
})

router.post('/:id/bookings', (req, res, next) => {
  const date = 'parsed req.body.date'
  const bookingData = {
    date: date,
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
