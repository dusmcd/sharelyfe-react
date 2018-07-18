const { User } = require('../../db/models')
const router = require('express').Router()
const { encryptPassword } = require('../../db/models/user')

router.get('/me', (req, res, next) => {
  return res.json(req.user)
})

router.post('/signup', (req, res, next) => {
  return User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
  })
    .then(user => req.login(user, err => (err ? next(err) : res.json(user))))
    .catch(err => next(err))
})

router.post('/login', (req, res, next) => {
  return User.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (!user) {
        const error = new Error('Incorrect email/password combination')
        error.status = 401
        next(error)
      } else if (
        user.password() === encryptPassword(req.body.password, user.salt())
      ) {
        req.login(user, err => (err ? next(err) : res.json(user)))
      } else {
        const error = new Error('Incorrect email/password combination')
        error.status = 401
        next(error)
      }
    })
    .catch(err => next(err))
})

router.post('/logout', (req, res, next) => {
  req.logout()
  res.end()
})

module.exports = router
