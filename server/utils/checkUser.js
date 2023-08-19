import User from "../models/User.model.js";

export default async (identifier) => {
    const user = await User.findOne({
        $or: [
            { email: identifier },
            { _id: identifier }
        ]
    })

    if (user) return true
    return false
}