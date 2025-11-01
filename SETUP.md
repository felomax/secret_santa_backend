# Secret Santa Backend - Setup Guide

> 📚 **For complete API documentation with all endpoints, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)**
> 
> 📮 **Import the Postman collection: [Secret_Santa_API.postman_collection.json](./Secret_Santa_API.postman_collection.json)**

## Database Configuration

### Connection Details

**Railway PostgreSQL Database:**
- Host: `shortline.proxy.rlwy.net`
- Port: `22612`
- Database: `railway`
- User: `postgres`
- Password: `WeBuGbzLQmqUjQmMiyHlnXrxyUezUaCd`

### Create .env file

Create a `.env` file in the root directory with the following content:

```env
DATABASE_URL=postgresql://postgres:WeBuGbzLQmqUjQmMiyHlnXrxyUezUaCd@shortline.proxy.rlwy.net:22612/railway
```

## Project Structure

The project has been configured with two main modules:

### 1. People Module (`/src/people`)
Manages people data for Secret Santa

**Entity fields:**
- `id`: UUID (auto-generated)
- `name`: String (255 chars)
- `email`: String (255 chars, unique)
- `notes`: Text (optional)
- `enable`: Boolean (optional)
- `gifts`: OneToMany relationship with Gif[]
- `createdAt`: Timestamp
- `updatedAt`: Timestamp

**API Endpoints:**
- `POST /people` - Create a new person
- `GET /people` - Get all people
- `GET /people/:id` - Get a specific person
- `PATCH /people/:id` - Update a person
- `DELETE /people/:id` - Delete a person

### 2. Gif Module (`/src/gif`)
Manages GIF data (gifts)

**Entity fields:**
- `id`: UUID (auto-generated)
- `url`: String (500 chars)
- `title`: String (255 chars)
- `description`: Text (optional)
- `category`: String (100 chars, optional)
- `people_id`: UUID (foreign key to Person, optional)
- `person`: ManyToOne relationship with Person
- `createdAt`: Timestamp
- `updatedAt`: Timestamp

**API Endpoints:**
- `POST /gif` - Create a new gif
- `GET /gif` - Get all gifs (optional `?category=` or `?peopleId=` query params)
- `GET /gif/:id` - Get a specific gif
- `PATCH /gif/:id` - Update a gif
- `DELETE /gif/:id` - Delete a gif

**Note:** When filtering by `peopleId`, the response is optimized and doesn't include full person details.

## Running the Application

1. Install dependencies (already done):
```bash
npm install
```

2. Create the `.env` file (see above)

3. Start the development server:
```bash
npm run start:dev
```

The API will be available at `http://localhost:3000`

## Database

- Using TypeORM with PostgreSQL
- Database synchronization is enabled in development (auto-creates tables)
- Connection configured in `src/app.module.ts`

## Example API Requests

### Create a Person
```bash
curl -X POST http://localhost:3000/people \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "notes": "Likes tech gadgets",
    "enable": true
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "notes": "Likes tech gadgets",
    "enable": true,
    "createdAt": "2025-11-01T00:00:00.000Z",
    "updatedAt": "2025-11-01T00:00:00.000Z"
  }
}
```

### Get a Person with their Gifts
```bash
curl http://localhost:3000/people/:personId
```

### Create a Gif (Gift)
```bash
curl -X POST http://localhost:3000/gif \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://media.giphy.com/media/example/giphy.gif",
    "title": "Happy Dance",
    "category": "celebration",
    "people_id": "uuid-of-person"
  }'
```

### Get Gifts by Person
```bash
curl http://localhost:3000/gif?peopleId=uuid-of-person
```

### Get Gifts by Category
```bash
curl http://localhost:3000/gif?category=celebration
```
