# DropMe - Ride Hailing Application

A comprehensive ride-hailing platform connecting riders with nearby bike and car drivers.

## 🚀 Project Overview

DropMe is an online ride-booking platform with:
- **Admin Dashboard** - Manage drivers, riders, rides, and pricing
- **Driver App** - Accept rides, manage earnings, track performance
- **Rider App** - Book rides, track drivers, make payments

## 🛠️ Technology Stack

### Backend
- **Framework**: NestJS (Node.js)
- **Database**: PostgreSQL
- **Authentication**: JWT + OTP
- **Real-time**: Socket.IO
- **Storage**: AWS S3
- **Maps**: Google Maps API

### Frontend
- **Admin Dashboard**: Next.js + React
- **Mobile Apps**: Flutter (Android & iOS)

### Infrastructure
- **Hosting**: AWS (EC2/RDS)
- **Notifications**: Firebase Cloud Messaging
- **Monitoring**: Sentry + CloudWatch

## 📁 Project Structure

```
dropme-ride-hailing/
├── backend/                    # NestJS API
│   ├── src/
│   │   ├── auth/              # Authentication
│   │   ├── users/             # User management
│   │   ├── drivers/           # Driver management
│   │   ├── riders/            # Rider management
│   │   ├── rides/             # Ride management
│   │   ├── payments/          # Payment processing
│   │   ├── admin/             # Admin functions
│   │   └── common/            # Shared utilities
│   ├── database/              # Migrations
│   └── test/
├── admin-dashboard/           # Next.js Admin Panel
│   ├── components/
│   ├── pages/
│   ├── styles/
│   └── public/
├── mobile-app/                # Flutter Mobile App
│   ├── lib/
│   │   ├── screens/
│   │   ├── models/
│   │   ├── services/
│   │   └── widgets/
│   └── pubspec.yaml
├── database/                  # SQL migrations
├── docker/                    # Docker configurations
├── docs/                      # Documentation
└── README.md
```

## 🚀 Quick Start

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
npm run start:dev
```

### Admin Dashboard
```bash
cd admin-dashboard
npm install
npm run dev
```

### Mobile App
```bash
cd mobile-app
flutter pub get
flutter run
```

## 📋 Features

### Admin Dashboard
- ✅ Driver management (approve, reject, suspend)
- ✅ Rider management (suspend, activate, delete)
- ✅ Real-time ride monitoring
- ✅ Dynamic pricing configuration
- ✅ KYC verification center
- ✅ Support ticket management
- ✅ Revenue reports and analytics

### Driver App
- ✅ Profile management
- ✅ Go Online/Offline
- ✅ Accept/Reject rides
- ✅ Real-time navigation
- ✅ Earnings tracking
- ✅ Ratings and reviews
- ✅ Wallet and withdrawals

### Rider App
- ✅ Book rides (bike/car)
- ✅ Real-time driver tracking
- ✅ Multiple payment options
- ✅ Ride history
- ✅ Rate drivers
- ✅ Emergency SOS
- ✅ Ride sharing

## 🔒 Security Features

- JWT Authentication
- OTP verification
- Encrypted passwords
- SSL/TLS encryption
- Role-based access control
- Rate limiting
- Secure file uploads
- Cloud backup

## 📚 Documentation

See `/docs` for detailed documentation:
- API Reference
- Database Schema
- Setup Guides
- Deployment Instructions

## 🤝 Contributing

Follow the contribution guidelines in `CONTRIBUTING.md`

## 📄 License

MIT

## 👨‍💻 Author

etest7290-hue
