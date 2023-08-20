import { Router } from "express";
import { createUser, getUserProfile, sendVerificationCode, verifyAccount } from "../controllers/User.controller.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = Router()

router.post('/', createUser)
router.get('/me', verifyToken, getUserProfile)
router.post('/accounts/verify', verifyAccount)
router.post('/accounts/send-code', sendVerificationCode)
export default router