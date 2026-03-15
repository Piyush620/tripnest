import express from "express"
import {
  createPayment,
  processPayment,
  getPaymentById,
  getPaymentByTransactionId,
  getPaymentsByUserId,
  getPaymentsByBookingId,
  refundPayment,
  getPaymentStats
} from "../controllers/paymentController.js"

const router = express.Router()

// Create payment
router.post("/", createPayment)

// Process payment (simulated payment gateway)
router.post("/:paymentId/process", processPayment)

// Refund payment
router.post("/:paymentId/refund", refundPayment)

// Get payment by ID
router.get("/:paymentId", getPaymentById)

// Get payment by transaction ID
router.get("/transaction/:transactionId", getPaymentByTransactionId)

// Get payments by user ID with pagination and filtering
router.get("/user/:userId", getPaymentsByUserId)

// Get payments by booking ID
router.get("/booking/:bookingId", getPaymentsByBookingId)

// Get payment statistics
router.get("/stats", getPaymentStats)

export default router
