# 🌍 TripNest - Travel Booking Platform

> Your ultimate travel companion for flights, hotels, and hassle-free bookings! ✈️🏨

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
![Status](https://img.shields.io/badge/status-In%20Development-orange.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

---

## ✨ Features

- 🔐 **User Authentication** - Secure registration & login with JWT
- ✈️ **Flight Booking** - Search, browse, and book flights
- 🏨 **Hotel Reservations** - Find hotels by location and book instantly
- 🎫 **Booking Management** - View, manage, and cancel reservations
- 🔔 **Real-time Notifications** - Get updates on your bookings
- 💳 **Payment Integration** - Secure payment processing
- 🚀 **Microservices Architecture** - Scalable and modular design

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│        Frontend (React + Vite)          │
│           Port 3000                     │
└───────────────────┬─────────────────────┘
                    │
┌───────────────────▼─────────────────────┐
│         API Gateway                     │
│         Port 5000                       │
└────────┬────────┬──────────┬────────┬───┘
         │        │          │        │
    ┌────▼────┐ ┌─▼─────┐ ┌─▼────┐ ┌▼────────┐
    │Auth 5001│ │Flight │ │Hotel │ │Booking  │
    │         │ │5002   │ │5005  │ │5003     │
    └────┬────┘ └─┬─────┘ └─┬────┘ └┬────────┘
         │        │         │       │
    ┌────▼────────▼─────────▼───────▼────┐
    │       MongoDB                      │
    │       Port 27017                   │
    └────────────────────────────────────┘
             │
         ┌───▼─────┐         ┌──────────────┐
         │ Redis   │         │Notification  │
         │ 6379    │         │Service (5006)│
         └─────────┘         └──────────────┘
```

---

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ (for local development)
- MongoDB 5+
- Redis 6+

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/tripnest.git
cd tripnest
```

2. **Environment Setup**
```bash
# Copy environment templates
cp services/auth-service/.env.example services/auth-service/.env
cp services/flight-service/.env.example services/flight-service/.env
cp services/booking-service/.env.example services/booking-service/.env
cp services/hotel-service/.env.example services/hotel-service/.env
cp services/notification-service/.env.example services/notification-service/.env
```

3. **Start Services with Docker**
```bash
docker-compose up -d --build
```

4. **Verify Services**
```bash
docker ps | grep tripnest
```

All services should be running:
- 🟢 API Gateway (5000)
- 🟢 Auth Service (5001)
- 🟢 Flight Service (5002)
- 🟢 Booking Service (5003)
- 🟢 Hotel Service (5005)
- 🟢 Notification Service (5006)

---

## 📝 API Documentation

### Authentication Endpoints

**Register User** 🔐
```bash
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Login** 🔑
```bash
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Flight Endpoints

**Search Flights** ✈️
```bash
GET /flights/search?from=NYC&to=LAX
```

**Create Flight** ✏️
```bash
POST /flights
Content-Type: application/json

{
  "airline": "Delta",
  "from": "NYC",
  "to": "LAX",
  "price": 500,
  "departureTime": "10:00",
  "arrivalTime": "13:00"
}
```

**Get Flight Details** 📋
```bash
GET /flights/{flightId}
```

### Hotel Endpoints

**Search Hotels** 🏨
```bash
GET /hotels/search?location=Miami
```

**Create Hotel** 🏗️
```bash
POST /hotels
Content-Type: application/json

{
  "name": "Grand Plaza",
  "location": "Miami",
  "pricePerNight": 150,
  "rating": 4.5
}
```

**Get Hotel Details** 📍
```bash
GET /hotels/{hotelId}
```

### Booking Endpoints

**Create Booking** 🎫
```bash
POST /bookings
Content-Type: application/json

{
  "userId": "user_id",
  "flightId": "flight_id",
  "passengers": 2,
  "totalPrice": 1000
}
```

**Get User Bookings** 📚
```bash
GET /bookings/user/{userId}
```

**Cancel Booking** ❌
```bash
DELETE /bookings/{bookingId}
```

### Notification Endpoints

**Send Notification** 📬
```bash
POST /notifications/send
Content-Type: application/json

{
  "userId": "user_id",
  "title": "Booking Confirmed",
  "message": "Your flight is booked!",
  "type": "booking_confirmation",
  "deviceToken": "fcm_token"
}
```

**Get Notifications** 🔔
```bash
GET /notifications/user/{userId}
```

---

## 🛠️ Technology Stack

### Backend
| Service | Tech | Port |
|---------|------|------|
| API Gateway | Express.js, Axios | 5000 |
| Auth Service | Express.js, MongoDB, JWT, Bcrypt | 5001 |
| Flight Service | Express.js, MongoDB, Redis | 5002 |
| Booking Service | Express.js, MongoDB, Axios | 5003 |
| Hotel Service | Express.js, MongoDB, Firebase | 5005 |
| Notification Service | Express.js, MongoDB, Firebase FCM | 5006 |

### Database & Cache
- **MongoDB** - Main data storage
- **Redis** - Caching layer

### Frontend
- **React** - UI framework
- **Vite** - Build tool
- **Axios** - HTTP client

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Orchestration

---

## 📦 Project Structure

```
tripnest/
├── frontend/                 # React Vite application
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── api-gateway/             # API Gateway service
│   ├── server.js
│   ├── routes/
│   ├── middleware/
│   └── Dockerfile
│
├── services/
│   ├── auth-service/        # Authentication service
│   ├── flight-service/      # Flight management
│   ├── booking-service/     # Booking management
│   ├── hotel-service/       # Hotel management
│   ├── notification-service/# Notifications
│   └── payment-service/     # Payments (in progress)
│
├── docker-compose.yml       # Container orchestration
├── .gitignore              # Git ignore rules
├── README.md               # Project documentation
├── TODO.md                 # Development roadmap
└── TESTING_REPORT.md       # Testing results
```

---

## 🧪 Testing

### Run All Tests
```bash
npm test
```

### Test Specific Service
```bash
cd services/auth-service
npm test
```

### API Testing with PowerShell
```powershell
# Register
$body = '{"name":"Test","email":"test@example.com","password":"pass123"}'
Invoke-RestMethod -Uri "http://localhost:5000/auth/register" -Method Post -Body $body -ContentType "application/json"

# Login
$body = '{"email":"test@example.com","password":"pass123"}'
Invoke-RestMethod -Uri "http://localhost:5000/auth/login" -Method Post -Body $body -ContentType "application/json"
```

See [TESTING_REPORT.md](TESTING_REPORT.md) for detailed test results.

---

## 📋 Development Roadmap

Check [TODO.md](TODO.md) for:
- 🔴 Priority 1: Core Backend Completion
- 🟠 Priority 2: Security & Authentication
- 🟡 Priority 3: Frontend Integration
- 🟢 Priority 4: Features & Functionality
- 🔵 Priority 5-10: Testing, Performance, Deployment

---

## 🐛 Known Issues

- Firebase FCM requires valid device tokens for production
- Payment Service (WIP)
- Authentication middleware not yet implemented
- Rate limiting needs fine-tuning

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👥 Authors

- **Your Name** - Initial work - [GitHub](https://github.com/yourusername)

---

## 🙋 Support

For support, email support@tripnest.com or open an issue on GitHub.

---

## 📞 Contact

- 📧 Email: admin@tripnest.com
- 🐦 Twitter: [@tripnest](https://twitter.com/tripnest)
- 💬 Discord: [Join Community](https://discord.gg/tripnest)

---

## 🎯 Roadmap Highlights

- ✅ Microservices architecture
- ✅ Docker containerization
- ✅ MongoDB integration
- ✅ Redis caching
- 🚧 JWT authentication middleware
- 🚧 Frontend integration
- 🚧 Payment processing
- 📅 Mobile app (React Native)
- 📅 AI recommendations

---

## 🙏 Acknowledgments

- Thanks to the open-source community
- Special thanks to Express.js, MongoDB, and React communities

---

**Made with ❤️ by TripNest Team**

⭐ If you like this project, please give it a star! ⭐
