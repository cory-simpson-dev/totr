const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')
const dashboardController = require('../controllers/dashboard')
const { ensureAuth, ensureGuest } = require('../middleware/auth')


router.get('/', ensureAuth, dashboardController.getUserCheckins)


module.exports = router