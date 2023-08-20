import { Schema, model } from 'mongoose'

const WorkspaceSchema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        category: { type: String, required: true, default: 'uncategorized' },
        inviteLink: {
            type: String, required: true
        },
        avatar: {
            type: String,
        },
        channels: [
            {
                name: { type: String, required: 'true' },
                members: [
                    {
                        type: Schema.Types.ObjectId,
                        ref: 'user'
                    }
                ],
                creator: { type: Schema.Types.ObjectId, ref: 'users' },
                messages: [
                    {
                        type: String,
                        sender: { type: Schema.Types.ObjectId, ref: 'users' },
                        receiver: { type: Schema.Types.ObjectId, ref: 'users' },
                        message: { type: String },
                        sendOn: { type: Date, default: Date.now() }
                    }
                ]
            }
        ],
        admin: { type: Schema.Types.ObjectId, ref: 'users' },
        members: [
            {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        ],
        inviteCode: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

export default model('workspaces', WorkspaceSchema)
