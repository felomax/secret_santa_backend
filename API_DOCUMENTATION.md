# Secret Santa Backend - API Documentation

## 🚀 Base URL
```
http://localhost:3000/api/v1
```

## 🔒 Authentication

All endpoints require JWT authentication except:
- `POST /auth/register`
- `POST /auth/login`

Include JWT token in Authorization header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

## 🏗️ Project Structure

### Entities & Relationships

#### User Entity (Authentication + Secret Santa)
```typescript
{
  id: string (UUID)
  username: string
  email: string (unique)
  password: string (hashed)
  role: string (user/admin)
  isActive: boolean
  notes: string (optional) // Secret Santa notes
  enable: boolean (optional) // Secret Santa participation
  gifts: Gif[] (OneToMany)
  createdAt: Date
  updatedAt: Date
}
```

#### Gif Entity (Gifts)
```typescript
{
  id: string (UUID)
  url: string
  title: string
  description: string (optional)
  category: string (optional)
  user_id: string (UUID, FK to User)
  user: User (ManyToOne)
  createdAt: Date
  updatedAt: Date
}
```

**Relationships:**
- One User can have Many Gifts (OneToMany/ManyToOne)
- Users handle both authentication and Secret Santa participation

---

## 📡 API Endpoints

### 🔐 Authentication Endpoints

#### 1. Register User
```
POST /auth/register
```

**Headers:**
```json
Content-Type: application/json
```

**Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "notes": "Likes tech gadgets",
  "enable": true
}
```

**Password Requirements:**
- Minimum 8 characters
- Must contain uppercase letter
- Must contain lowercase letter
- Must contain number or special character

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "username": "johndoe",
      "email": "john@example.com",
      "role": "user",
      "isActive": true,
      "notes": "Likes tech gadgets",
      "enable": true,
      "createdAt": "2025-11-01T00:00:00.000Z",
      "updatedAt": "2025-11-01T00:00:00.000Z"
    },
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

#### 2. Login
```
POST /auth/login
```

**Headers:**
```json
Content-Type: application/json
```

**Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "username": "johndoe",
      "email": "john@example.com",
      "role": "user",
      "isActive": true,
      "createdAt": "2025-11-01T00:00:00.000Z",
      "updatedAt": "2025-11-01T00:00:00.000Z"
    },
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Response (401):**
```json
{
  "statusCode": 401,
  "message": "Invalid credentials",
  "error": "Unauthorized"
}
```

---

#### 3. Get Profile (Protected)
```
GET /auth/profile
```

**Headers:**
```json
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "username": "johndoe",
    "email": "john@example.com",
    "role": "user",
    "isActive": true,
    "createdAt": "2025-11-01T00:00:00.000Z",
    "updatedAt": "2025-11-01T00:00:00.000Z"
  }
}
```

---

### 👥 People Endpoints (Protected)

#### 1. Create Person
```
POST /people
```

**Headers:**
```json
Content-Type: application/json
```

**Body:**
```json
{
  "name": "Juan Perez",
  "email": "jperez@gmail.com",
  "notes": "Likes tech gadgets",
  "enable": true
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "e95b882d-db32-4a84-b851-5536bb74c9fe",
    "name": "Juan Perez",
    "email": "jperez@gmail.com",
    "notes": "Likes tech gadgets",
    "enable": true,
    "createdAt": "2025-11-01T00:44:09.398Z",
    "updatedAt": "2025-11-01T00:44:09.398Z"
  }
}
```

---

#### 2. Get All People (with their gifts)
```
GET /people
```

**Response (200):**
```json
[
  {
    "id": "e95b882d-db32-4a84-b851-5536bb74c9fe",
    "name": "Juan Perez",
    "email": "jperez@gmail.com",
    "notes": "Likes tech gadgets",
    "enable": true,
    "gifts": [
      {
        "id": "cce11727-7dfb-4c24-9c5f-5c83188ca9b8",
        "url": "https://media.giphy.com/media/example/giphy.gif",
        "title": "Happy Dance",
        "description": null,
        "category": "celebration",
        "createdAt": "2025-11-01T00:44:45.254Z",
        "updatedAt": "2025-11-01T00:44:45.254Z",
        "people_id": "e95b882d-db32-4a84-b851-5536bb74c9fe"
      }
    ],
    "createdAt": "2025-11-01T00:44:09.398Z",
    "updatedAt": "2025-11-01T00:44:09.398Z"
  }
]
```

---

#### 3. Get Person by ID (with their gifts)
```
GET /people/:id
```

**Example:**
```
GET /people/e95b882d-db32-4a84-b851-5536bb74c9fe
```

**Response (200):** Same as individual person object above

**Response (404):**
```json
{
  "statusCode": 404,
  "message": "Person with ID {id} not found",
  "error": "Not Found"
}
```

---

#### 4. Update Person
```
PATCH /people/:id
```

**Headers:**
```json
Content-Type: application/json
```

**Body (partial update):**
```json
{
  "name": "Juan Carlos Perez",
  "enable": false
}
```

**Response (200):** Updated person object

---

#### 5. Delete Person
```
DELETE /people/:id
```

**Response (200):** Empty response

---

### 🎁 Gift (Gif) Endpoints

#### 1. Create Gift
```
POST /gif
```

**Headers:**
```json
Content-Type: application/json
```

**Body:**
```json
{
  "url": "https://media.giphy.com/media/example/giphy.gif",
  "title": "Happy Dance",
  "description": "A celebration gif",
  "category": "celebration",
  "people_id": "e95b882d-db32-4a84-b851-5536bb74c9fe"
}
```

**Response (201):**
```json
{
  "id": "cce11727-7dfb-4c24-9c5f-5c83188ca9b8",
  "url": "https://media.giphy.com/media/example/giphy.gif",
  "title": "Happy Dance",
  "description": "A celebration gif",
  "category": "celebration",
  "people_id": "e95b882d-db32-4a84-b851-5536bb74c9fe",
  "createdAt": "2025-11-01T00:44:45.254Z",
  "updatedAt": "2025-11-01T00:44:45.254Z"
}
```

---

#### 2. Get All Gifts (with person info)
```
GET /gif
```

**Response (200):**
```json
[
  {
    "id": "cce11727-7dfb-4c24-9c5f-5c83188ca9b8",
    "url": "https://media.giphy.com/media/example/giphy.gif",
    "title": "Happy Dance",
    "description": "A celebration gif",
    "category": "celebration",
    "createdAt": "2025-11-01T00:44:45.254Z",
    "updatedAt": "2025-11-01T00:44:45.254Z",
    "people_id": "e95b882d-db32-4a84-b851-5536bb74c9fe",
    "person": {
      "id": "e95b882d-db32-4a84-b851-5536bb74c9fe",
      "name": "Juan Perez",
      "email": "jperez@gmail.com",
      "notes": "Likes tech gadgets",
      "enable": true,
      "createdAt": "2025-11-01T00:44:09.398Z",
      "updatedAt": "2025-11-01T00:44:09.398Z"
    }
  }
]
```

---

#### 3. Get Gifts by Person ID (filtered response)
```
GET /gif?peopleId=<person-uuid>
```

**Example:**
```
GET /gif?peopleId=e95b882d-db32-4a84-b851-5536bb74c9fe
```

**Response (200):**
```json
[
  {
    "id": "cce11727-7dfb-4c24-9c5f-5c83188ca9b8",
    "url": "https://media.giphy.com/media/example/giphy.gif",
    "title": "Happy Dance",
    "description": "A celebration gif",
    "category": "celebration",
    "createdAt": "2025-11-01T00:44:45.254Z",
    "updatedAt": "2025-11-01T00:44:45.254Z",
    "people_id": "e95b882d-db32-4a84-b851-5536bb74c9fe"
  }
]
```

> **Note:** This endpoint returns a simplified response without the full person object (optimized query).

---

#### 4. Get Gifts by Category
```
GET /gif?category=<category-name>
```

**Example:**
```
GET /gif?category=celebration
```

**Response (200):** Array of gifts with full person info

---

#### 5. Get Gift by ID
```
GET /gif/:id
```

**Example:**
```
GET /gif/cce11727-7dfb-4c24-9c5f-5c83188ca9b8
```

**Response (200):** Single gift object with person info

**Response (404):**
```json
{
  "statusCode": 404,
  "message": "Gif with ID {id} not found",
  "error": "Not Found"
}
```

---

#### 6. Update Gift
```
PATCH /gif/:id
```

**Headers:**
```json
Content-Type: application/json
```

**Body (partial update):**
```json
{
  "title": "Super Happy Dance",
  "category": "party"
}
```

**Response (200):** Updated gift object

---

#### 7. Delete Gift
```
DELETE /gif/:id
```

**Response (200):** Empty response

---

## 📮 Postman Collection

### Import to Postman

Create a new collection and add these requests:

#### Environment Variables
```
base_url = http://localhost:3000
person_id = <your-person-uuid>
gift_id = <your-gift-uuid>
```

#### Collection Structure

```
Secret Santa API
├── People
│   ├── Create Person (POST {{base_url}}/people)
│   ├── Get All People (GET {{base_url}}/people)
│   ├── Get Person by ID (GET {{base_url}}/people/{{person_id}})
│   ├── Update Person (PATCH {{base_url}}/people/{{person_id}})
│   └── Delete Person (DELETE {{base_url}}/people/{{person_id}})
└── Gifts
    ├── Create Gift (POST {{base_url}}/gif)
    ├── Get All Gifts (GET {{base_url}}/gif)
    ├── Get Gifts by Person (GET {{base_url}}/gif?peopleId={{person_id}})
    ├── Get Gifts by Category (GET {{base_url}}/gif?category=celebration)
    ├── Get Gift by ID (GET {{base_url}}/gif/{{gift_id}})
    ├── Update Gift (PATCH {{base_url}}/gif/{{gift_id}})
    └── Delete Gift (DELETE {{base_url}}/gif/{{gift_id}})
```

---

## 🔧 Quick Start

1. **Install dependencies:**
```bash
npm install
```

2. **Create `.env` file:**
```env
DATABASE_URL=postgresql://postgres:WeBuGbzLQmqUjQmMiyHlnXrxyUezUaCd@shortline.proxy.rlwy.net:22612/railway
```

3. **Start development server:**
```bash
npm run start:dev
```

4. **Test the API:**
```bash
# Create a person
curl -X POST http://localhost:3000/people \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","enable":true}'

# Get all people
curl http://localhost:3000/people
```

---

## 🗄️ Database Schema

```sql
-- People table
CREATE TABLE people (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  notes TEXT,
  enable BOOLEAN,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

-- Gifs table (gifts)
CREATE TABLE gifs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  url VARCHAR(500) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  people_id UUID,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  FOREIGN KEY (people_id) REFERENCES people(id)
);
```

---

## 🛠️ Technologies Used

- **NestJS** - Backend framework
- **TypeORM** - ORM for database operations
- **PostgreSQL** - Database
- **Railway** - Database hosting
- **TypeScript** - Programming language

---

## 📝 Notes

- All IDs are UUIDs
- Timestamps are automatically managed by TypeORM
- Database synchronization is enabled in development (tables auto-create)
- Foreign key constraint ensures data integrity between people and gifts
- The `findByPerson` endpoint uses optimized queries with selective fields
