const joi = require('joi')

// 单词
const word = joi
  .string()
  .required()

exports.addSchema = {
  body: {
    word
  }
}