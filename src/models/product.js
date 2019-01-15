'use strict'

const mongoose = require ('mongoose')
const Schema = mongoose.Schema

// Creating schema
const schema = new Schema ({
  title: {
    type: String,
    required: [true, 'title is required'],
    trim: true
  },
  slug: {
    type: String,
    required: [true, 'slug is required'],
    trim: true,
    index: true,
    unique: true
  },
  description: {
    type: String,
    required: [true, 'description is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'price is required']
  },
  active: {
    type: Boolean,
    required: [true, 'active is required'],
    default: true
  },
  tags: [{
    type: String,
    required: [true, 'tags is required']
  }]
})

// Exporting the schema
module.exports = mongoose.model('Product', schema)
