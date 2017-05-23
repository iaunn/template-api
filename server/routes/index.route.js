const express = require('express')
const userRoutes = require('./user.route')

const router = express.Router()

/** GET /health-check - Check service health */
router.get('/ping', (req, res) => {
  res.send('pong')
})

// mount user routes at /users
router.use('/users', userRoutes)

module.exports = router
