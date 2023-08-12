const { Router } = require('express')
const expressJoi = require('@escook/express-joi')
const cardsModel = require('../../models/cards')
const { addSchema } = require('../../schema/cards')


const router = Router()

router.post('/add', expressJoi(addSchema), cardsModel.add)

module.exports = router