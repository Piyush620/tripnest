import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import fileupload from "express-fileupload"
import hotelRoutes from "./routes/hotelRoutes.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(fileupload())

app.use("/hotels", hotelRoutes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Hotel DB Connected"))
  .catch(err => console.log(err))

app.listen(5005, () => {
  console.log("Hotel Service running on port 5005")
})