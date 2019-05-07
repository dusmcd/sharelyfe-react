const router = require('express').Router()
const { User } = require('../../db/models')

router.get('/get', (req, res, next) => {
  User.findAll()
    .then(users => res.json(users))
    .catch(err => next(err))
})

module.exports = router
