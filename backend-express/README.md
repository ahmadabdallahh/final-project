# E-Commerce API (Express.js)

Node.js/Express.js backend API converted from Laravel. Uses Sequelize ORM with MySQL.

---

## 📁 Folder Structure

```
backend-express/
├── app.js                    # Main server file
├── package.json              # Dependencies & scripts
├── .env.example              # Environment variables template
├── .env                      # Environment variables (created by user)
├── config/
│   └── database.js           # Sequelize configuration
├── controllers/
│   ├── authController.js     # Authentication logic
│   ├── productController.js    # Product CRUD
│   └── categoryController.js # Category operations
├── middleware/
│   ├── auth.js               # JWT authentication
│   ├── validation.js         # Request validation
│   └── errorHandler.js       # Global error handling
├── models/
│   ├── User.js               # User model
│   ├── Category.js           # Category model
│   ├── Product.js            # Product model
│   └── index.js              # Model associations
├── routes/
│   └── api.js                # API route definitions
└── scripts/
    ├── migrate.js            # Database migration script
    └── seed.js               # Database seeder script
```

---

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
cd backend-express
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env with your database credentials
```

### 3. Setup MySQL Database

Create a MySQL database:
```sql
CREATE DATABASE ecommerce CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 4. Run Migrations & Seeds

```bash
npm run db:migrate
npm run db:seed
```

### 5. Start Server

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Server will run on `http://localhost:8000`

---

## 🔌 API Endpoints

Same as Laravel backend:

### Public Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/login` | Admin login |
| GET | `/api/products` | List products (paginated) |
| GET | `/api/products/:slug` | Single product |
| GET | `/api/categories` | List categories |
| GET | `/api/categories/:slug` | Category with products |

### Protected Routes (Admin Only)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/logout` | Logout |
| POST | `/api/products` | Create product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |

**Query Parameters:**
- `?search=term` - Search products
- `?category=slug` - Filter by category
- `?page=1&limit=12` - Pagination

---

## 🔑 Default Credentials

After seeding:
- **Email:** `admin@example.com`
- **Password:** `password`

---

## 🗄️ Database Schema

Uses same schema as Laravel:
- `users` - Admin accounts
- `categories` - Product categories
- `products` - Products with foreign key to categories

---

## 📦 Dependencies

| Package | Purpose |
|---------|---------|
| express | Web framework |
| sequelize | ORM for MySQL |
| mysql2 | MySQL driver |
| bcryptjs | Password hashing |
| jsonwebtoken | JWT authentication |
| express-validator | Request validation |
| cors | CORS handling |
| dotenv | Environment variables |

---

## 🔀 Key Differences from Laravel

| Feature | Laravel | Express |
|---------|---------|---------|
| **Authentication** | Sanctum tokens | JWT tokens |
| **ORM** | Eloquent | Sequelize |
| **Validation** | Form Requests | express-validator |
| **Routing** | Route facade | Express Router |
| **Middleware** | PHP classes | JS functions |
| **Error Handling** | Exceptions | Centralized middleware |

---

## 🛠️ Development Commands

```bash
npm run dev          # Start with nodemon
npm start            # Start production server
npm run db:migrate   # Run migrations
npm run db:seed      # Run seeders
```

---

## 📝 Notes

- JWT tokens expire after 24 hours
- Same API responses as Laravel for frontend compatibility
- CORS configured for React frontend on ports 3000/5173
- Auto-sync models on startup (creates tables if missing)
