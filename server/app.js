const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const path = require('path')
const passport = require('passport')
const session = require('express-session')
const cloudinary = require('cloudinary')

if (process.env.NODE_ENV !== 'production') {
  require('../secrets')
}

const { User, db } = require('./db/models')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const dbStore = new SequelizeStore({ db: db })
dbStore.sync()

app.use(morgan('dev'))
app.use(bodyParser.json({ extended: false }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '..', 'client', 'public')))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: dbStore,
  })
)
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
  done(null, user.id)
})
passport.deserializeUser((id, done) => {
  return User.findById(id)
    .then(user => {
      done(null, user)
      return null
    })
    .catch(err => done(err))
})

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// api routes
app.use('/api', require('./api'))

app.get('*', (req, res, next) => {
  res.sendFile('index.html', {
    root: path.join(__dirname, '..', 'client', 'public'),
  })
})

// error handling middleware
app.use((err, req, res, next) => {
  console.error('Error message:', err.stack)
  res.status(err.status || 500).send(err.message || 'Internal Server Error')
})
app.use((req, res, next) => {
  res.status(404).send('Not found')
})

module.exports = app
