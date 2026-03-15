import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import paymentRoutes from "./routes/paymentRoutes.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

// Routes
app.use("/payments", paymentRoutes)

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "Payment Service is running" })
})

// Connect to database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Payment DB Connected"))
  .catch(err => console.log("Database connection error:", err))

// Start server
app.listen(5004, () => {
  console.log("Payment Service running on port 5004")
})
