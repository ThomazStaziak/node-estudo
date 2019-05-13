'use strict'

const express = require ('express')
const bodyParser = require ('body-parser')
const mongoose = require ('mongoose')

const app = express()
const router = express.Router()

// Connecting to database
mongoose.connect('< CHAVE DE CONEXÃO >')

// Loading models
const Product = require ('./models/product')

// Loading routes
const indexRoutes = require ('./routes/indexRoutes')
const productsRoutes = require ('./routes/productsRoutes')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', indexRoutes)
app.use('/products', productsRoutes)

module.exports = app
