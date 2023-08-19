import User from "../models/User.model.js";
import errorResponse from "../utils/errorResponse.js";

export const createUser = async (req, res, next) => {
    try {

        const { email, password, firstName, lastName } = req.body
        
    } catch (error) {
        console.log('[creating-user]', error.message)
        next(errorResponse(500, 'internal server error'))
    }
}