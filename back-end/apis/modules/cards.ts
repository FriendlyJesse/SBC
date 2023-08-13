import { Router } from 'express'
const expressJoi = require('@escook/express-joi')
import cardsModel from '../../models/cards'
const { addSchema, delSchema, updateSchema } = require('../../schema/cards')


const router = Router()

router.post('/', expressJoi(addSchema), cardsModel.add)
router.get('/', cardsModel.getList)
router.delete('/', expressJoi(delSchema), cardsModel.del)
router.put('/', expressJoi(updateSchema), cardsModel.update)

export default router