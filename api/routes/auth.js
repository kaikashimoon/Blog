const express = require('express')
const router = express.Router()
const { createUser,
        loginUser
} = require('../controllers/authController')
const { checkDuplicateUsernameOrEmail } = require('../middlewares/verifySignup')



router.post('/register', checkDuplicateUsernameOrEmail, createUser)
router.post('/login', loginUser)

module.exports = router