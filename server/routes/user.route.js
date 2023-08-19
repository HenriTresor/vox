import { Router } from "express";
import { createUser } from "../controllers/User.controller.js";

const router = Router()

router.post('/', createUser)

export default router