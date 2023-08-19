import { Router } from "express";
import { createUser, verifyAccount } from "../controllers/User.controller.js";

const router = Router()

router.post('/', createUser)
router.post('/accounts/verify', verifyAccount)
export default router