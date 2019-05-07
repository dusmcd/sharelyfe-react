const Sequelize = require('sequelize')
const db = require('../db')
const crypto = require('crypto')

const User = db.define('user', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    get() {
      return () => this.getDataValue('password')
    },
  },
  salt: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('salt')
    },
  },
  name: {
    type: Sequelize.VIRTUAL,
    get() {
      return `${this.getDataValue('firstName')} ${this.getDataValue(
        'lastName'
      )}`
    },
  },
})

const encryptPassword = (rawPassword, salt) => {
  const hash = crypto.createHash('sha256')
  hash.update(rawPassword)
  hash.update(salt)
  return hash.digest('hex')
}

const setSalt = () => {
  return crypto.randomBytes(16).toString('base64')
}

const setPassword = user => {
  const salt = setSalt()
  const encryptedPassword = encryptPassword(user.password(), salt)
  user.salt = salt
  user.password = encryptedPassword
}

User.beforeCreate(setPassword)

module.exports = { User, encryptPassword }
