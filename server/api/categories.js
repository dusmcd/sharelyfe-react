const router = require('express').Router()
const { Category, Post } = require('../db/models')

router.get('/', (req, res, next) => {
  return Category.findAll()
    .then(categories => res.json(categories))
    .catch(err => next(err))
})

router.get('/posts', (req, res, next) => {
  return Category.findAll({
    include: [{ model: Post }],
  })
    .then(categories => {
      // going through categories and limiting posts to only 3
      const limitedCategories = categories.map(category => {
        let limitedPosts = []
        if (category.posts) {
          limitedPosts = category.dataValues.posts.slice(0, 3)
        }
        return { ...category.dataValues, posts: limitedPosts }
      })
      res.json(limitedCategories)
    })
    .catch(err => next(err))
})

router.get('/:id/posts', (req, res, next) => {
  return Category.findByPk(req.params.id, {
    include: [{ model: Post }],
  }).then(category => res.json(category))
})

module.exports = router
