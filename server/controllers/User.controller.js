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
        const emailResponse = await sendEmail(value.email, 'verify your account', `enter this code to verify your email ${verificationCode}`)
        if (emailResponse) {
            let newUser = await new User({
                email: value.email,
                firstName: value.firstName,
                lastName: value.lastName,
                password: value.password,
                verificationCode
            }).save()

            const token = await createToken(newUser._id)
            return res.status(201).json({
                status: true,
                user: _.pick(newUser, ['_id', 'email', 'firstName', 'lastName', 'createdAt', 'updatedAt', 'verifiedAccount']),
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

export const sendVerificationCode = async (req, res, next) => {
    try {
        let { email } = req.body
        if (!email) return next(errorResponse(400, 'email is required'))
        let user = await checkUserWithEmail(email)
        if (!user) return next(errorResponse(404, `user with email ${email} was not found`))
        if (user.verifiedAccount) return next(errorResponse(400, `account with email ${email} is already verified`))

        const code = generateVerificationCode()
        await User.findOneAndUpdate({ email: user.email }, {
            verificationCode: code
        })

        const emailResponse = await sendEmail(user.email, 'verify your account', `enter this code to verify your email ${code}`)
        if (emailResponse) {
            return res.status(200).json({
                status: true, message: 'a code was sent to your email. Check it to verify your account'
            })
        }
        res.status(500).json({
            status: fale,
            message: 'something went wrong'
        })
    } catch (error) {
        console.log('[sending-code]:', error.message)
        next(errorResponse(500, 'internal server error'))
    }
}
export const verifyAccount = async (req, res, next) => {
    try {
        const { code, email } = req.body
        if (!code || !email) return next(errorResponse(400, 'you must provide the verification code and the user id'))

        const user = await User.findOne({ email })
        if (!user) return next(errorResponse(404, 'user was not found'))
        if (user.verifiedAccount) return next(errorResponse(400, 'account is already verified'))
        if (user.verificationCode !== parseInt(code)) return next(errorResponse(400, 'code is not correct'))

        await User.findOneAndUpdate({ email: user.email }, { verifiedAccount: true, verificationCode: 0 })
        res.status(200).json({
            status: true,
            message: 'account is verified'
        })
    } catch (error) {
        console.log('[verifying-account]:', error.message)
        next(errorResponse(500, 'internal server error'))
    }
}