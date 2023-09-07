import { Router } from 'express'
import { addMessage, getMessages } from '../controllers/Message.controller.js'
import verifyToken from '../middlewares/verifyToken.js'
const router = Router()

router.post('/add', verifyToken, addMessage)
router.post('/', verifyToken, getMessages)

export default router