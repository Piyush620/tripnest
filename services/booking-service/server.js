import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import bookingRoutes from "./routes/bookingRoutes.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/bookings", bookingRoutes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Booking DB Connected"))
  .catch(err => console.log(err))

app.listen(5003, () => {
  console.log("Booking service running on port 5003")
})