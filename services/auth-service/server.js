import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/auth", authRoutes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo Connected"))
  .catch(err => console.log(err))

app.listen(5001, () => {
  console.log("Auth service running on port 5001")
})