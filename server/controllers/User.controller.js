import User from "../models/User.model.js";
import createToken from "../utils/createToken.js";
import errorResponse from "../utils/errorResponse.js";
import { validObject } from "../validators/user.joi.js";

export const createUser = async (req, res, next) => {
    try {

        const { email, password, firstName, lastName } = req.body

        const { error, value } = validObject.validate({ email, firstName, lastName, password })
        if (error) return next(errorResponse(400, error.details[0].message))
        const isExists = await checkUser(value.email)
        if (isExists) return next(errorResponse(409, `user with ${value.email} already exists`))
        let newUser = await new User({
            email: value.email,
            firstName: value.firstName,
            lastName: value.lastName,
            password: value.password
        }).save()

        const token = await createToken(newUser._id)
        return res.status(201).json({
            status: true,
            user: _.pick(newUser, ['_id', 'email', 'firstName', 'lastName', 'createdAt', 'updatedAt']),
            access_token: token
        })
    } catch (error) {
        console.log('[creating-user]', error.message)
        next(errorResponse(500, 'internal server error'))
    }
}