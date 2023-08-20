import jwt from 'jsonwebtoken'
import User from '../models/User.model.js'
import erroResponse from '../utils/errorResponse.js'

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1]
        if (!token) return next(erroResponse(400, 'token is required'))
        let decodedToken = await jwt.verify(token, process.env.ACCESS_SECRET || 'my-secret-key')
        let { userId } = decodedToken
        if (!userId) return next(erroResponse(401, 'user id is missing in the token'))
        req.userId = userId
        next()
    } catch (error) {
        next(erroResponse(401, error.message))
    }
}

export default verifyToken