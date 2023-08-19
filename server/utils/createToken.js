import jwt from 'jsonwebtoken'
export default async (id) => {
    return await jwt.sign({ userId: id }, process.env.ACCESS_SECRET || 'my-secret-key')
}