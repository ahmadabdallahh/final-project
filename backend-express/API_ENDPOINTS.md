# E-Commerce API Documentation

**Base URL:** `http://localhost:8000/api`

---

## 🔐 Authentication Routes

### POST /api/login
Admin authentication - returns JWT token

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "password"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "Admin",
    "email": "admin@example.com",
    "is_admin": true
  }
}
```

**Error (422):**
```json
{
  "message": "The provided credentials are incorrect.",
  "errors": [
    {
      "field": "email",
      "message": "The provided credentials are incorrect."
    }
  ]
}
```

### POST /api/logout
Logout admin user (requires authentication)

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "message": "Logout successful"
}
```

---

## 📦 Product Routes

### GET /api/products
List all products with pagination, search, and filtering

**Query Parameters:**
- `search` (string) - Search products by name
- `category` (string) - Filter by category slug
- `page` (integer, default: 1) - Page number
- `limit` (integer, default: 12) - Items per page

**Examples:**
```
GET /api/products
GET /api/products?search=phone
GET /api/products?category=electronics
GET /api/products?page=2&limit=6
GET /api/products?search=laptop&category=electronics&page=1
```

**Response (200):**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Smartphone",
      "slug": "smartphone",
      "description": "Latest smartphone with amazing features",
      "price": "599.99",
      "stock": 50,
      "image": "products/smartphone.jpg",
      "category_id": 1,
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z",
      "category": {
        "id": 1,
        "name": "Electronics",
        "slug": "electronics"
      }
    }
  ],
  "meta": {
    "current_page": 1,
    "last_page": 3,
    "per_page": 12,
    "total": 35
  }
}
```

### GET /api/products/:slug
Get single product by slug

**Example:**
```
GET /api/products/smartphone
```

**Response (200):**
```json
{
  "data": {
    "id": 1,
    "name": "Smartphone",
    "slug": "smartphone",
    "description": "Latest smartphone with amazing features",
    "price": "599.99",
    "stock": 50,
    "image": "products/smartphone.jpg",
    "category_id": 1,
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z",
    "category": {
      "id": 1,
      "name": "Electronics",
      "slug": "electronics"
    }
  }
}
```

**Error (404):**
```json
{
  "message": "Product not found"
}
```

### POST /api/products
Create new product (requires admin authentication)

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "New Product",
  "slug": "new-product",
  "description": "Product description",
  "price": 99.99,
  "stock": 25,
  "image": "products/new-product.jpg",
  "category_id": 1
}
```

**Response (201):**
```json
{
  "message": "Product created successfully",
  "data": {
    "id": 10,
    "name": "New Product",
    "slug": "new-product",
    "description": "Product description",
    "price": "99.99",
    "stock": 25,
    "image": "products/new-product.jpg",
    "category_id": 1,
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z",
    "category": {
      "id": 1,
      "name": "Electronics",
      "slug": "electronics"
    }
  }
}
```

### PUT /api/products/:id
Update existing product (requires admin authentication)

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Updated Product",
  "price": 149.99,
  "stock": 30
}
```

**Response (200):**
```json
{
  "message": "Product updated successfully",
  "data": {
    "id": 1,
    "name": "Updated Product",
    "slug": "smartphone",
    "description": "Latest smartphone with amazing features",
    "price": "149.99",
    "stock": 30,
    "image": "products/smartphone.jpg",
    "category_id": 1,
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z",
    "category": {
      "id": 1,
      "name": "Electronics",
      "slug": "electronics"
    }
  }
}
```

### DELETE /api/products/:id
Delete product (requires admin authentication)

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "message": "Product deleted successfully"
}
```

---

## 📂 Category Routes

### GET /api/categories
List all categories with product count

**Response (200):**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Electronics",
      "slug": "electronics",
      "products_count": 15,
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    },
    {
      "id": 2,
      "name": "Clothing",
      "slug": "clothing",
      "products_count": 8,
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### GET /api/categories/:slug
Get single category with all its products

**Example:**
```
GET /api/categories/electronics
```

**Response (200):**
```json
{
  "data": {
    "id": 1,
    "name": "Electronics",
    "slug": "electronics",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z",
    "products": [
      {
        "id": 1,
        "name": "Smartphone",
        "slug": "smartphone",
        "description": "Latest smartphone with amazing features",
        "price": "599.99",
        "stock": 50,
        "image": "products/smartphone.jpg",
        "category_id": 1,
        "created_at": "2024-01-01T00:00:00.000Z",
        "updated_at": "2024-01-01T00:00:00.000Z",
        "category": {
          "id": 1,
          "name": "Electronics",
          "slug": "electronics"
        }
      }
    ]
  }
}
```

**Error (404):**
```json
{
  "message": "Category not found"
}
```

---

## 🔍 Health Check

### GET /up
Check if server is running

**Response (200):**
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

---

## 🚨 Error Responses

### Authentication Errors (401)
```json
{
  "message": "Unauthorized. No token provided."
}
```

### Forbidden Errors (403)
```json
{
  "message": "Forbidden. Admin access required."
}
```

### Validation Errors (422)
```json
{
  "message": "Validation failed",
  "errors": [
    {
      "field": "name",
      "message": "Name is required"
    },
    {
      "field": "price",
      "message": "Price must be at least 0"
    }
  ]
}
```

### Not Found Errors (404)
```json
{
  "message": "Route /api/unknown not found"
}
```

### Server Errors (500)
```json
{
  "message": "Internal Server Error"
}
```

---

## 🔑 Default Credentials

After running `npm run db:seed`:

**Email:** `admin@example.com`  
**Password:** `password`

---

## 📝 Notes

- All timestamps are in ISO 8601 format
- JWT tokens expire after 24 hours
- Passwords are hashed using bcrypt
- All admin routes require `Authorization: Bearer {token}` header
- CORS is configured for `http://localhost:3000`, `http://localhost:5173`, `http://127.0.0.1:5173`
- Pagination uses 1-based indexing
- Search is case-insensitive and matches partial names
- Category filtering requires exact slug match
