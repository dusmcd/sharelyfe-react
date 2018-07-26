const { expect } = require('chai')
const { Post, User, Booking } = require('../db/models')
const request = require('supertest')
const app = require('../app')

describe('post api', () => {
  let basketball, football, tom, jerry, booking1, booking2, newBooking, agent
  beforeEach(() => {
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
    tom = {
      firstName: 'Tom',
      lastName: 'Bomb',
      email: 'tom@email.com',
      username: 'tombomb',
      password: '1234',
    }
    jerry = {
      firstName: 'Jerry',
      lastName: 'Ferry',
      email: 'jerry@email.com',
      username: 'jferry',
      password: '1234',
    }
    booking1 = {
      date: [new Date(2018, 6, 15), new Date(2018, 6, 16)],
      payment: 'Cash',
      price: 7.0,
    }
    booking2 = {
      date: [new Date(2018, 6, 15), new Date(2018, 6, 16)],
      payment: 'Credit Card',
      price: 7.0,
    }
    newBooking = {
      date: [new Date(2018, 8, 25), new Date(2018, 8, 26)],
      payment: 'Cash',
      price: 7.0,
    }
    return Promise.all([User.create(tom), User.create(jerry)])
      .then(([tom, jerry]) => {
        basketball.userId = tom.id
        football.userId = jerry.id
        booking1.userId = tom.id
        booking2.userId = tom.id
        return Post.create(basketball)
      })
      .then(basketballPost => {
        booking1.postId = basketballPost.id
        booking2.postId = basketballPost.id
        return Promise.all([Booking.create(booking1), Booking.create(booking2)])
      })
      .then(() => {
        return Post.create(football)
      })
      .then(() => {
        agent = request.agent(app)
        return agent
          .post('/api/auth/login')
          .send({ email: tom.email, password: tom.password })
          .expect(200)
          .catch(err => console.error(err.message))
      })
      .catch(err => console.error('Error from posts api test:', err.message))
  })
  it('fetches all posts', () => {
    return request(app)
      .get('/api/posts')
      .expect(200)
      .then(res => {
        expect(res.body).to.be.an('array')
        expect(res.body.length).to.equal(2)
        expect(res.body[0].title).to.equal(basketball.title)
        expect(res.body[1].title).to.equal(football.title)
      })
  })
  it('fetches one post', () => {
    return request(app)
      .get('/api/posts/1')
      .expect(200)
      .then(res => {
        expect(res.body).to.be.an('object')
        expect(res.body.description).to.equal(basketball.description)
        expect(+res.body.price).to.equal(basketball.price)
        expect(res.body.user).to.not.equal(undefined)
        expect(res.body.user.firstName).to.equal(tom.firstName)
      })
  })
  it('creates a post', () => {
    const parking = {
      title: 'Parking',
      description: 'parking spot',
      price: 4.35,
      userId: 2,
    }

    return agent
      .post('/api/posts')
      .send(parking)
      .expect(201)
      .then(res => {
        return Post.findById(res.body.id)
      })
      .then(newPost => {
        expect(newPost.title).to.equal('Parking')
        expect(newPost.description).to.equal('parking spot')
        expect(+newPost.price).to.equal(4.35)
      })
  })
  it('creates a booking for a post', () => {
    return agent
      .post('/api/posts/2/bookings')
      .send(newBooking)
      .expect(201)
      .then(res => {
        return Booking.findById(res.body.id)
      })
      .then(booking => {
        expect(booking).to.not.equal(null)
        expect(booking.date[0].getMonth()).to.equal(
          newBooking.date[0].getMonth()
        )
      })
  })
  it('fetches bookings associated with post', () => {
    return request(app)
      .get('/api/posts/1/bookings')
      .expect(200)
      .then(res => {
        expect(res.body.length).to.equal(2)
        const validBookings = res.body.filter(booking => {
          return (
            booking.payment === booking1.payment ||
            booking.payment === booking2.payment
          )
        })
        expect(validBookings.length).to.equal(2)
      })
  })
})
