import Hotel from "../models/Hotel.js"
// import { bucket } from "../config/firebase.js"

export const createHotel = async (req, res) => {
  try {
    const hotel = new Hotel(req.body)
    await hotel.save()
    res.status(201).json(hotel)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const searchHotels = async (req, res) => {
  try {
    const { location } = req.query
    const hotels = await Hotel.find({ location: new RegExp(location, 'i') })
    res.json(hotels)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id)
    if (!hotel) {
      return res.status(404).json({ error: "Hotel not found" })
    }
    res.json(hotel)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// export const uploadImage = async (req, res) => {
//   try {
//     if (!req.files || !req.files.image) {
//       return res.status(400).json({ error: "No image file provided" })
//     }
//     const file = req.files.image
//     const fileName = `hotels/${Date.now()}_${file.name}`
//     const fileUpload = bucket.file(fileName)
//     const stream = fileUpload.createWriteStream({
//       metadata: {
//         contentType: file.mimetype
//       }
//     })
//     stream.on('error', (error) => {
//       res.status(500).json({ error: error.message })
//     })
//     stream.on('finish', async () => {
//       await fileUpload.makePublic()
//       const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`
//       const hotel = await Hotel.findByIdAndUpdate(
//         req.params.id,
//         { $push: { images: publicUrl } },
//         { new: true }
//       )
//       res.json({ imageUrl: publicUrl, hotel })
//     })
//     stream.end(file.data)
//   } catch (error) {
//     res.status(500).json({ error: error.message })
//   }
// }