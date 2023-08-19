import User from "../models/User.model.js";
import { checkUserWithEmail, checkUserWithId } from "../utils/checkUser.js";
import createToken from "../utils/createToken.js";
import sendEmail from "../utils/emailTransporter.js";
import errorResponse from "../utils/errorResponse.js";
import { validObject } from "../validators/user.joi.js";
import _ from "lodash";

function generateVerificationCode() {
    return Math.floor(Math.random() * 900000) + 100000;
}

export const createUser = async (req, res, next) => {
    try {

        const { email, password, firstName, lastName } = req.body

        const { error, value } = validObject.validate({ email, firstName, lastName, password })
        if (error) return next(errorResponse(400, error.details[0].message))
        const isExists = await checkUserWithEmail(value.email)
        if (isExists) return next(errorResponse(409, `user with ${value.email} already exists`))
        const verificationCode = generateVerificationCode()
        let newUser = await new User({
            email: value.email,
            firstName: value.firstName,
            lastName: value.lastName,
            password: value.password,
            verificationCode
        }).save()

        const emailResponse = await sendEmail(value.email, 'verify your account', `enter this code to verify your email ${newUser.verificationCode}`)

        if (emailResponse) {
            const token = await createToken(newUser._id)
            return res.status(201).json({
                status: true,
                user: _.pick(newUser, ['_id', 'email', 'firstName', 'lastName', 'createdAt', 'updatedAt']),
                access_token: token,
                message: 'an email was sent to you. Check to verify your account'
            })
        }
        res.status(500).json({
            status: fale,
            message: 'something went wrong'
        })
    } catch (error) {
        console.log('[creating-user]', error.message)
        next(errorResponse(500, 'internal server error'))
    }
}

