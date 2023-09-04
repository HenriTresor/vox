import express from 'express'
import errorHandler from './middlewares/errorHandler.js'
import dbConfig from './configs/db.config.js'
import { config } from 'dotenv'
import errorResponse from './utils/errorResponse.js'
import sendEmail from './utils/emailTransporter.js'
import cors from 'cors'
import { Server } from 'socket.io'
import http from 'http'

import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import workspaceRouter from './routes/workspace.route.js'


config()

const app = express()
const server = http.createServer(app)
app.use(express.json())
app.use(cors({
    origin: '*',
    credentials: true
}))
// app.use(express.urlencoded({ extended: false }))

dbConfig(process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/vox').then((conn) => {
    console.log('connected to db')
}).then(() => {
    server.listen(process.env.PORT || 8080, () => {
        console.log('listening after connecting to db')
    })
})

// routes

const root = '/api/v1/'

app.use(`${root}users`, userRouter)
app.use(`${root}auth`, authRouter)
app.use(`${root}workspaces`, workspaceRouter)
app.all('*', (req, res, next) => {
    next(errorResponse(404, 'route not found'))
})


app.use(errorHandler)

const io = new Server(server, {
    cors: {
        origin: '*',
        credentials: true
    }
})

io.on('connection', socket => {
    console.log('new socket', socket.id)

    socket.on('disconnect', () => {
        console.log('disconnect', socket.id)
    })
})