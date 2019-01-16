'use strict'

const express = require ('express')
const bodyParser = require ('body-parser')
const mongoose = require ('mongoose')

const app = express()
const router = express.Router()

// Connecting to database
mongoose.connect('mongodb://staziak:staziak1@ds012538.mlab.com:12538/node_store')

// Loading models
const Product = require ('./models/product')

// Loading routes
const indexRoutes = require ('./routes/indexRoutes')
const productsRoutes = require ('./routes/productsRoutes')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use('/', indexRoutes)
app.use('/products', productsRoutes)

module.exports = app
