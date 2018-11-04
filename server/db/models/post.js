const db = require('../db')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const axios = require('axios')

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
  address: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  zipcode: {
    type: Sequelize.STRING,
  },
})

<<<<<<< HEAD
Post.filterPosts = function(queryParams) {
  const queryString = `%${queryParams.search}%`
  const distanceRadius = queryParams.radius
  const origin = queryParams.origin
=======
Post.filterPosts = function(queryString) {
  queryString = `%${queryString}%`
>>>>>>> 7f90d0a926b506019e5309a1ef4e2484661332e6
  return this.findAll({
    where: {
      [Op.or]: [
        {
          title: {
            [Op.iLike]: queryString,
          },
        },
        {
          description: {
            [Op.iLike]: queryString,
          },
        },
      ],
    },
  }).then(posts => {
    return filterByDistance(posts, distanceRadius, origin)
  })
}

function filterByDistance(posts, distanceRadius, origin) {
  // use google maps api to filter by specified distance
  const destinations = posts
    .map(post => {
      return `${post.address.replace(/\s/g, '+')}+${post.city}+${post.state}+${
        post.zipcode
      }`
    })
    .join('|')
  const distances = axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destinations}&key=${
    process.env.GOOGLE_API_KEY
  }
  `)
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
  const bookings = filterBookings(this.bookings)
  bookings.forEach(booking => {
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

  this.dataValues.datesReserved = bookingMap
}

function filterBookings(bookings) {
  // filters bookings array to only include those that have a start date
  // that is after the current day. Uses binary search. When the middle
  // goes from greater than the current day to less than current day (in subsequent iteration)
  // then we can narrow down where to slice the original array
  if (bookings.length < 5) return bookings

  let leftBound = 0,
    wasGreater = false,
    rightBound = bookings.length - 1,
    middle = Math.floor((rightBound - leftBound) / 2)

  while (rightBound !== middle) {
    middle = leftBound + Math.floor((rightBound - leftBound) / 2)
    if (middle >= 0 && bookings[middle].dataValues.startDate > Date.now()) {
      rightBound = middle - 1
      wasGreater = true
    } else {
      leftBound = middle + 1
      if (wasGreater) {
        rightBound = bookings.length
        return findCrossover(bookings.slice(leftBound, rightBound))
      }
      wasGreater = false
    }
  }
  return []
}

function findCrossover(filteredBookings) {
  for (let i = 0; i < filteredBookings.length; i++) {
    if (filteredBookings[i].dataValues.startDate > Date.now()) {
      return filteredBookings.slice(i, filteredBookings.length)
    }
  }
}

module.exports = Post
