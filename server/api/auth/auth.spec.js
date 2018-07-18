const { expect } = require('chai')
const { User, db } = require('../../db/models')
const app = require('../../app')
const request = require('supertest')

describe('Auth routes', () => {
  let bob, joe
  beforeEach(() => {
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
    return User.create(bob)
  })
  afterEach(() => {
    return db.sync({ force: true })
  })
  it('signs up a user', () => {
    return request
      .agent(app)
      .post('/api/auth/signup')
      .send(joe)
      .expect(200)
      .then(res => {
        expect(res.body.id).to.not.equal(undefined)
        expect(res.body.name).to.equal(`${joe.firstName} ${joe.lastName}`)
      })
  })
  it('properly logs in an existing user', () => {
    return request
      .agent(app)
      .post('/api/auth/login')
      .send({ email: 'bob@email.com', password: '1234' })
      .expect(200)
      .then(res => {
        expect(res.body.firstName).to.equal(bob.firstName)
        expect(res.body.password).to.not.equal(bob.password)
        expect(res.body.password).to.equal(undefined)
        expect(res.body.salt).to.equal(undefined)
      })
  })
  it('rejects a user that does not exist', () => {
    return request
      .agent(app)
      .post('/api/auth/login')
      .send({ email: 'george@seinfeld.com', password: 'password' })
      .expect(401)
      .then(res => {
        expect(res.error.text).to.equal('Incorrect email/password combination')
      })
  })
  it('rejects a user that enters the wrong password', () => {
    return request(app)
      .post('/api/auth/login')
      .send({ email: 'bob@email.com', password: 'notright' })
      .expect(401)
      .then(res => {
        expect(res.error.text).to.equal('Incorrect email/password combination')
      })
  })
})
