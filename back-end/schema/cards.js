const joi = require('joi')

// 单词
const word = joi.string().alphanum().required()
// id
const id = joi.number().integer().min(1).required()

exports.addSchema = {
  body: {
    word
  }
}

exports.delSchema = {
  body: {
    id
  }
}

exports.updateSchema = {
  body: {
    id,
    word
  }
}