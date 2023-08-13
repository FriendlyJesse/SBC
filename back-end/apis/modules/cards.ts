import { Router } from 'express'
import cardsModel from '../../models/cards'
import expressJoi from '../../middleware/validator'
import { addSchema, delSchema, updateSchema } from '../../schema/cards'

const router = Router()

router.post('/', expressJoi(addSchema), cardsModel.add)
router.get('/', cardsModel.getList)
router.delete('/', expressJoi(delSchema), cardsModel.del)
router.put('/', expressJoi(updateSchema), cardsModel.update)

export default router