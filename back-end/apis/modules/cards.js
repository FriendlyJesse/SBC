const { Router } = require('express')
const expressJoi = require('@escook/express-joi')
const cardsModel = require('../../models/cards')
const { addSchema, delSchema, updateSchema } = require('../../schema/cards')


const router = Router()

router.post('/', expressJoi(addSchema), cardsModel.add)
router.get('/', cardsModel.getList)
router.delete('/', expressJoi(delSchema), cardsModel.del)
router.put('/', expressJoi(updateSchema), cardsModel.update)

module.exports = router