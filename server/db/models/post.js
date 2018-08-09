const db = require('../db')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const Post = db.define('post', {
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://images.pexels.com/photos/995301/pexels-photo-995301.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=500&w=500',
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
})

Post.filterPosts = function(queryString) {
  queryString = `%${queryString}%`
  console.log('queryString:', queryString)
  return this.findAll({
    where: {
      [Op.or]: [
        {
          title: {
            [Op.like]: queryString,
          },
        },
        {
          description: {
            [Op.like]: queryString,
          },
        },
      ],
    },
  })
}

Post.prototype.formatBookings = function() {
  const bookingMap = {}
  this.bookings.forEach(booking => {
    bookingMap[booking.startDate] = { [booking.endDate]: true }
  })
  return bookingMap
}

module.exports = Post
