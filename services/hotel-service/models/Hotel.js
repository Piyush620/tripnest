import mongoose from "mongoose"

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  pricePerNight: {
    type: Number,
    required: true
  },
  amenities: [String],
  images: [String],
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  roomsAvailable: {
    type: Number,
    default: 10
  }
})

export default mongoose.model('Hotel', hotelSchema)