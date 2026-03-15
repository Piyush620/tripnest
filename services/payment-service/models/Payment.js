import mongoose from "mongoose"

const paymentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  bookingId: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: "USD",
    enum: ["USD", "EUR", "GBP", "INR"]
  },
  method: {
    type: String,
    required: true,
    enum: ["credit_card", "debit_card", "paypal", "stripe"]
  },
  status: {
    type: String,
    enum: ["pending", "completed", "failed", "refunded"],
    default: "pending"
  },
  transactionId: {
    type: String,
    unique: true
  },
  description: {
    type: String
  },
  metadata: {
    type: Object,
    default: {}
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

// Index for faster queries
paymentSchema.index({ userId: 1 })
paymentSchema.index({ bookingId: 1 })
paymentSchema.index({ status: 1 })
paymentSchema.index({ createdAt: -1 })
paymentSchema.index({ transactionId: 1 })

export default mongoose.model('Payment', paymentSchema)
