const express= require('express')
const router = express.Router()
const {register, login, Profile, logout} = require('../Controller/UserController')
const {authUser} = require('../Middleware/authentication')

router.post('/register', register)
router.post('/login', login)
router.get('/profile', authUser, Profile)
router.get('/logout', authUser, logout)

module.exports = router;