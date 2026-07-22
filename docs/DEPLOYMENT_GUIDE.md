# Deployment Guide

## Pre-deployment Checklist

- [ ] All tests passing
- [ ] Environment variables configured
- [ ] Database backups created
- [ ] SSL certificates ready
- [ ] Domain name configured
- [ ] Email service configured
- [ ] SMS service configured
- [ ] Payment gateway configured

## Docker Deployment

### Build Images

```bash
# Backend
docker build -t dropme-backend:latest ./backend

# Admin
docker build -t dropme-admin:latest ./admin-dashboard
```

### Push to Registry

```bash
# Tag images
docker tag dropme-backend:latest myregistry/dropme-backend:latest
docker tag dropme-admin:latest myregistry/dropme-admin:latest

# Push
docker push myregistry/dropme-backend:latest
docker push myregistry/dropme-admin:latest
```

## AWS Deployment

### 1. Database Setup

```bash
# Create RDS PostgreSQL instance
- Engine: PostgreSQL 15
- Instance: db.t3.medium
- Storage: 100 GB
- Backup: 7 days
```

### 2. Backend Deployment

```bash
# Create ECS Cluster
aws ecs create-cluster --cluster-name dropme-cluster

# Create Task Definition
aws ecs register-task-definition --cli-input-json file://backend-task.json

# Create Service
aws ecs create-service --cluster dropme-cluster --service-name dropme-backend --task-definition dropme-backend
```

### 3. Admin Dashboard

```bash
# Build and upload to S3
npm run build
aws s3 sync ./out s3://dropme-admin-bucket/

# Create CloudFront Distribution
```

### 4. Domain Configuration

```bash
# Route 53
- API: api.dropme.com → ECS Load Balancer
- Admin: admin.dropme.com → CloudFront
- App: app.dropme.com → S3 (iOS/Android links)
```

## Heroku Deployment

### Backend

```bash
# Create app
heroku create dropme-api

# Add PostgreSQL
heroku addons:create heroku-postgresql:standard-0 --app dropme-api

# Set environment variables
heroku config:set NODE_ENV=production --app dropme-api
heroku config:set JWT_SECRET=your_secret --app dropme-api

# Deploy
git push heroku main

# Check logs
heroku logs --tail --app dropme-api
```

### Admin Dashboard

```bash
# Create app
heroku create dropme-admin

# Set environment variables
heroku config:set NEXT_PUBLIC_API_URL=https://dropme-api.herokuapp.com --app dropme-admin

# Deploy
git push heroku main
```

## Kubernetes Deployment

### Create Namespaces

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: dropme
```

### Deploy Backend

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: dropme-backend
  namespace: dropme
spec:
  replicas: 3
  selector:
    matchLabels:
      app: dropme-backend
  template:
    metadata:
      labels:
        app: dropme-backend
    spec:
      containers:
      - name: backend
        image: myregistry/dropme-backend:latest
        ports:
        - containerPort: 3000
        env:
        - name: DB_HOST
          value: postgres
        - name: DB_PORT
          value: "5432"
```

## Monitoring & Logging

### CloudWatch Metrics

```bash
# CPU Usage
aws cloudwatch get-metric-statistics --namespace AWS/ECS --metric-name CPUUtilization

# Memory Usage
aws cloudwatch get-metric-statistics --namespace AWS/ECS --metric-name MemoryUtilization
```

### Application Logs

```bash
# View logs
aws logs tail /ecs/dropme-backend --follow

# Filter logs
aws logs filter-log-events --log-group-name /ecs/dropme-backend --filter-pattern "ERROR"
```

## Backup & Recovery

### Database Backup

```bash
# Automated backups (RDS)
- Backup retention: 30 days
- Backup window: 03:00 UTC

# Manual backup
aws rds create-db-snapshot --db-instance-identifier dropme-db --db-snapshot-identifier dropme-backup-$(date +%Y%m%d)
```

### Restore Database

```bash
aws rds restore-db-instance-from-db-snapshot \
  --db-instance-identifier dropme-db-restored \
  --db-snapshot-identifier dropme-backup-20240101
```

## SSL/TLS Certificates

### Using AWS Certificate Manager

```bash
# Request certificate
aws acm request-certificate \
  --domain-name api.dropme.com \
  --domain-name admin.dropme.com \
  --validation-method DNS

# Validate and attach to load balancer
```

## Performance Optimization

### Caching

```bash
# CloudFront
- TTL: 3600s
- Cache policy: CachingOptimized

# ElastiCache (Redis)
- Node type: cache.t3.micro
- Engine: Redis 7
```

### Database Optimization

```sql
-- Add indexes
CREATE INDEX idx_rides_status ON rides(status);
CREATE INDEX idx_rides_created_at ON rides(created_at DESC);
```

## Security

### WAF Rules

```bash
# Enable AWS WAF
- Rate limiting: 2000 req/5min
- SQL injection protection
- XSS protection
```

### Secrets Management

```bash
# Store secrets in Secrets Manager
aws secretsmanager create-secret --name dropme/prod/db-password
```

---

For questions, contact: devops@dropme.com
