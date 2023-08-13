import { Router } from 'express'
import users from './modules/users'
import cards from './modules/cards'
const router = Router()

router.use('/users', users)
router.use('/cards', cards)

export default router