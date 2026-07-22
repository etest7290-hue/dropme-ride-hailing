# API Reference

## Base URL
```
http://localhost:3000/api
```

## Authentication

All endpoints require JWT token in Authorization header:
```
Authorization: Bearer <jwt_token>
```

## Response Format

All responses follow this format:
```json
{
  "data": { /* response data */ },
  "status": "success" | "error",
  "message": "Description"
}
```

## Auth Endpoints

### Register User
```
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "phoneNumber": "+923001234567",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "rider" | "driver"
}

Response: 201 Created
{
  "id": "uuid",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "role": "rider"
}
```

### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "rider"
  },
  "token": "jwt_token"
}
```

## Rides Endpoints

### Request Ride
```
POST /rides/request
Authorization: Bearer <token>
Content-Type: application/json

{
  "pickupLocation": "Downtown",
  "pickupLat": 24.8607,
  "pickupLng": 67.0011,
  "dropoffLocation": "Airport",
  "dropoffLat": 24.9144,
  "dropoffLng": 67.1711,
  "vehicleType": "car",
  "estimatedFare": 450
}

Response: 201 Created
{
  "id": "ride_uuid",
  "status": "requested",
  "estimatedFare": 450,
  "createdAt": "2024-01-01T10:00:00Z"
}
```

### Get Available Rides
```
GET /rides/available
Authorization: Bearer <token>

Response: 200 OK
[
  {
    "id": "ride_uuid",
    "pickupLocation": "Downtown",
    "dropoffLocation": "Airport",
    "estimatedFare": 450,
    "status": "requested"
  }
]
```

### Accept Ride
```
POST /rides/:id/accept
Authorization: Bearer <token>

Response: 200 OK
{
  "id": "ride_uuid",
  "status": "accepted",
  "driver": { /* driver info */ }
}
```

### Complete Ride
```
POST /rides/:id/complete
Authorization: Bearer <token>
Content-Type: application/json

{
  "finalFare": 475
}

Response: 200 OK
{
  "id": "ride_uuid",
  "status": "completed",
  "finalFare": 475
}
```

## Payments Endpoints

### Create Payment
```
POST /payments
Authorization: Bearer <token>
Content-Type: application/json

{
  "rideId": "ride_uuid",
  "amount": 475,
  "paymentMethod": "card" | "wallet" | "cash"
}

Response: 201 Created
{
  "id": "payment_uuid",
  "status": "pending",
  "amount": 475
}
```

### Confirm Payment
```
POST /payments/:id/confirm
Authorization: Bearer <token>
Content-Type: application/json

{
  "transactionId": "txn_12345"
}

Response: 200 OK
{
  "id": "payment_uuid",
  "status": "success",
  "transactionId": "txn_12345"
}
```

## Admin Endpoints

### Get Pricing
```
GET /admin/pricing/:type

Response: 200 OK
{
  "id": "pricing_uuid",
  "type": "car",
  "baseFare": 100,
  "pricePerKm": 25,
  "minimumFare": 200
}
```

### Update Pricing
```
PUT /admin/pricing/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "baseFare": 120,
  "pricePerKm": 30
}

Response: 200 OK
{
  "id": "pricing_uuid",
  "type": "car",
  "baseFare": 120,
  "pricePerKm": 30
}
```

## Error Responses

### 400 Bad Request
```json
{
  "status": "error",
  "message": "Invalid input",
  "errors": {
    "email": "Email is required"
  }
}
```

### 401 Unauthorized
```json
{
  "status": "error",
  "message": "Unauthorized"
}
```

### 404 Not Found
```json
{
  "status": "error",
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "status": "error",
  "message": "Internal server error"
}
```

## Rate Limiting

- 100 requests per minute per IP
- 1000 requests per hour per user

## Pagination

List endpoints support pagination:
```
GET /rides?page=1&limit=10&sort=createdAt:desc

Response:
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

## WebSocket Events

### Connect
```javascript
socket.on('connect', () => {
  console.log('Connected to server');
});
```

### Ride Updates
```javascript
// Driver tracking
socket.on('rideUpdate', (data) => {
  // Receive real-time ride updates
});

// Driver location
socket.emit('updateLocation', {
  lat: 24.8607,
  lng: 67.0011
});
```

---

For more details, visit: http://localhost:3000/api/docs
