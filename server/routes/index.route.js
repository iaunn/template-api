const express = require('express')

const router = express.Router() // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/ping', (req, res) => res.send('OK')
)

module.exports = router
