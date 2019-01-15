'use strict'

const express = require ('express')
const router = express.Router()
const controller = require ('../controllers/productsController')

router.get('/', controller.get)
router.get('/:slug', controller.getBySlug)
router.get('/admin/id/:id', controller.getById)
router.get('/admin/tags/:tag', controller.getByTag)
router.post('/', controller.post)
router.put('/:id', controller.put)
router.delete('/', controller.del)

module.exports = router
