const db = require('../db')
const Sequelize = require('sequelize')

const Booking = db.define('booking', {
  date: {
    type: Sequelize.ARRAY(Sequelize.DATE),
    allowNull: false,
  },
  payment: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false,
  },
})

module.exports = Booking
