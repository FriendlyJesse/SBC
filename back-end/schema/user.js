const joi = require('joi')

// 用户名的验证规则
const username = joi
  .string()
  .alphanum()
  .min(1)
  .max(10)
  .required()

exports.loginSchema = {
  body: {
    username
  }
}