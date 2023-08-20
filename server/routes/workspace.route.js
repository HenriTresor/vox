import {Router} from 'express'
import { createWorkspace } from '../controllers/Workspace.controller'
const router = Router()

router.post('/', createWorkspace)

export default router
