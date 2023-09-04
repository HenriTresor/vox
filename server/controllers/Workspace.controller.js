import Workspace from "../models/Workspace.model.js";
import workspaceValidObject from "../validators/workspace.joi.js";
import errorResponse from '../utils/errorResponse.js'
import crypto from 'crypto'
import sendEmail from "../utils/emailTransporter.js";
import { checkUserWithEmail, checkUserWithId } from "../utils/checkUser.js";
import { channelValidObject } from "../validators/channels.joi.js";
import ChannelModel from "../models/Channel.model.js";
import { botId } from "./Channels.controller.js";
import { ObjectId } from "mongoose";


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

        const newChannel = await new ChannelModel({
            name: 'General',
            members: [admin],
            form: 'public',
            creator: admin,
            messages: [{
                sender: botId,
                receiver: [admin],
                message: 'Welcom to the General Channel of your workpace'
            }]
        }).save()

        let newWorkspace = new Workspace({
            slug,
            name: value.name,
            category: value.category,
            inviteLink,
            channels: [newChannel._id],
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

export const sendInviteEmail = async (req, res, next) => {
    try {
        const { email, slug } = req.body
        if (!email || !slug) return next(errorResponse(400, 'recipient email is required'))
        let user = await checkUserWithEmail(email)
        if (!user) return next(errorResponse(404, `user with ${email} is not registered`))

        let workspace = await Workspace.findOne({ slug }).populate('members')
        if (!workspace) return next(errorResponse(404, `${slug} was not found`))

        let isUserAlreadyMember = workspace.members.find(user => String(user?.email) === String(email))

        if (isUserAlreadyMember) return next(errorResponse(409, `${email} is already a member`))

        const emailRes = await sendEmail(email, 'Invite to join workspace', `you were invited to join ${workspace.name}. Click this link to join ${workspace.inviteLink}`)
        if (emailRes === true) {
            return res.status(200).json({ status: true, message: "Invite link was sent successfully" })

        }
        throw new Error('Could not send invite link. Try again later')
    } catch (error) {
        console.log('[sending-invite-email]', error.message)
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
        if (!recipientId || !slug) return next(errorResponse(400, 'recipient id and workspace slug is required'))

        let user = await checkUserWithId(recipientId)
        if (!user) return next(errorResponse(404, 'user was not found'))
        let workspace = await Workspace.findOne({ slug }).populate('admin')
        if (!workspace) return next(errorResponse(404, 'workspace not found'))

        if (workspace.members.includes(recipientId)) return next(errorResponse(409, 'user is already a member'))
        const emailRes = await sendEmail(workspace.admin.email, `invitation accepted`, `${user.firstName} ${user.lastName} accepted your invitation to join ${workspace.name}`)
        res.status(200).json({
            status: true,
            message: 'invite accepted. You are now a member'
        })
    } catch (error) {
        console.log('[accepting-invite]', error.message)
        next(errorResponse(500, 'something went wrong'))
    }
}

export const createNewChannel = async (req, res, next) => {
    try {
        const { name, form, creator, workspaceId } = req.body

        const { error, value } = channelValidObject.validate({ ...req.body })
        if (error) return next(errorResponse(400, error.message))

        let newChannel = await Workspace.findByIdAndUpdate(workspaceId, {
            $push: {
                channels: { name, form, creator }
            }
        })

        if (!newChannel.isModified) throw new Error("unable to create new channel")

        res.status(201).json({
            status: true,
            message: 'new channel added successfully'
        })
    } catch (error) {
        console.log('[create-channel]', error.message)
        next(errorResponse(500, 'something went wrong'))
    }
}
export const addMembersToChannel = async () => { }