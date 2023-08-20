import Workspace from "../models/Workspace.model.js";
import workspaceValidObject from "../validators/workspace.joi.js";
import errorResponse from '../utils/errorResponse.js'
import crypto from 'crypto'
import sendEmail from "../utils/emailTransporter.js";
import { checkUserWithId } from "../utils/checkUser.js";

const generateInviteLink = (name) => {
    const inviteCode = crypto.randomBytes(10).toString('hex')
    return {
        inviteLink: String(`${process.env.FRONTEND_URL}/${name}/invite/${inviteCode}`),
        inviteCode
    }
}

export const createWorkspace = async (req, res, next) => {
    try {
        const { name, category, admin } = req.body
        const { value, error } = workspaceValidObject.validate({ name, category, admin })
        if (error) return next(errorResponse(400, error.details[0].message))
        let creator = await checkUserWithId(admin)
        if (!creator) return next(errorResponse(404, 'creator was not found'))
        const slug = value.name + '-' + creator._id
        const { inviteLink, inviteCode } = generateInviteLink(slug)
        let newWorkspace = new Workspace({
            slug,
            name: value.name,
            category: value.category,
            inviteLink,
            channels: [{
                name: 'General',
                members: [admin],
                creator: admin,
            }],
            admin: value.admin,
            members: [admin],
            inviteCode: inviteCode
        })

        await newWorkspace.save()
        const emailRes = await sendEmail(creator.email, 'add more people to your tem', `Send this link to your group members so they can join, ${inviteLink}`)
        if (emailRes === true) {
            return res.status(201).json({
                status: true,
                message: 'workspace created. check your email for invite link to add more people to your team.',
                Workspace: newWorkspace
            })
        }
        res.status(201).json({
            status: true,
            message: 'workspace created.',
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
        let { slug } = req.params
        if (!slug) return next(errorResponse(400, 'workspace id must be provided'))

        let workspace = await Workspace.findOne({ slug }).populate('admin').populate('members')
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

export const checkInviteCode = async (req, res, next) => {
    try {
        const { inviteCode, slug } = req.body

        if (!inviteCode || !slug) return next(errorResponse(400, 'invite code and workpace name are required'))

        let workspace = await Workspace.findOne({ slug })
        if (!workspace) return next(errorResponse(404, 'workspace not found'))

        if (workspace.inviteCode !== String(inviteCode)) return next(errorResponse(401, 'invalid invite code. Please request the correct one.'))

        res.status(200).json(
            {
                status: true,
            }
        )
    } catch (error) {
        console.log('[checking-invite-code]', error.message)
        next(errorResponse(500, 'something went wrong'))
    }
}

export const acceptInvite = async (req, res, next) => {
    try {

        let { recipientId, slug } = req.body
        if (!recipientId) return next(errorResponse(400, 'recipient id is required'))

        let user = await checkUserWithId(recipientId)
        if (!user) return next(errorResponse(404, 'user was not found'))
        let workspace = await Workspace.findOne({ slug })
        if (!workspace) return next(errorResponse(404, 'workspace not found'))

        if (workspace.members.includes(recipientId)) return next(errorResponse(409, 'user is already a member'))
        await Workspace.findOneAndUpdate({ slug }, {
            $push: {
                members: recipientId
            }
        })
    } catch (error) {
        console.log('[accepting-invite]', error.message)
        next(errorResponse(500, 'something went wrong'))
    }
}