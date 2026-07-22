# DropMe - Ride Hailing Platform

## 📚 Documentation

Welcome to the complete DropMe Ride-Hailing Platform documentation. This guide will help you set up, configure, and deploy the entire platform.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Tech Stack](#tech-stack)
4. [Installation](#installation)
5. [Configuration](#configuration)
6. [Running Locally](#running-locally)
7. [API Documentation](#api-documentation)
8. [Database Schema](#database-schema)
9. [Deployment](#deployment)
10. [Contributing](#contributing)

## Project Overview

DropMe is a complete ride-hailing platform that connects riders with drivers. The platform includes:

- **Backend API**: NestJS-based REST API with real-time features
- **Admin Dashboard**: Next.js-based web interface for managing platform
- **Mobile Apps**: Flutter apps for both riders and drivers
- **Database**: PostgreSQL for data persistence
- **Real-time**: Socket.IO for live tracking and notifications

## Architecture

```
┌─────────────────┐
│  Rider Mobile   │
│   (Flutter)     │
└────────┬────────┘
         │
         │ HTTP/WebSocket
         ↓
┌─────────────────────────────────────┐
│    Backend API (NestJS)             │
│ ├─ Authentication                   │
│ ├─ Ride Management                  │
│ ├─ Payment Processing               │
│ ├─ Real-time Tracking               │
│ └─ Admin Operations                 │
└────────┬────────────────────────────┘
         │
         ↓
┌─────────────────┐    ┌─────────────────┐
│   PostgreSQL    │    │  Firebase       │
│   Database      │    │ Notifications   │
└─────────────────┘    └─────────────────┘
         ↑
         │
    ┌────┴────────┐
    │             │
┌───┴───┐    ┌───┴───┐
│Admin  │    │Driver │
│Next.js│    │Flutter│
└───────┘    └───────┘
```

## Tech Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: NestJS 10
- **Database**: PostgreSQL 15
- **Auth**: JWT + OTP
- **Real-time**: Socket.IO
- **File Upload**: AWS S3
- **Payments**: Stripe/Razorpay
- **SMS**: Twilio
- **Email**: SMTP (Gmail)
- **Maps**: Google Maps API

### Frontend (Admin)
- **Framework**: Next.js 14
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Charts**: Recharts
- **HTTP Client**: Axios

### Mobile (Rider & Driver)
- **Framework**: Flutter 3.10+
- **State Management**: Provider/GetX
- **Maps**: Google Maps Flutter
- **Auth**: Firebase Authentication
- **Notifications**: Firebase Cloud Messaging
- **Payment**: Razorpay

## Installation

### Prerequisites

- Node.js 18+ installed
- PostgreSQL 15+ installed
- Flutter 3.10+ installed
- Git installed
- Docker & Docker Compose (optional)

### Clone Repository

```bash
git clone https://github.com/etest7290-hue/dropme-ride-hailing.git
cd dropme-ride-hailing
```

## Configuration

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Copy environment file**
   ```bash
   cp .env.example .env
   ```

3. **Edit .env file** with your configurations:
   ```
   NODE_ENV=development
   PORT=3000
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=dropme_user
   DB_PASSWORD=dropme_password
   DB_NAME=dropme_db
   JWT_SECRET=your_secret_key
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

### Admin Dashboard Setup

1. **Navigate to admin directory**
   ```bash
   cd admin-dashboard
   ```

2. **Copy environment file**
   ```bash
   cp .env.local.example .env.local
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

### Mobile App Setup

1. **Navigate to mobile directory**
   ```bash
   cd mobile-app
   ```

2. **Get Flutter dependencies**
   ```bash
   flutter pub get
   ```

## Running Locally

### Option 1: Using Docker (Recommended)

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Option 2: Manual Setup

1. **Start PostgreSQL**
   ```bash
   # macOS
   brew services start postgresql
   
   # Linux
   sudo service postgresql start
   ```

2. **Create database**
   ```bash
   createdb dropme_db
   psql dropme_db < database/001_init.sql
   psql dropme_db < database/002_seed.sql
   ```

3. **Start Backend**
   ```bash
   cd backend
   npm run start:dev
   # Runs on http://localhost:3000
   ```

4. **Start Admin Dashboard** (in new terminal)
   ```bash
   cd admin-dashboard
   npm run dev
   # Runs on http://localhost:3001
   ```

5. **Start Mobile App** (in new terminal)
   ```bash
   cd mobile-app
   flutter run
   ```

## API Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication
All endpoints (except auth) require JWT Bearer token:
```
Authorization: Bearer <your_jwt_token>
```

### Key Endpoints

#### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/send-otp` - Send OTP via SMS
- `POST /auth/verify-otp` - Verify OTP
- `POST /auth/refresh-token` - Refresh JWT token

#### Rides
- `POST /rides/request` - Request a ride
- `GET /rides/available` - Get available rides (for drivers)
- `GET /rides/:id` - Get ride details
- `POST /rides/:id/accept` - Accept a ride (driver)
- `POST /rides/:id/start` - Start ride
- `POST /rides/:id/complete` - Complete ride
- `POST /rides/:id/cancel` - Cancel ride

#### Payments
- `POST /payments` - Create payment
- `GET /payments/:id` - Get payment details
- `POST /payments/:id/confirm` - Confirm payment
- `POST /payments/:id/refund` - Refund payment

#### Admin
- `GET /admin/pricing` - Get pricing
- `PUT /admin/pricing/:id` - Update pricing
- `GET /admin/support-tickets` - Get support tickets
- `POST /admin/support-tickets` - Create support ticket

### Swagger API Docs
Access interactive API documentation at:
```
http://localhost:3000/api/docs
```

## Database Schema

Key tables:

### Users
- Stores all user information
- Supports roles: admin, driver, rider
- Email and phone verification

### Drivers
- Linked to Users table
- Stores driver-specific information
- License and vehicle details
- Rating and earnings tracking

### Riders
- Linked to Users table
- KYC verification status
- Wallet balance
- Ride history

### Rides
- Connects riders and drivers
- Stores pickup/dropoff locations
- Tracks ride status and fare
- Records timestamps

### Payments
- Tracks all transactions
- Supports multiple payment methods
- Integration with Stripe

See `database/001_init.sql` for complete schema.

## Deployment

### Using Docker

1. **Build images**
   ```bash
   docker build -t dropme-backend:latest ./backend
   docker build -t dropme-admin:latest ./admin-dashboard
   ```

2. **Push to registry** (Docker Hub/AWS ECR)
   ```bash
   docker tag dropme-backend:latest your-registry/dropme-backend:latest
   docker push your-registry/dropme-backend:latest
   ```

3. **Deploy with Docker Compose**
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

### Cloud Deployment

#### AWS Deployment
1. Create RDS PostgreSQL instance
2. Deploy backend to ECS/EC2
3. Deploy admin to CloudFront + S3
4. Set up Route 53 for DNS
5. Enable CloudWatch for monitoring

#### Heroku Deployment
```bash
# Backend
heroku create dropme-api
git push heroku main

# Admin Dashboard
heroku create dropme-admin
git push heroku main:main
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Support

For issues and questions:
- GitHub Issues: Create an issue
- Email: support@dropme.com
- Documentation: Check `/docs` folder

## License

MIT License - See LICENSE file

## Authors

- etest7290-hue (Project Lead)

---

**Happy Coding! 🚀**
