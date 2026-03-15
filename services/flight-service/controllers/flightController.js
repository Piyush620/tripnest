import Flight from "../models/Flight.js"
import redisClient from "../redis/client.js"

export const createFlight = async (req,res)=>{
  try {
    const flight = await Flight.create(req.body)
    res.json(flight)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const searchFlights = async (req,res)=>{
  try {
    const {from,to} = req.query

    const cacheKey = `flights:${from}-${to}`

    const cached = await redisClient.get(cacheKey)

    if(cached){
      console.log("Serving from Redis")
      return res.json(JSON.parse(cached))
    }

    const flights = await Flight.find({from,to})

    await redisClient.setEx(cacheKey,3600,JSON.stringify(flights))

    res.json(flights)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getFlightById = async (req, res) => {
  try {
    const { id } = req.params
    const flight = await Flight.findById(id)
    if (!flight) {
      return res.status(404).json({ error: "Flight not found" })
    }
    res.json(flight)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}