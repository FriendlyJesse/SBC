const { Router } = require('express')
const expressJoi = require('@escook/express-joi')
const  usersModel = require('../../models/users')
const { loginSchema } = require('../../schema/user')

const router = Router()

router.post('/login', expressJoi(loginSchema), usersModel.login)
router.post('/add', expressJoi(loginSchema), usersModel.add)

module.exports = router