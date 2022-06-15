const express = require('express')
const router = express.Router()
const {
    createCategories,
    getCategories
} = require('../controllers/categoriesController')



router.post('/', createCategories)
router.get('/', getCategories)

module.exports = router