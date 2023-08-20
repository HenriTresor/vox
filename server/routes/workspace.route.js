import { Router } from 'express'
import { acceptInvite, checkInviteCode, createWorkspace, getSingleWorkspace, getUserWorkspaces } from '../controllers/Workspace.controller.js'
const router = Router()

router.get('/:userId', getUserWorkspaces)
router.get('/single/:slug', getSingleWorkspace)
router.post('/', createWorkspace)
router.post('/invite/check-code', checkInviteCode)
router.post('/invite/accept', acceptInvite)
export default router
