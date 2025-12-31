# Vibelyt – System Requirements Specification

This document is the canonical source of truth for the Vibelyt platform.

---

## 1. System Overview

### 1.1 Architecture

Frontend:
- iOS (SwiftUI, MVVM)

Backend:
- NestJS
- MongoDB
- Redis
- WebSockets

Infrastructure:
- GitHub Actions
- AWS S3
- Stripe / Razorpay

---

## 2. Security & Access Control

### 2.1 Authentication
- All APIs require JWT authentication
- Sensitive endpoints require HMAC verification
- Token expiration and refresh supported

---

### 2.2 Privacy Model
Each user field has visibility control:

- public
- logged_in
- match
- premium
- private

Privacy is enforced **server-side only**.

---

## 3. Modules

---

## Authentication
owner: backend
description: Login, signup, OTP verification, sessions, and authentication lifecycle.

### Responsibilities
- Email or mobile login
- OTP verification
- Session management
- Password reset via email (hash-based)

---

## Privacy Engine
owner: backend
description: Field-level privacy enforcement and access control.

### Responsibilities
- Field masking
- Permission evaluation
- Visibility rules enforcement

---

## Discovery
owner: backend
description: User discovery based on interest matching and ranking.

### Responsibilities
- Interest-based discovery
- Ranking by relevance
- Pagination and filtering

---

## Matching
owner: backend
description: Mutual interest matching logic.

### Responsibilities
- Match creation
- Match revocation
- Match history

---

## Chat
owner: backend
description: Real-time communication and messaging.

### Responsibilities
- WebSocket communication
- Message persistence
- Read receipts
- Blocking and reporting

---

## Gifts & Wallet
owner: backend
description: Virtual gifts and wallet system.

### Responsibilities
- Gift purchase
- Gift sending
- Wallet balance tracking

---

## Payments
owner: backend
description: External payment processing.

### Responsibilities
- Stripe / Razorpay integration
- Payment verification
- Transaction records

---

## Notifications
owner: backend
description: User notifications and alerts.

### Responsibilities
- Push notifications
- In-app notifications
- Event-based triggers

---

## Admin
owner: product
description: Admin panel and moderation tools.

### Responsibilities
- User moderation
- Analytics
- Content review

---

## 4. Global Requirements

### 4.1 Non-Functional
- API latency < 300ms
- High availability (99.9%)
- Horizontal scalability
- Audit logging

### 4.2 Security
- JWT + HMAC
- Rate limiting
- Input validation
- Role-based access control

### 4.3 Testing
- Unit tests
- Integration tests
- API contract tests

---

## 5. Compliance
- GDPR readiness
- Data deletion policies
- Consent tracking
