import Workspace from "../models/Workspace.model.js";
import workspaceValidObject from "../validators/workspace.joi.js";
import errorResponse from '../utils/errorResponse.js'
import crypto from 'crypto'

const generateInviteLink = (name) => {
    return String(`${process.env.FRONTEND_URL}/${name}/invite/${crypto.randomBytes(10).toString('hex')}`)
}

export const createWorkspace = async (req, res, next) => {
    try {
        const { name, category, admin } = req.body
        const { value, error } = workspaceValidObject.validate({ name, category, admin })

        if (error) return next(errorResponse(400, error.details[0].message))

        let newWorkspace = new Workspace({
            name: value.name,
            category: value.category,
            inviteLink: generateInviteLink(value.name),
            admin: value.admin,
            members: [admin]
        })

        await newWorkspace.save()
        res.status(201).json({
            status: true,
            message: 'workspace created',
            Workspace: newWorkspace
        })
    } catch (error) {
        console.log('[create-workspace]', error.message)
        next(errorResponse(500, 'something went wrong'))
    }
}


export const getUserWorkspaces = async (req, res, next) => {
    try {
        const { userId } = req.params
        if (!userId) return next(errorResponse(400, 'user id is required'))

        let workspaces = await Workspace.find({
            members: userId
        })
        res.status(200).json({
            status: true,
            workspaces
        })
    } catch (error) {
        console.log('[get-user-workspace]', error.message)
        next(errorResponse(500, 'something went wrong'))
    }
}

export const getSingleWorkspace = async (req, res, next) => {
    try {
        let { workspaceId } = req.params
        if (!workspaceId) return next(errorResponse(400, 'workspace id must be provided'))

        let workspace = await Workspace.findById(workspaceId).populate('admin').populate('members')
        if (!workspace) return next(errorResponse(400, 'workspace not found'))
        res.status(200).json({
            status: true,
            workspace
        })
    } catch (error) {
        console.log('[getting-workspace]', error.message)
        next(errorResponse(500, 'something went wrong'))
    }
}