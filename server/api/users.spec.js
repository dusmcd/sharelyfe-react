const { expect } = require('chai')
const { Post, User, Booking } = require('../db/models')
const request = require('supertest')
const app = require('../app')

describe('User profile api', () => {
  let joe, greg, agent, basketball, football, booking1, booking2
  beforeEach(() => {
    booking1 = {
      startDate: new Date(2018, 6, 15),
      endDate: new Date(2018, 6, 16),
      payment: 'Cash',
      price: 7.0,
    }
    booking2 = {
      startDate: new Date(2018, 6, 15),
      endDate: new Date(2018, 6, 16),
      payment: 'Credit Card',
      price: 7.0,
    }
    basketball = {
      title: 'Basketball',
      price: 5.25,
      description: 'This is a basketball',
    }
    football = {
      title: 'Football',
      price: 5.25,
      description: 'This is a football',
    }
    joe = {
      firstName: 'Joe',
      lastName: 'Smith',
      email: 'joe@smith.com',
      password: '1234',
      username: 'jsmith',
    }
    greg = {
      firstName: 'Greg',
      lastName: 'Willow',
      email: 'greg@willow.com',
      password: '1234',
      username: 'gwillow',
    }
    return Promise.all([User.create(joe), User.create(greg)])
      .then(([joe, greg]) => {
        basketball.userId = joe.id
        football.userId = greg.id
        return Promise.all([Post.create(basketball), Post.create(football)])
      })
      .then(([basketball, football]) => {
        booking1 = { ...booking1, postId: basketball.id, userId: 1 }
        booking2 = { ...booking2, postId: football.id, userId: 1 }
        return Promise.all([Booking.create(booking1), Booking.create(booking2)])
      })
      .then(() => {
        agent = request.agent(app)
        return agent
          .post('/api/auth/login')
          .send({ email: joe.email, password: joe.password })
          .expect(200)
      })
      .catch(err => console.error('Error coming from beforeEach', err.message))
  })
  it('responds with posts by logged in user', () => {
    return agent
      .get('/api/me/posts')
      .expect(200)
      .then(res => {
        expect(res.body.length).to.equal(1)
        expect(res.body[0].title).to.equal(basketball.title)
        expect(res.body[0].description).to.equal(basketball.description)
        expect(+res.body[0].price).to.equal(basketball.price)
      })
  })
  it('responds with bookings created by user', () => {
    return agent
      .get('/api/me/bookings')
      .expect(200)
      .then(res => {
        expect(res.body.length).to.equal(2)
        const bookingPayments = res.body.map(booking => booking.payment)
        expect(bookingPayments).to.contain(booking1.payment)
        expect(bookingPayments).to.contain(booking2.payment)
      })
  })
})
