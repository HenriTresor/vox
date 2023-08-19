import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    email: { type: String, required, unique },
    firstName: { type: String, required },
    lastName: { type: String, required },
    workspaces: [{
        workspace: Schema.Types.ObjectId,
        ref: 'workspaces'
    }],
    password: { type: String, required, }
},
    {
        timestamps: true
    }
)

export default model('users', UserSchema)

