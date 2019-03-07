const Sequelize = require('sequelize')

const isLogging = process.env.NODE_ENV === 'production'

const db = new Sequelize(process.env.DATABASE_URL, {
  logging: isLogging,
})

module.exports = db
