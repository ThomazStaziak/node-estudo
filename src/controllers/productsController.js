'use strict'

const mongoose = require ('mongoose')
const Product = mongoose.model('Product')
const ValidationContract = require ('../validators/fluentValidator')
const repository = require ('../repositories/productRepository')

exports.get = async(req, res, next) => {
  try {
    let data = await repository.get()
    res.status(200).send(data)
  } catch (err) {
    res.status(500).send({
      message: 'Failed to get this request',
      data: data
    })
  }
}

exports.getBySlug = (req, res, next) => {
  try {
    let data = repository.getBySlug(req.params.slug)
    res.status(200).send(data)
  } catch (err) {
    res.status(400).send({

    })
  }
}

exports.getById = async(req, res, next) => {
  repository.getById(req.params.id)
   .then(data => {
     res.status(200).send(data)
   }).catch(err => {
     res.status(400).send(err)
   })
}

exports.getByTag = (req, res, next) => {
  repository.getByTag(req.params.tag)
   .then(data => {
     res.status(200).send(data)
   }).catch(err => {
     res.status(400).send(err)
   })
}

exports.post = (req, res, next) => {
  let contract = new ValidationContract ()
  contract.hasMinLen(req.body.title, 3, 'The title needs to contain at least 3 characters')
  contract.hasMinLen(req.body.slug, 3, 'The slug needs to contain at least 3 characters')
  contract.hasMinLen(req.body.description, 3, 'The description needs to contain at least 3 characters')

  // Checking if the contract is valid
  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end()
    return
  }
  repository.create(req.body)
  .then(x => {
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
  let contract = new ValidationContract ()
  contract.hasMinLen(req.body.title, 3, 'The title needs to contain at least 3 characters')
  contract.hasMinLen(req.body.slug, 3, 'The slug needs to contain at least 3 characters')
  contract.hasMinLen(req.body.description, 3, 'The description needs to contain at least 3 characters')

  // Checking if the contract is valid
  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end()
    return
  }
  repository.update(req.params.id, req.body)
  .then(x => {
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

exports.del = async(req, res, next) => {
  try {
    await repository.delete(req.body.id)
    res.status(200).send({
      message: 'Product was deleted'
    })
  } catch (err) {
    res.status(500).send({
      message: 'Product was not deleted',
      data: err
    })
  }
}
