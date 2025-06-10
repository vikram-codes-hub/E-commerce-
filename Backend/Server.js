import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productreoute.js'
import cartrouter from './routes/Cartroute.js'
import orderRouter from './routes/orderRoute.js'

const app=express()
const port=process.env.PORT || 4000
connectDB()
connectCloudinary()

app.use(express.json())
app.use(cors())

app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartrouter)
app.use('/api/order',orderRouter)

app.get('/',(req,res)=>{
    res.send("API working")
})

app.listen(port,()=>console.log("App started at port : "+port))