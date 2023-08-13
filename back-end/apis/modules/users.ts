import { Router } from 'express'
import usersModel from '../../models/users'
import expressJoi from '../../middleware/validator'
import { loginSchema } from '../../schema/user'

const router = Router()

router.post('/login', expressJoi(loginSchema), usersModel.login)
router.post('/add', expressJoi(loginSchema), usersModel.add)

module.exports = router

export default router