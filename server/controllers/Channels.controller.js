import Channel from "../models/Channel.model.js";
import MessageModel from "../models/Message.model.js";
import WorkspaceModel from "../models/Workspace.model.js";
import errorResponse from "../utils/errorResponse.js";
import { channelValidObject } from "../validators/channels.joi.js";

export const botId = '64f6041ae8eb4244b1f3d42d';


export const getPublicChannels = async (req, res, next) => {
    try {
        const { slug } = req.body;

        if (!slug) return next(errorResponse(400, 'workspace slug is required'));

        let workspace = await WorkspaceModel.findOne({ slug })
        if (!workspace) return next(errorResponse(400, 'workspace not found'));
        let channels = await Channel.find({ motherWorkspace: workspace._id })
            .populate('creator')
            .populate('members')
        res.status(200).json({
            status: true,
            channels
        })

    } catch (error) {
        console.log('[getting-public-channels]', error.message)
        next(errorResponse(500, 'something went wrong'))
    }
}

export const createChannel = async (req, res, next) => {
    try {

        const { slug } = req.body
        if (!slug) return next(errorResponse(400, 'workspace is required'))
        const { error, value } = channelValidObject.validate(req.body)
        if (error) return next(errorResponse(400, error.details[0].message))

        const workspace = await WorkspaceModel.findOne({ slug })
        if (!workspace) return next(errorResponse(400, 'workspace not found'))
        const newChannel = new Channel({
            name: value.name,
            motherWorkspace: workspace._id,
            members: [value.creator],
            form: value.form,
            creator: value.creator,
            // messages: [{
            //     sender: botId,
            //     reciever: [value.creator],
            //     message: 'welcome to your new channel!'
            // }]
        })

        const updatedWorkspace = await WorkspaceModel.findOneAndUpdate({ slug }, {
            $push: {
                channels: newChannel._id
            }
        })
        await newChannel.save()
        await new MessageModel({
            sender: botId,
            receivers: newChannel.members,
            motherChannel: newChannel._id,
            message: {
                text: 'Welcome to your new channel',
            }
        }).save()

        res.status(201).json(
            {
                status: true,
                message: 'created new channel successfully',
                channel: newChannel
            }
        )
    } catch (error) {
        console.log('[creating-channel]', error.message)
        next(errorResponse(500, 'something went wrong'))
    }
}

// export const addMessage = async (req, res, next) => {
//     try {
//         const { message, channelId, sender } = req.body
//         console.log(req.body)
//         if (!message || !channelId || !sender) return next(errorResponse(400, 'message is required'))

//         let channel = await Channel.findById(channelId)
//         if (!channel) return next(errorResponse(404, ' Channel not found'))

//         await Channel.findOneAndUpdate({ _id: channelId }, {
//             $push: {
//                 messages: { sender, receiver: [...channel.members], message }
//             }
//         })

//         return res.status(201).json({
//             status: true,
//             message: 'message added successfully'
//         })
//     } catch (error) {
//         console.log('[adding-message]', error.message)
//         next(errorResponse(500, 'something went wrong'))
//     }
// } 