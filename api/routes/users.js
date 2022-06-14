const express = require('express')
const router = express.Router()
const { updateUser,
    deleteUser,
    getUser
} = require('../controllers/usersControllers')
const { checkDuplicateUsernameOrEmail } = require('../middlewares/verifySignup')


router.get('/:id', getUser )
router.put('/:id', checkDuplicateUsernameOrEmail, updateUser)
router.delete('/:id', deleteUser)

module.exports = router