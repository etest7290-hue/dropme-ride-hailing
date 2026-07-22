# DropMe - Complete Build Instructions

## Quick Start (5 minutes)

### Option 1: Docker (Easiest)

```bash
# Clone repository
git clone https://github.com/etest7290-hue/dropme-ride-hailing.git
cd dropme-ride-hailing

# Create .env file
cp backend/.env.example backend/.env

# Start all services
docker-compose up -d

# Access applications
# Backend API: http://localhost:3000
# API Docs: http://localhost:3000/api/docs
# Admin Dashboard: http://localhost:3001
# Database: localhost:5432
```

### Option 2: Manual Setup

#### 1. Backend Setup
```bash
cd backend
cp .env.example .env
npm install
npm run start:dev
# Runs on http://localhost:3000
```

#### 2. Admin Dashboard Setup
```bash
cd admin-dashboard
cp .env.local.example .env.local
npm install
npm run dev
# Runs on http://localhost:3001
```

#### 3. Mobile App Setup
```bash
cd mobile-app
flutter pub get
flutter run
# Runs on connected device/emulator
```

## Features Included

✅ Complete Backend API (NestJS)
✅ Admin Dashboard (Next.js)
✅ Mobile Apps (Flutter)
✅ PostgreSQL Database
✅ Docker Configuration
✅ API Documentation
✅ Authentication System
✅ Payment Integration
✅ Real-time Tracking

## Quick Links

- Setup Guide: docs/SETUP_GUIDE.md
- API Reference: docs/API_REFERENCE.md
- Deployment: docs/DEPLOYMENT_GUIDE.md
- Contributing: CONTRIBUTING.md

## Tech Stack

Backend: NestJS, PostgreSQL, Socket.IO
Admin: Next.js, React, Tailwind CSS
Mobile: Flutter, Dart
Auth: JWT, OTP
Payment: Stripe, Razorpay

For complete documentation, see docs/ folder.
