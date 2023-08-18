import express from 'express'


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const server = app.listen(process.env.PORT || 8080, () => {
    console.log('listening')
})

