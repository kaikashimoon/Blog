const express = require('express')
const router = express.Router()
const {createPost,
    getPost,
    updatePost,
    deletePost
} = require('../controllers/postsController')
const { checkDuplicateAndRequired } = require('../middlewares/Post')


router.get('/', getPost)
router.post('/', checkDuplicateAndRequired, createPost)
router.put('/', updatePost)
router.delete('/', deletePost)


module.exports = router