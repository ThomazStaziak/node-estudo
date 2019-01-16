'use strict'

const mongoose = require ('mongoose')
const Product = mongoose.model('Product')

exports.get = () => {
  return Product.find({
    active: true
    // this line brings just the computer wich the name is "Computer Dell"
    // title: 'Computer Dell'
  }, 'title description active price slug tags')
}

exports.getBySlug = (slug) => {
  return Product.findOne({
    slug: slug,
    active: true
  }, 'title description active price slug tags')
}

exports.getById = (id) => {
  return Product.findById(id)
}

exports.getByTag = (tag) => {
  return Product.find({
    tags: tag,
    active: true
  }, 'title description price slug tags')
}

exports.create = (data) => {
  let product = new Product (data)
  return product.save()
}

exports.update = (id, data) => {
  return Product.findByIdAndUpdate(id, {
    $set: {
      title: data.title,
      description: data.description,
      slug: data.slug,
      price: data.price,
      tags: data.tags
    }
  })
}

exports.delete = (id) => {
  return Product.findOneAndRemove(id)
}
