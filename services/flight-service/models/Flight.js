import mongoose from "mongoose"

const flightSchema = new mongoose.Schema({

 airline: String,
 from: String,
 to: String,
 price: Number,
 departureTime: String,
 arrivalTime: String

})

const Flight = mongoose.model("Flight", flightSchema)

export default Flight