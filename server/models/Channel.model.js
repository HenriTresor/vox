import { Schema, model } from 'mongoose'

const ChannelSchema = new Schema({
    name: { type: String, required: true, trim: true },
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'users'
    }],
    form: {
        type: String,
        required: true,
        enum: ['private', 'public'],
        default: 'public'
    },
    creator: { type: Schema.Types.ObjectId, required: true, trim: true },
    messages: [
        {
            sender: { type: Schema.Types.ObjectId, ref: 'users' },
            receiver: [{ type: Schema.Types.ObjectId, ref: 'users' }],
            message: { type: String },
            sendOn: { type: Date, default: Date.now() }
        }
    ]
},
    {
        timestamps: true,

    }
)

export default model('channels', ChannelSchema)