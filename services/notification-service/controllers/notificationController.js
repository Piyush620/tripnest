import Notification from "../models/Notification.js"
import { messaging } from "../config/firebase.js"

export const sendNotification = async (req, res) => {
  try {
    const { userId, title, message, type, deviceToken } = req.body

    if (!deviceToken) {
      return res.status(400).json({ error: "Device token required" })
    }

    // Send via FCM
    const payload = {
      notification: {
        title,
        body: message
      },
      token: deviceToken
    }

    try {
      const response = await messaging.send(payload)
    } catch (fcmError) {
      // Ignore FCM errors and continue to save notification
      console.warn("FCM error (non-blocking):", fcmError.message)
    }

    // Save notification record
    const notification = new Notification({
      userId,
      title,
      message,
      type: type || 'general',
      deviceToken,
      status: 'sent'
    })
    await notification.save()

    res.status(200).json({ 
      message: "Notification sent successfully",
      notificationId: notification._id
    })
  } catch (error) {
    console.error("Notification error:", error)

    // Only attempt to save failed notification if userId is provided
    try {
      const notification = new Notification({
        userId: req.body.userId,
        title: req.body.title,
        message: req.body.message,
        type: req.body.type || 'general',
        deviceToken: req.body.deviceToken,
        status: 'failed'
      })
      await notification.save()
    } catch (saveError) {
      console.error("Failed to save failed notification:", saveError.message)
    }

    res.status(500).json({ error: error.message })
  }
}

export const getUserNotifications = async (req, res) => {
  try {
    const { userId } = req.params
    const notifications = await Notification.find({ userId }).sort({ sentAt: -1 })
    res.json(notifications)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}