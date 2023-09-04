import Channel from "../models/Channel.model.js";
import errorResponse from "../utils/errorResponse.js";
import { channelValidObject } from "../validators/channels.joi.js";

export const botId = '64f6041ae8eb4244b1f3d42d';

export const createChannel = async (req, res, next) => {
    try {

        const { error, value } = channelValidObject.validate(req.body)
        if (error) return next(errorResponse(400, error.details[0].message))

        const newChannel = await new Channel({
            name: value.name,
            members: [value.creator],
            form: value.form,
            creator: value.creator,
            messages: [{
                sender: botId,
                reciever: [value.creator],
                message: 'welcome to your new channel!'
            }]
        }).save()

        if (!newChannel) throw new Error()

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
