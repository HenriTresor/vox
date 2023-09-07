import { model, Schema } from 'mongoose'

const MessageSchema = new Schema(
    {
        sender: { type: Schema.Types.ObjectId, ref: 'users' },
        receivers: [{ type: Schema.Types.ObjectId, ref: 'users' }],
        motherChannel: { type: Schema.Types.ObjectId, ref: 'channel' },
        message: {
            text: { type: String },
            image: { type: String }
        },
    },
    {
        timestamps: true,
    }
)

export default model('messages', MessageSchema)

