'use strict'

const mongoose = require ('mongoose')
const Product = mongoose.model('Product')

exports.get = (req, res, next) => {
  Product.find({
    active: true
    // this line brings just the computer wich the name is "Computer Dell"
    // title: 'Computer Dell'
  }, 'title description active price slug tags')
   .then(data => {
     res.status(200).send(data)
   }).catch(err => {
     res.status(400).send(err)
   })
}

exports.getBySlug = (req, res, next) => {
  Product.findOne({
    slug: req.params.slug,
    active: true
  }, 'title description active price slug tags')
   .then(data => {
     res.status(200).send(data)
   }).catch(err => {
     res.status(400).send(err)
   })
}

exports.getById = (req, res, next) => {
  Product.findById(req.params.id)
   .then(data => {
     res.status(200).send(data)
   }).catch(err => {
     res.status(400).send(err)
   })
}

exports.getByTag = (req, res, next) => {
  Product.find({
    tags: req.params.tag,
    active: true
  }, 'title description price slug tags')
   .then(data => {
     res.status(200).send(data)
   }).catch(err => {
     res.status(400).send(err)
   })
}

exports.post = (req, res, next) => {
  let product = new Product (req.body)
  product.save().then(x => {
    res.status(201).send({
      message: 'Product was registered!'
    })
  }).catch(err => {
    res.status(400).send({
      message: 'Product was not registered!',
      data: err
    })
  })
}

exports.put = (req, res, next) => {
  Product.findByIdAndUpdate(req.params.id, {
    $set: {
      title: req.body.title,
      description: req.body.description,
      slug: req.body.slug,
      price: req.body.price
    }
  }).then(x => {
    res.status(200).send({
      message: 'Product was updated'
    })
  }).catch(err => {
    res.status(400).send({
      message: 'Product was not updated',
      data: err
    })
  })
}

exports.del = (req, res, next) => {
  Product.findOneAndRemove(req.params.id)
    .then(x => {
      res.status(200).send({
        message: 'Product was deleted'
      })
    }).catch(err => {
      res.status(400).send({
        message: 'Product was not deleted',
        data: err
      })
    })
}
