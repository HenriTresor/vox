import Channel from "../models/Channel.model.js"
import Message from "../models/Message.model.js"
import errorResponse from "../utils/errorResponse.js"

export const addMessage = async (req, res, next) => {
    try {
        const { message, channelId, sender, receivers } = req.body
        console.log(req.body)
        if (!message || !channelId || !sender) return next(errorResponse(400, 'message is required'))

        let channel = await Channel.findById(channelId)
        if (!channel) return next(errorResponse(404, ' Channel not found'))

        const newMessage = await new Message(
            {
                sender,
                receivers,
                motherChannel: channelId,
                message: {
                    text: message?.text,
                }
            }
        ).save()
        return res.status(201).json({
            status: true,
            message: 'message added successfully'
        })
    } catch (error) {
        console.log('[adding-message]', error.message)
        next(errorResponse(500, 'something went wrong'))
    }
}

export const getMessages = async (req, res, next) => {
    try {
        const { users } = req.body

        if (!users?.length) return next(errorResponse(400, 'users are required'))

        const messages = await Message.find({
            $or: [
                { sender: users },
                { receivers: users }
            ]
        })

        res.status(200).json({
            status: true,
            messages
        })
    } catch (error) {
        console.log('[getting-messages]', error.message)
        next(errorResponse(500, 'something went wrong'))
    }
}