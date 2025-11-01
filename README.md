# 🎅 Secret Santa Backend

Backend API for Secret Santa application built with NestJS, TypeORM, and PostgreSQL.

## 📚 Documentation

- **[Setup Guide](./SETUP.md)** - Initial setup and configuration
- **[API Documentation](./API_DOCUMENTATION.md)** - Complete API reference with examples
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
http://localhost:3000
```

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

### People
- `POST /people` - Create person
- `GET /people` - Get all people with gifts
- `GET /people/:id` - Get person by ID
- `PATCH /people/:id` - Update person
- `DELETE /people/:id` - Delete person

### Gifts
- `POST /gif` - Create gift
- `GET /gif` - Get all gifts
- `GET /gif?peopleId=<uuid>` - Get gifts by person
- `GET /gif?category=<name>` - Get gifts by category
- `GET /gif/:id` - Get gift by ID
- `PATCH /gif/:id` - Update gift
- `DELETE /gif/:id` - Delete gift

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
- ✅ PostgreSQL database with TypeORM
- ✅ Entity relationships (OneToMany/ManyToOne)
- ✅ Data validation with DTOs
- ✅ Query filtering by person and category
- ✅ Optimized queries for performance
- ✅ Auto-generated UUIDs
- ✅ Timestamps (createdAt, updatedAt)

## 🗃️ Database Schema

### Tables
- **people** - Stores person information
- **gifs** - Stores gift information with foreign key to people

### Relationships
- One Person can have Many Gifts
- Each Gift belongs to One Person (optional)

## 📦 Example Usage

```bash
# Create a person (returns { success: true, data: {...} })
curl -X POST http://localhost:3000/people \
  -H "Content-Type: application/json" \
  -d '{"name":"Juan","email":"juan@example.com","enable":true}'

# Create a gift for that person
curl -X POST http://localhost:3000/gif \
  -H "Content-Type: application/json" \
  -d '{"url":"https://giphy.com/gif","title":"Gift","people_id":"<person-uuid>"}'

# Get all gifts for a person
curl http://localhost:3000/gif?peopleId=<person-uuid>
```

## 🔐 Environment Variables

Create a `.env` file:
```env
DATABASE_URL=postgresql://user:password@host:port/database
```

## 📖 Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [TypeORM Documentation](https://typeorm.io)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## 📄 License

This project is [MIT licensed](LICENSE).
