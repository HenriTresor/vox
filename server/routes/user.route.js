import { Router } from "express";
import { createUser, sendVerificationCode, verifyAccount } from "../controllers/User.controller.js";

const router = Router()

router.post('/', createUser)
router.post('/accounts/verify', verifyAccount)
router.post('/accounts/send-code', sendVerificationCode)
export default router