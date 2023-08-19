import express from 'express'
import errorHandler from './middlewares/errorHandler.js'
import dbConfig from './configs/db.config.js'
import { config } from 'dotenv'
import errorResponse from './utils/errorResponse.js'

if (process.env.NODE_ENV !== 'production') config()
const app = express()

app.use(express.json())
// app.use(express.urlencoded({ extended: false }))

dbConfig(process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/vox').then((conn) => {
    console.log('connected to db')
}).then(() => {
    const server = app.listen(process.env.PORT || 8080, () => {
        console.log('listening after connecting to db')
    })
})


app.all('*', (req, res, next) => {
    next(errorResponse(404, 'route not found'))
})
app.use(errorHandler)
