import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import flightRoutes from "./routes/flightRoutes.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

// flight routes
app.use("/flights", flightRoutes)

// connect database
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Flight DB Connected"))
.catch(err=>console.log(err))

app.listen(5002,()=>{
 console.log("Flight Service running on port 5002")
})