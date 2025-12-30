const express= require('express')
const router = express.Router()
const {register, login, Profile, logout} = require('../Controller/CaptainController')
const {authCaptain} = require('../Middleware/authentication')

router.post('/register', register)
router.post('/login', login)
router.get('/profile', authCaptain, Profile)
router.get('/logout', authCaptain, logout)

module.exports = router;