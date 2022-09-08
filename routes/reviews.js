const express = require('express')
const router = express.Router()
const reviewsController = require('../controllers/checkin') 
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', reviewsController.getPublicCheckins)
router.get('/:id', ensureAuth, reviewsController.editCheckin)
router.put('/update', ensureAuth, reviewsController.updateCheckin)
router.get('/user/:id', reviewsController.getUserCheckins)



router.post('/createCheckin', ensureAuth, reviewsController.createCheckin)

router.delete('/deleteCheckin',ensureAuth, reviewsController.deleteCheckin)

module.exports = router