import { hash } from "bcrypt";
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

UserSchema.pre('save', async function () {
    try {
        const hashedPwd = await hash(this.password, 10)
        this.password = hashedPwd
    } catch (error) {
        console.log('[hash-error]', error.message)
    }
})
export default model('users', UserSchema)

