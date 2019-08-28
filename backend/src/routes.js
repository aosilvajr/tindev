const express = require('express')
const routes = express.Router()

const DevController = require('./controllers/DevController')
const LikeController = require('./controllers/LikeController')
const DislikeController = require('./controllers/DislikeController')
const PDFController = require('./controllers/PDFController')

routes.get('/devs', DevController.index)
routes.post('/devs', DevController.store)

routes.post('/devs/:devId/likes', LikeController.store)
routes.post('/devs/:devId/dislikes', DislikeController.store)

routes.get('/pdf', PDFController.PDFGenerator)

module.exports = routes;