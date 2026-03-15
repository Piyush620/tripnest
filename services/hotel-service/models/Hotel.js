import mongoose from "mongoose"

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  description: {
    type: String,
    maxlength: 1000
  },
  pricePerNight: {
    type: Number,
    required: true,
    min: 0,
    validate: {
      validator: function(v) {
        return v >= 0
      },
      message: "Price cannot be negative"
    }
  },
  amenities: [String],
  images: [String],
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  totalRatings: {
    type: Number,
    default: 0
  },
  roomsAvailable: {
    type: Number,
    required: true,
    min: 0,
    default: 10
  },
  totalRooms: {
    type: Number,
    default: 10
  },
  checkInTime: {
    type: String,
    default: "14:00"
  },
  checkOutTime: {
    type: String,
    default: "12:00"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

// Indexes for faster queries
hotelSchema.index({ location: 1 })
hotelSchema.index({ city: 1, country: 1 })
hotelSchema.index({ rating: -1 })
hotelSchema.index({ pricePerNight: 1 })
hotelSchema.index({ name: "text", description: "text" })

export default mongoose.model('Hotel', hotelSchema)