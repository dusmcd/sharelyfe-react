const Sequelize = require('sequelize')

const database =
  process.env.NODE_ENV === 'test' ? 'sharelyfe-test' : 'sharelyfe'

const db = new Sequelize(`postgres://localhost:5432/${database}`, {
  logging: false,
})

module.exports = db
