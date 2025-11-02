# 🎅 Secret Santa Backend

Backend API for Secret Santa application built with NestJS, TypeORM, and PostgreSQL with comprehensive security features.

## 📚 Documentation

- **[Setup Guide](./SETUP.md)** - Initial setup and configuration
- **[API Documentation](./API_DOCUMENTATION.md)** - Complete API reference with examples
- **[Security Documentation](./SECURITY.md)** - Security features and best practices
- **[Postman Collection](./Secret_Santa_API.postman_collection.json)** - Import directly to Postman

## 🚀 Quick Start

### Prerequisites

- Node.js (v18+)
- PostgreSQL database (Railway)
- npm or yarn

### Installation

**1. Install dependencies:**
```bash
npm install
```

**2. Create `.env` file:**
```env
DATABASE_URL=postgresql://postgres:WeBuGbzLQmqUjQmMiyHlnXrxyUezUaCd@shortline.proxy.rlwy.net:22612/railway
```

**3. Start the server:**
```bash
# Development mode with auto-reload
npm run start:dev

# Production mode
npm run start:prod
```

**4. Test the API:**
```
http://localhost:3000/api/v1
```

## 🔒 Security Features

- **JWT Authentication** - Token-based authentication
- **Password Hashing** - Bcrypt with salt rounds
- **Role-Based Access Control** - User and admin roles
- **Rate Limiting** - Protection against brute force attacks
- **Helmet** - Secure HTTP headers
- **CORS** - Configurable cross-origin requests
- **Input Validation** - Class-validator with DTOs
- **SQL Injection Protection** - TypeORM parameterized queries

See [SECURITY.md](./SECURITY.md) for complete security documentation.

## 🏗️ Project Structure

```
src/
├── people/              # People module
│   ├── entities/        # Person entity
│   ├── dto/            # Data transfer objects
│   ├── people.controller.ts
│   ├── people.service.ts
│   └── people.module.ts
├── gif/                # Gifts module
│   ├── entities/       # Gif entity
│   ├── dto/           # Data transfer objects
│   ├── gif.controller.ts
│   ├── gif.service.ts
│   └── gif.module.ts
├── app.module.ts       # Root module
└── main.ts            # Entry point
```

## 🔗 API Endpoints

### Authentication (Public)
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/profile` - Get user profile (Protected)

### People (Protected)
- `POST /api/v1/people` - Create person
- `GET /api/v1/people` - Get all people with gifts
- `GET /api/v1/people/:id` - Get person by ID
- `PATCH /api/v1/people/:id` - Update person
- `DELETE /api/v1/people/:id` - Delete person

### Gifts (Protected)
- `POST /api/v1/gif` - Create gift
- `GET /api/v1/gif` - Get all gifts
- `GET /api/v1/gif?peopleId=<uuid>` - Get gifts by person
- `GET /api/v1/gif?category=<name>` - Get gifts by category
- `GET /api/v1/gif/:id` - Get gift by ID
- `PATCH /api/v1/gif/:id` - Update gift
- `DELETE /api/v1/gif/:id` - Delete gift

## 🛠️ Technologies

- **NestJS** - Backend framework
- **TypeORM** - ORM for database operations
- **PostgreSQL** - Database
- **TypeScript** - Programming language
- **Railway** - Database hosting

## 🧪 Testing

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## 📝 Features

- ✅ RESTful API with CRUD operations
- ✅ **JWT Authentication & Authorization**
- ✅ **Password Hashing with Bcrypt**
- ✅ **Role-Based Access Control (RBAC)**
- ✅ **Rate Limiting (10 req/min)**
- ✅ **Helmet Security Headers**
- ✅ **CORS Protection**
- ✅ PostgreSQL database with TypeORM
- ✅ Entity relationships (OneToMany/ManyToOne)
- ✅ Data validation with DTOs (class-validator)
- ✅ Query filtering by person and category
- ✅ Optimized queries for performance
- ✅ Auto-generated UUIDs
- ✅ Timestamps (createdAt, updatedAt)
- ✅ Global API prefix (/api/v1)

## 🗃️ Database Schema

### Tables
- **people** - Stores person information
- **gifs** - Stores gift information with foreign key to people

### Relationships
- One Person can have Many Gifts
- Each Gift belongs to One Person (optional)

## 📦 Example Usage

```bash
# Register a new user
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"john","email":"john@example.com","password":"SecurePass123!"}'

# Login (get JWT token)
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"SecurePass123!"}'

# Use token to access protected endpoints
TOKEN="your-jwt-token-here"

# Create a person (Protected)
curl -X POST http://localhost:3000/api/v1/people \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"name":"Juan","email":"juan@example.com","enable":true}'

# Create a gift for that person
curl -X POST http://localhost:3000/api/v1/gif \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"url":"https://giphy.com/gif","title":"Gift","people_id":"<person-uuid>"}'

# Get all gifts for a person
curl http://localhost:3000/api/v1/gif?peopleId=<person-uuid> \
  -H "Authorization: Bearer $TOKEN"
```

## 🔐 Environment Variables

Create a `.env` file:
```env
# Database
DATABASE_URL=postgresql://user:password@host:port/database

# JWT
JWT_SECRET=your-super-secret-key-change-this
JWT_EXPIRATION=24h

# Server
PORT=3000
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001

# Security
THROTTLE_TTL=60000
THROTTLE_LIMIT=10
```

## 📖 Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [TypeORM Documentation](https://typeorm.io)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## 📄 License

This project is [MIT licensed](LICENSE).
