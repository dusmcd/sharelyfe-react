const Sequelize = require('sequelize')

const database =
  process.env.NODE_ENV === 'test' ? 'guitar-store-test' : 'guitar-store'

const db = new Sequelize(`postgres://localhost:5432/${database}`, {
  logging: false,
})

module.exports = db
