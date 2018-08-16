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

function formatDate(dateObj) {
  const dateDetails = {
    month: dateObj.getMonth() + 1,
    day: dateObj.getDate(),
    year: dateObj.getFullYear(),
  }
  const { month, day, year } = dateDetails
  return `${month}/${day}/${year}`
}

Post.prototype.formatBookings = function() {
  // puts the startDate and everything between the startDate and the endDate
  // in an object literal (Hash Table). Not including the endDate

  const bookingMap = {}
  const currentBookings = filterBookings(this.bookings)
  currentBookings.forEach(booking => {
    let startDate = booking.startDate
    bookingMap[formatDate(booking.startDate)] = true
    const millisecondsBetween = booking.endDate.valueOf() - startDate.valueOf()
    const daysBetween = millisecondsBetween / (1000 * 60 * 60 * 24) - 1
    for (let i = 1; i <= daysBetween; i++) {
      // there are 86,400,000 milliseconds in a day
      const nextDateValue = startDate.valueOf() + 86400000
      bookingMap[formatDate(new Date(nextDateValue))] = true
      startDate = new Date(nextDateValue)
    }
  })
  return bookingMap
}

function filterBookings(bookings) {
  let middle = Math.floor(bookings.length / 2)
  let leftBound = 0
  let rightBound = bookings.length - 1
  let filteredBookings = []
  let passedOver = false

  while (filteredBookings.length) {
    filteredBookings = bookings.slice(leftBound, rightBound + 1)

    if (filteredBookings[middle] < Date.now()) {
      leftBound = middle + 1
      passedOver = true
    } else {
      if (passedOver) {
        // do something
      }
      rightBound = middle - 1
      passedOver = false
    }
  }
  return []
}

module.exports = Post
