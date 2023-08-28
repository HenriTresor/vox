import { compare } from "bcrypt";
import User from "../models/User.model.js";
import errorResponse from "../utils/errorResponse.js";
import _ from "lodash";
import createToken from "../utils/createToken.js";

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        if (!email || !password) return next(errorResponse(400, 'email and password are required'))
        let user = await User.findOne({ email })
        if (!user) return next(errorResponse(404, `user with email ${email} was not found`))

        let isPwdCorrect = await compare(password, user.password)
        if (!isPwdCorrect) return next(errorResponse(401, 'Password is incorrect'))

        const token = await createToken(user._id)
        res.status(200).json(
            {
                status: true,
                message: 'login was successfully',
                user: {
                    ...(_.pick(user,
                        ['_id', 'email', 'firstName', 'lastName', 'createdAt', 'updatedAt', 'verifiedAccount', 'verificationCode'])),
                        access_token: token,
                    
                }
            }
        )
    } catch (error) {
        console.log('[login]', error.message)
        next(errorResponse(500, 'something went wrong'))
    }
}