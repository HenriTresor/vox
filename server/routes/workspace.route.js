import { Router } from 'express'
import { createWorkspace, getSingleWorkspace, getUserWorkspaces } from '../controllers/Workspace.controller.js'
const router = Router()

router.get('/:userId', getUserWorkspaces)
router.get('/single/:workspaceId', getSingleWorkspace)
router.post('/', createWorkspace)

export default router
