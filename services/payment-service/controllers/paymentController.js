import Payment from "../models/Payment.js"
import crypto from "crypto"

// Create payment
export const createPayment = async (req, res) => {
  try {
    const { userId, bookingId, amount, currency, method, description } = req.body

    // Validation
    if (!userId || !bookingId || !amount || !method) {
      return res.status(400).json({
        error: "Missing required fields: userId, bookingId, amount, method"
      })
    }

    if (amount <= 0) {
      return res.status(400).json({ error: "Amount must be greater than 0" })
    }

    // Generate transaction ID
    const transactionId = `TXN-${Date.now()}-${crypto.randomBytes(4).toString("hex")}`

    const payment = new Payment({
      userId,
      bookingId,
      amount,
      currency: currency || "USD",
      method,
      description,
      transactionId,
      status: "pending"
    })

    await payment.save()

    res.status(201).json({
      success: true,
      message: "Payment created successfully",
      payment
    })
  } catch (error) {
    console.error("Create payment error:", error)
    res.status(500).json({ error: error.message })
  }
}

// Process payment (simulate payment gateway)
export const processPayment = async (req, res) => {
  try {
    const { paymentId } = req.params
    const { cardToken } = req.body

    if (!paymentId) {
      return res.status(400).json({ error: "Payment ID is required" })
    }

    const payment = await Payment.findById(paymentId)

    if (!payment) {
      return res.status(404).json({ error: "Payment not found" })
    }

    if (payment.status === "completed") {
      return res.status(400).json({ error: "Payment already completed" })
    }

    // Simulate payment processing
    // In production, you would integrate with Stripe, PayPal, etc.
    const isSuccessful = Math.random() > 0.1 // 90% success rate for demo

    if (isSuccessful) {
      payment.status = "completed"
      payment.updatedAt = Date.now()
      await payment.save()

      res.json({
        success: true,
        message: "Payment processed successfully",
        payment
      })
    } else {
      payment.status = "failed"
      payment.updatedAt = Date.now()
      await payment.save()

      res.status(400).json({
        error: "Payment processing failed. Please try again."
      })
    }
  } catch (error) {
    console.error("Process payment error:", error)
    res.status(500).json({ error: error.message })
  }
}

// Get payment by ID
export const getPaymentById = async (req, res) => {
  try {
    const { paymentId } = req.params

    if (!paymentId) {
      return res.status(400).json({ error: "Payment ID is required" })
    }

    const payment = await Payment.findById(paymentId)

    if (!payment) {
      return res.status(404).json({ error: "Payment not found" })
    }

    res.json(payment)
  } catch (error) {
    console.error("Get payment error:", error)
    res.status(500).json({ error: error.message })
  }
}

// Get payment by transaction ID
export const getPaymentByTransactionId = async (req, res) => {
  try {
    const { transactionId } = req.params

    if (!transactionId) {
      return res.status(400).json({ error: "Transaction ID is required" })
    }

    const payment = await Payment.findOne({ transactionId })

    if (!payment) {
      return res.status(404).json({ error: "Payment not found" })
    }

    res.json(payment)
  } catch (error) {
    console.error("Get payment by transaction ID error:", error)
    res.status(500).json({ error: error.message })
  }
}

// Get payments by user ID
export const getPaymentsByUserId = async (req, res) => {
  try {
    const { userId } = req.params
    const { status, limit = 10, skip = 0 } = req.query

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" })
    }

    const query = { userId }
    if (status) query.status = status

    const payments = await Payment.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip))

    const total = await Payment.countDocuments(query)

    res.json({
      payments,
      total,
      limit: parseInt(limit),
      skip: parseInt(skip)
    })
  } catch (error) {
    console.error("Get payments by user error:", error)
    res.status(500).json({ error: error.message })
  }
}

// Get payments by booking ID
export const getPaymentsByBookingId = async (req, res) => {
  try {
    const { bookingId } = req.params

    if (!bookingId) {
      return res.status(400).json({ error: "Booking ID is required" })
    }

    const payments = await Payment.find({ bookingId }).sort({ createdAt: -1 })

    res.json(payments)
  } catch (error) {
    console.error("Get payments by booking error:", error)
    res.status(500).json({ error: error.message })
  }
}

// Refund payment
export const refundPayment = async (req, res) => {
  try {
    const { paymentId } = req.params
    const { reason } = req.body

    if (!paymentId) {
      return res.status(400).json({ error: "Payment ID is required" })
    }

    const payment = await Payment.findById(paymentId)

    if (!payment) {
      return res.status(404).json({ error: "Payment not found" })
    }

    if (payment.status !== "completed") {
      return res.status(400).json({
        error: "Only completed payments can be refunded"
      })
    }

    if (payment.status === "refunded") {
      return res.status(400).json({ error: "Payment already refunded" })
    }

    payment.status = "refunded"
    payment.metadata = {
      ...payment.metadata,
      refundReason: reason || "No reason provided",
      refundedAt: new Date()
    }
    payment.updatedAt = Date.now()
    await payment.save()

    res.json({
      success: true,
      message: "Payment refunded successfully",
      payment
    })
  } catch (error) {
    console.error("Refund payment error:", error)
    res.status(500).json({ error: error.message })
  }
}

// Get payment statistics
export const getPaymentStats = async (req, res) => {
  try {
    const { userId } = req.query

    const query = userId ? { userId } : {}

    const stats = await Payment.aggregate([
      { $match: query },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
          totalAmount: { $sum: "$amount" }
        }
      }
    ])

    const totalPayments = await Payment.countDocuments(query)
    const totalAmount = await Payment.aggregate([
      { $match: query },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ])

    res.json({
      totalPayments,
      totalAmount: totalAmount[0]?.total || 0,
      byStatus: stats
    })
  } catch (error) {
    console.error("Get payment stats error:", error)
    res.status(500).json({ error: error.message })
  }
}
