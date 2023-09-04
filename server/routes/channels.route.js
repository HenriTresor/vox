import { Router } from "express";
import verifyToken from "../middlewares/verifyToken.js";
import { createChannel, getPublicChannels } from "../controllers/Channels.controller.js";

const router = Router()

router.get('/channels/public', verifyToken, getPublicChannels)
router.post('/', verifyToken, createChannel)
export default router