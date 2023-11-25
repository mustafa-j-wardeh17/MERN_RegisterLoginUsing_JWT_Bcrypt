import express from "express";
import cors from 'cors'
import mongoose from "mongoose";
import dotenv from 'dotenv'
import userRouter from './routes/userRouter.js'

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173/'
}))

mongoose.connect(process.env.DB_URL).then(() => {
    console.log("connected to database")
}).catch(() => {
    console.log('failed connection to database')
})

app.use('/', userRouter)


app.listen(5002, () => {
    console.log('server running on localhost')
})