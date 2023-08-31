import { Schema, model } from 'mongoose'

const WorkspaceSchema = new Schema(
    {
        slug: { type: String },
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
                type: Schema.Types.ObjectId,
                ref: 'channels'
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
