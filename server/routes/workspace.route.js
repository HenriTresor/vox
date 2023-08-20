import {Router} from 'express'
import { createWorkspace, getUserWorkspaces } from '../controllers/Workspace.controller.js'
const router = Router()

router.get('/:userId', getUserWorkspaces)
router.post('/', createWorkspace)

export default router
