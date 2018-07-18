const { expect } = require('chai')
const { User, db } = require('./index')
const { encryptPassword } = require('./user')

describe('User model', () => {
  let bob, joe, noName, nullName
  before(() => {
    bob = {
      firstName: 'Bob',
      lastName: 'McDowell',
      email: 'bob@email.com',
      password: '1234',
    }
    joe = {
      firstName: 'Joe',
      lastName: 'McDowell',
      email: 'joe@email.com',
      password: 'potato',
    }
    noName = {
      firstName: '',
      lastName: 'something',
      email: 'name@email.com',
      password: 'password',
    }
    nullName = {
      firstName: 'Rick',
      email: 'rick@gmail.com',
      password: 'password',
    }
    return db.sync({ force: true })
  })
  afterEach(() => {
    return db.sync({ force: true })
  })
  it('properly creates a user', () => {
    return User.create(bob).then(createdUser => {
      expect(createdUser).to.be.an('object')
      expect(createdUser.firstName).to.equal(bob.firstName)
      expect(createdUser.name).to.equal(`${bob.firstName} ${bob.lastName}`)
    })
  })
  it('hashes the raw password', () => {
    return User.create(joe).then(createdUser => {
      const encryptedPassword = encryptPassword(
        joe.password,
        createdUser.salt()
      )
      expect(createdUser.password()).to.not.equal(joe.password)
      expect(createdUser.password()).to.equal(encryptedPassword)
    })
  })
  it('validates empty name constraints', () => {
    return User.create(noName).catch(err => {
      expect(err.message).to.contain('notEmpty')
    })
  })
  it('validates notNull constraints on name', () => {
    return User.create(nullName).catch(err => {
      expect(err.message).to.contain('notNull')
    })
  })
})
