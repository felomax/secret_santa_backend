# Security Documentation

## 🔒 Security Features Implemented

The Secret Santa Backend implements comprehensive security measures to protect the API and user data.

## Authentication & Authorization

### JWT (JSON Web Tokens)
- **Token-based authentication** using JWT
- **Token expiration**: 24 hours (configurable)
- **Secure token generation** with strong secret keys
- **Bearer token** authentication in HTTP headers

### Password Security
- **Bcrypt hashing** with salt rounds: 10
- **Password requirements**:
  - Minimum length: 8 characters
  - Must contain: uppercase, lowercase, and number/special character
- **Automatic password hashing** on user creation (BeforeInsert hook)

### User Roles
- **role-based access control** (RBAC)
- Roles: `user`, `admin`
- Custom `@Roles()` decorator for endpoint protection

## Security Middlewares

### Helmet
- Sets secure HTTP headers
- Protects against common vulnerabilities:
  - XSS (Cross-Site Scripting)
  - Clickjacking
  - MIME-type sniffing
  - DNS Prefetch Control

### CORS (Cross-Origin Resource Sharing)
- **Configurable origins** via environment variables
- **Credentials support** enabled
- **Allowed methods**: GET, POST, PUT, PATCH, DELETE, OPTIONS
- **Allowed headers**: Content-Type, Authorization

### Rate Limiting (Throttler)
- **Time window**: 60 seconds (configurable)
- **Request limit**: 10 requests per window (configurable)
- Protects against brute force attacks and DDoS

### Validation Pipe
- **Input validation** using class-validator
- **Whitelist mode**: Strips unknown properties
- **Forbid non-whitelisted**: Throws error on unknown properties
- **Transform enabled**: Auto-converts types

## Guards & Decorators

### JwtAuthGuard
- **Global guard** applied to all endpoints
- Validates JWT tokens on every request
- Extracts user information from token payload

### RolesGuard
- Validates user roles for specific endpoints
- Used with `@Roles()` decorator

### Custom Decorators

#### @Public()
Marks endpoints as publicly accessible (no authentication required)

```typescript
@Public()
@Post('login')
async login() { ... }
```

#### @Roles('admin')
Restricts access to specific roles

```typescript
@Roles('admin')
@Delete(':id')
async deleteUser() { ... }
```

#### @CurrentUser()
Injects authenticated user data into endpoint

```typescript
@Get('profile')
async getProfile(@CurrentUser() user) { ... }
```

## API Security

### Protected Endpoints
All endpoints are protected by default unless marked with `@Public()`:
- `/api/v1/people/*` - Requires authentication
- `/api/v1/gif/*` - Requires authentication

### Public Endpoints
- `/api/v1/auth/register` - User registration
- `/api/v1/auth/login` - User login

### Authentication Flow

1. **Register**: `POST /api/v1/auth/register`
   ```json
   {
     "username": "john",
     "email": "john@example.com",
     "password": "SecurePass123!"
   }
   ```

2. **Login**: `POST /api/v1/auth/login`
   ```json
   {
     "email": "john@example.com",
     "password": "SecurePass123!"
   }
   ```

3. **Response**: Receive JWT token
   ```json
   {
     "success": true,
     "data": {
       "user": { ... },
       "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
     }
   }
   ```

4. **Use Token**: Include in Authorization header
   ```
   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
   ```

## Environment Variables

### Required Security Variables

```env
# JWT Secret - Change this to a strong random string
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# JWT Expiration Time
JWT_EXPIRATION=24h

# Allowed Origins for CORS
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001

# Rate Limiting
THROTTLE_TTL=60000
THROTTLE_LIMIT=10
```

## Database Security

### User Entity Security
- **Password field** excluded from query results by default
- **Email uniqueness** enforced at database level
- **Soft delete** capability with `isActive` flag
- **Automatic timestamps**: createdAt, updatedAt

### SQL Injection Prevention
- **TypeORM ORM** prevents SQL injection
- **Parameterized queries** used throughout
- **Input validation** before database operations

## Best Practices Implemented

### ✅ Secure Headers
- X-Frame-Options
- X-Content-Type-Options
- X-XSS-Protection
- Strict-Transport-Security

### ✅ Input Validation
- DTOs with class-validator
- Type checking and transformation
- Whitelist and blacklist validation

### ✅ Error Handling
- Generic error messages to prevent information leakage
- Proper HTTP status codes
- No stack traces in production

### ✅ Token Management
- Short-lived tokens (24h default)
- Secure token storage recommendations
- Token validation on each request

## Security Checklist for Production

- [ ] Change `JWT_SECRET` to a strong random string (32+ characters)
- [ ] Set `DATABASE_URL` to production database
- [ ] Configure `ALLOWED_ORIGINS` with production URLs only
- [ ] Set `synchronize: false` in TypeORM config
- [ ] Enable HTTPS/TLS
- [ ] Configure proper logging and monitoring
- [ ] Set up database backups
- [ ] Configure rate limiting based on expected traffic
- [ ] Review and adjust JWT expiration time
- [ ] Implement refresh token mechanism (optional)
- [ ] Set up API key rotation policy
- [ ] Enable database connection pooling
- [ ] Configure proper CORS origins

## Security Testing

### Manual Testing
```bash
# Test registration
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@example.com","password":"Test123!"}'

# Test login
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!"}'

# Test protected endpoint (should fail without token)
curl http://localhost:3000/api/v1/people

# Test with valid token
curl http://localhost:3000/api/v1/people \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Rate Limiting Test
```bash
# Send 15 requests quickly (should be rate limited after 10)
for i in {1..15}; do
  curl http://localhost:3000/api/v1/auth/login
done
```

## Common Security Issues & Solutions

### Issue: Token Expired
**Error**: `401 Unauthorized - Invalid token or user inactive`
**Solution**: Login again to get a new token

### Issue: Rate Limited
**Error**: `429 Too Many Requests`
**Solution**: Wait for the time window to reset (60 seconds)

### Issue: Weak Password
**Error**: `400 Bad Request - Password must contain uppercase, lowercase, and number/special character`
**Solution**: Use a stronger password meeting requirements

### Issue: Invalid Credentials
**Error**: `401 Unauthorized - Invalid credentials`
**Solution**: Check email and password are correct

## Security Contacts

For security vulnerabilities, please contact the development team privately before public disclosure.

## Updates & Patches

Regularly update dependencies:
```bash
npm audit
npm audit fix
npm update
```

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [NestJS Security](https://docs.nestjs.com/security/authentication)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [Passport.js Documentation](http://www.passportjs.org/)
