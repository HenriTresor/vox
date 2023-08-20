import { Schema, model } from 'mongoose'

const WorkspaceSchema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        category: { type: String, required: true, default: 'uncategorized' },
        inviteLink: {
            type: String,required:true
        },
        avatar: {
            type: String,
        },
        admin: { type: Schema.Types.ObjectId, ref: 'users' },
        members: [
            {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        ],
    },
    {
        timestamps: true
    }
)

export default model('workspaces', WorkspaceSchema)
