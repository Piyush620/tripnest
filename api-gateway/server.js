import express from "express"
import cors from "cors"
import axios from "axios"
import rateLimit from "express-rate-limit"

const app = express()

app.use(cors())
app.use(express.json())

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100
})

app.use(limiter)

const SERVICES = {
  AUTH: "http://auth-service:5001",
  FLIGHT: "http://flight-service:5002",
  BOOKING: "http://booking-service:5003",
  HOTEL: "http://hotel-service:5005",
  NOTIFICATION: "http://notification-service:5006"
}

async function forwardRequest(serviceUrl, req, res) {
  try {

    const response = await axios({
      method: req.method,
      url: `${serviceUrl}${req.originalUrl}`,
      data: req.body,
      params: req.query
    })

    res.status(response.status).json(response.data)

  } catch (error) {
    
    console.error("Gateway Error:", error.message)

    // Pass through the service error if available
    if (error.response) {
      res.status(error.response.status).json(error.response.data)
    } else {
      res.status(500).json({
        error: "Service unavailable"
      })
    }

  }
}

// AUTH
app.use("/auth", (req, res) => {
  forwardRequest(SERVICES.AUTH, req, res)
})

// FLIGHTS
app.use("/flights", (req, res) => {
  forwardRequest(SERVICES.FLIGHT, req, res)
})

// BOOKINGS
app.use("/bookings", (req, res) => {
  forwardRequest(SERVICES.BOOKING, req, res)
})

// HOTELS
app.use("/hotels", (req, res) => {
  forwardRequest(SERVICES.HOTEL, req, res)
})

// NOTIFICATIONS
app.use("/notifications", (req, res) => {
  forwardRequest(SERVICES.NOTIFICATION, req, res)
})

app.listen(5000, () => {
  console.log("API Gateway running on port 5000")
})