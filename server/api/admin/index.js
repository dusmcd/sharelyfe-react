const router = require('express').Router()

router.use('/userManagement', require('./user-management'))

module.exports = router
