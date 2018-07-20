const db = require('./server/db')

before(() => {
  return db.sync({ force: true })
})
afterEach(() => {
  return db.sync({ force: true })
})
