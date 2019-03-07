const app = require('./app')
const db = require('./db')

const PORT = process.env.PORT || 8000
const HOST = process.env.HOST || 'localhost'

db.sync().then(() => {
  app.listen(PORT, HOST, () => {
    console.log(`Server listening at port ${PORT}`)
  })
})
