# E-Commerce Project (Laravel & React)

A full-stack e-commerce application with Laravel backend API and React frontend, featuring product management, shopping cart, and admin dashboard.

---

## 🏗️ Project Structure

```
finial project (laravel & react)/
├── backend/                 # Laravel API
│   ├── app/
│   │   ├── Http/Controllers/API/
│   │   │   ├── AuthController.php
│   │   │   ├── CategoryController.php
│   │   │   └── ProductController.php
│   │   ├── Http/Requests/
│   │   │   ├── StoreProductRequest.php
│   │   │   └── UpdateProductRequest.php
│   │   ├── Http/Resources/
│   │   │   ├── CategoryResource.php
│   │   │   └── ProductResource.php
│   │   └── Models/
│   │       ├── Category.php
│   │       ├── Product.php
│   │       └── User.php
│   ├── database/
│   │   ├── migrations/
│   │   │   ├── 2024_01_01_000001_create_categories_table.php
│   │   │   ├── 2024_01_01_000002_create_products_table.php
│   │   │   └── 2024_01_01_000003_add_is_admin_to_users_table.php
│   │   └── seeders/
│   │       ├── AdminSeeder.php
│   │       └── SampleDataSeeder.php
│   ├── routes/
│   │   ├── api.php
│   │   ├── web.php
│   │   └── console.php
│   └── config/
│       └── cors.php
└── frontend/               # React SPA
    ├── src/
    │   ├── components/
    │   │   └── Layout.jsx
    │   ├── context/
    │   │   └── CartContext.jsx
    │   ├── pages/
    │   │   ├── ProductList.jsx
    │   │   ├── ProductDetail.jsx
    │   │   ├── Cart.jsx
    │   │   ├── AdminLogin.jsx
    │   │   └── AdminDashboard.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    ├── tailwind.config.js
    ├── postcss.config.js
    └── vite.config.js
```

---

## 🚀 Features

### Customer Features
- **Product Browsing** - View all products with pagination
- **Product Search** - Search products by name
- **Category Filtering** - Filter products by category
- **Product Details** - Detailed product view with images
- **Shopping Cart** - Add/remove items, update quantities
- **Responsive Design** - Mobile-friendly UI with Tailwind CSS

### Admin Features
- **Secure Authentication** - Laravel Sanctum token-based auth
- **Product CRUD** - Create, read, update, delete products
- **Category Management** - View categories and product counts
- **Protected Routes** - Admin-only access to management features

---

## 🗄️ Database Schema

### Categories Table
```sql
- id (bigint, primary)
- name (string)
- slug (string, unique)
- created_at, updated_at (timestamps)
```

### Products Table
```sql
- id (bigint, primary)
- name (string)
- slug (string, unique)
- description (text, nullable)
- price (decimal 10,2)
- stock (integer)
- image (string, nullable)
- category_id (bigint, foreign key)
- created_at, updated_at (timestamps)
```

### Users Table
```sql
- id (bigint, primary)
- name (string)
- email (string, unique)
- password (string, hashed)
- is_admin (boolean, default false)
- created_at, updated_at (timestamps)
```

---

## 🔌 API Endpoints

### Public Routes
| Method | Endpoint | Description |
|---------|-----------|-------------|
| GET | `/api/products` | List all products (paginated) |
| GET | `/api/products/{slug}` | Get single product |
| GET | `/api/categories` | List all categories |
| GET | `/api/categories/{slug}` | Get category with products |

**Query Parameters:**
- `?search={term}` - Search products by name
- `?category={slug}` - Filter by category

### Admin Routes (Protected)
| Method | Endpoint | Description |
|---------|-----------|-------------|
| POST | `/api/login` | Admin authentication |
| POST | `/api/logout` | Logout (requires token) |
| POST | `/api/products` | Create new product |
| PUT | `/api/products/{id}` | Update existing product |
| DELETE | `/api/products/{id}` | Delete product |

---

## 🛠️ Technology Stack

### Backend (Laravel 12)
- **Framework**: Laravel 12
- **Authentication**: Laravel Sanctum
- **Database**: SQLite (development)
- **API**: RESTful JSON API
- **Validation**: Form Requests
- **Resources**: API Resource Classes

### Frontend (React 19)
- **Framework**: React 19
- **Routing**: React Router v6
- **Styling**: Tailwind CSS v4
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Build Tool**: Vite
- **State Management**: React Context + localStorage

---

## 📦 Dependencies

### Backend
```json
{
  "laravel/framework": "^12.0",
  "laravel/sanctum": "^4.0",
  "laravel/tinker": "^2.10.1"
}
```

### Frontend
```json
{
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "react-router-dom": "^6.22.3",
  "axios": "^1.6.7",
  "lucide-react": "^0.460.0",
  "tailwindcss": "^4.0.0",
  "vite": "^6.2.0"
}
```

---

## 🚀 Setup Instructions

### Prerequisites
- PHP 8.2+
- Composer
- Node.js 18+
- npm

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   composer install
   ```

3. **Configure environment**:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Install Sanctum**:
   ```bash
   composer require laravel/sanctum
   php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
   ```

5. **Run migrations**:
   ```bash
   php artisan migrate
   ```

6. **Seed database**:
   ```bash
   php artisan db:seed
   ```

7. **Start server**:
   ```bash
   php artisan serve
   ```

   **API URL**: `http://localhost:8000/api`

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

   **Frontend URL**: `http://localhost:5173`

---

## 🔑 Default Credentials

After running `php artisan db:seed`:

**Admin Account:**
- Email: `admin@example.com`
- Password: `password`

---

## 🎯 Usage Guide

### Customer Flow
1. Browse products on homepage
2. Search or filter by category
3. Click product for details
4. Add to cart with quantity
5. View cart and checkout

### Admin Flow
1. Login at `/admin/login`
2. Access dashboard at `/admin`
3. Manage products (CRUD operations)
4. View categories and product counts
5. Logout when done

---

## 🔄 Development Commands

### Backend
```bash
php artisan serve              # Start development server
php artisan migrate             # Run migrations
php artisan db:seed            # Seed database
php artisan route:list         # List all routes
php artisan tinker             # Interactive shell
```

### Frontend
```bash
npm run dev                  # Start development server
npm run build                 # Build for production
npm run preview               # Preview production build
npm run lint                  # Run ESLint
```

---

## 🎨 UI/UX Features

- **Responsive Design** - Mobile-first approach
- **Modern UI** - Clean, minimalist design
- **Loading States** - Skeleton loaders and spinners
- **Error Handling** - User-friendly error messages
- **Form Validation** - Real-time validation feedback
- **Hover Effects** - Interactive elements
- **Accessibility** - Semantic HTML and ARIA labels

---

## 🔒 Security Features

- **API Authentication** - Sanctum token-based auth
- **CORS Configuration** - Proper cross-origin handling
- **Input Validation** - Form request validation
- **SQL Injection Protection** - Eloquent ORM
- **XSS Protection** - Laravel's built-in protection
- **Password Hashing** - Bcrypt encryption

---

## 📊 Performance Features

- **API Pagination** - Efficient data loading
- **Image Optimization** - Lazy loading
- **Caching** - Browser caching headers
- **Code Splitting** - Vite automatic splitting
- **Minification** - Production build optimization

---

## 🧪 Testing

### Backend Tests
```bash
php artisan test              # Run PHPUnit tests
```

### Frontend Tests
```bash
npm test                     # Run frontend tests (if configured)
```

---

## 🚀 Production Deployment

### Backend
1. Configure production `.env`
2. Run `php artisan config:cache`
3. Run `php artisan route:cache`
4. Set up web server (Apache/Nginx)
5. Configure SSL certificate

### Frontend
1. Run `npm run build`
2. Deploy `dist/` folder to web server
3. Configure web server for SPA routing

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make your changes
4. Add tests if applicable
5. Submit pull request

---

## 📄 License

This project is open-source and available under the MIT License.

---

## 📞 Support

For issues and questions:
- Check the documentation
- Review the API routes
- Verify environment configuration
- Check browser console for errors

---

## 🔄 Version History

- **v1.0.0** - Initial release with full e-commerce functionality
  - Product management
  - Shopping cart
  - Admin authentication
  - Responsive UI
  - API integration

---

*Last Updated: March 2024*
