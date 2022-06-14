const express = require('express')
const router = express.Router()
const {createPost,
    getPost,
    updatePost,
    deletePost,
    getAllPost
} = require('../controllers/postsController')
const { checkDuplicateAndRequired } = require('../middlewares/Post')

router.get('/', getAllPost)
router.get('/:id', getPost)
router.post('/', checkDuplicateAndRequired, createPost)
router.put('/:id',checkDuplicateAndRequired, updatePost)
router.delete('/:id', deletePost)


module.exports = router