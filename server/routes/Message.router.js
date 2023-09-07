import { Router } from 'express'
import { addMessage } from '../controllers/Message.controller.js'
import verifyToken from '../middlewares/verifyToken.js'
const router = Router()

router.post('/add', verifyToken, addMessage)

export default router