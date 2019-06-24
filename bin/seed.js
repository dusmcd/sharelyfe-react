const { db, Booking, Category, Post, User } = require('../server/db/models')
const { users, categories, posts, bookings } = require('./seed-data')
const CategoryPost = db.model('category_post')

db.sync({ force: true })
  .then(() => {
    return createAllPromises()
  })
  .then(results => {
    const [categoryArr, postArr] = results
    const categoryMapP = postArr.map((category, i) => {
      CategoryPost.create({
        categoryId: categoryArr[0].id,
        postId: postArr[i].id,
      })
    })
    return Promise.all(categoryMapP)
  })
  .then(() => {
    console.log('Seeding successful!')
    db.close()
  })
  .catch(err => {
    console.error(err.message)
    db.close()
  })

function createUserPromises() {
  return Promise.all(
    users.map(user => {
      return User.create(user)
    })
  )
}

function createPostPromises(userPromise) {
  return userPromise
    .then(userArray => {
      return Promise.all(
        posts.map(post => {
          const random = Math.floor(Math.random() * 5)
          post.userId = userArray[random].id
          return Post.create(post)
        })
      )
    })
    .catch(err => {
      console.error('Error coming from `createPostPromises` function')
      console.error(err.message)
    })
}

function createBookingPromises(userAndPostPromise) {
  return userAndPostPromise.then(([userArray, postArray]) => {
    return Promise.all(
      bookings.map(booking => {
        const random = Math.floor(Math.random() * 5)
        booking.postId = postArray[random].id
        booking.userId = userArray[random].id
        return Booking.create(booking)
      })
    )
  })
}

function createCategoryPromises() {
  return Promise.all(
    categories.map(category => {
      return Category.create(category)
    })
  )
}

function createAllPromises() {
  const categoryP = createCategoryPromises()
  const userP = createUserPromises()
  const postP = createPostPromises(userP)

  const userAndPostPromise = Promise.all([userP, postP])
  const bookingP = createBookingPromises(userAndPostPromise)

  return Promise.all([categoryP, postP, bookingP])
}
