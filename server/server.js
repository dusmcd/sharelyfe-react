const app = require('./app')
const db = require('./db')

const PORT = process.env.PORT || 8000

db.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`)
  })
})
