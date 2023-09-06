import { Router } from "express";
import verifyToken from "../middlewares/verifyToken.js";
import { addMessage, createChannel, getPublicChannels } from "../controllers/Channels.controller.js";

const router = Router()

router.post('/public', verifyToken, getPublicChannels)
router.post('/', verifyToken, createChannel)
router.post('/messages/add', verifyToken, addMessage)
export default router