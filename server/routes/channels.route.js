import { Router } from "express";
import verifyToken from "../middlewares/verifyToken.js";
import { createChannel } from "../controllers/Channels.controller.js";

const router = Router()

router.post('/', verifyToken, createChannel)
export default router