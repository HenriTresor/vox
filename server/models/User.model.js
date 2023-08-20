import { hash } from "bcrypt";
import { number } from "joi";
import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    workspaces: [{
        workspace: Schema.Types.ObjectId,
        // ref: 'workspaces'
    }],
    password: { type: String, required: true, },
    verifiedAccount: {
        type: Boolean,
        default: false
    },
    verificationCode: {
        type: Number,
        required: true,
        default: 0
    },
    passwordResetCode: {
        type: Number,
        required: true, default: 0
    }
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

