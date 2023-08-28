import { Router } from 'express'
import { acceptInvite, checkInviteCode, createWorkspace, getSingleWorkspace, getUserWorkspaces } from '../controllers/Workspace.controller.js'
import verifyToken from '../middlewares/verifyToken.js'
const router = Router()

router.get('/:userId', verifyToken, getUserWorkspaces)
router.get('/single/:slug', verifyToken,  getSingleWorkspace)
router.post('/', verifyToken, createWorkspace)
router.post('/invite/check-code', checkInviteCode)
router.post('/invite/accept', acceptInvite)
export default router
