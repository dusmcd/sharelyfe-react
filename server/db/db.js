const Sequelize = require('sequelize')

const database =
  process.env.NODE_ENV === 'test' ? 'sharelyfe-test' : 'sharelyfe'
const isLogging = process.env.NODE_ENV === 'production'

const db = new Sequelize(process.env.DATABASE_URL + database, {
  logging: isLogging,
})

module.exports = db
