import { Router } from "express";
import { login } from "../controllers/Auth.controller.js";

const router = Router()

router.post('/login', login)

export default router