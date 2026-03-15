import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import notificationRoutes from "./routes/notificationRoutes.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/notifications", notificationRoutes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Notification DB Connected"))
  .catch(err => console.log(err))

app.listen(5006, () => {
  console.log("Notification Service running on port 5006")
})