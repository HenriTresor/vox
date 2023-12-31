import User from "../models/User.model.js";

export const checkUserWithId = async (id) => {
    let user = await User.findById(id)
    if (user?.email) return user
    return false
}

export const checkUserWithEmail = async (email) => {
    let user = await User.findOne({ email: email })
    if (user?._id) return user
    return false
}