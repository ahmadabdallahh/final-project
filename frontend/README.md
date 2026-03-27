# React E-Commerce Frontend

Modern e-commerce frontend built with React, Tailwind CSS, and React Router.

## Features

### Customer Features
- **Product Listing** - Browse all products with pagination
- **Product Search** - Search products by name
- **Category Filter** - Filter products by category
- **Product Details** - View detailed product information
- **Shopping Cart** - Add/remove items, update quantities (localStorage persistence)

### Admin Features
- **Authentication** - Secure login with Laravel Sanctum
- **Product Management** - Create, Read, Update, Delete products
- **Category Overview** - View all categories and product counts

---

## Project Structure

```
src/
├── components/
│   └── Layout.jsx         # Navbar + Footer
├── context/
│   └── CartContext.jsx    # Cart state management
├── pages/
│   ├── ProductList.jsx    # Homepage - product grid
│   ├── ProductDetail.jsx  # Single product view
│   ├── Cart.jsx           # Shopping cart page
│   ├── AdminLogin.jsx     # Admin authentication
│   └── AdminDashboard.jsx # Admin CRUD panel
├── services/
│   └── api.js             # Axios API configuration
├── App.jsx                # Main routing
└── main.jsx               # Entry point
```

---

## Setup Instructions

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

### 3. Backend Setup

Make sure the Laravel backend is running on `http://localhost:8000`

See `backend/API_README.md` for backend setup.

---

## Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `ProductList` | Homepage with product grid |
| `/product/:slug` | `ProductDetail` | Single product page |
| `/cart` | `Cart` | Shopping cart |
| `/admin/login` | `AdminLogin` | Admin authentication |
| `/admin` | `AdminDashboard` | Product management (protected) |

---

## API Integration

The frontend connects to the Laravel API at `http://localhost:8000/api`:

| Endpoint | Method | Usage |
|----------|--------|-------|
| `/products` | GET | List all products |
| `/products?search=term` | GET | Search products |
| `/products?category=slug` | GET | Filter by category |
| `/products/{slug}` | GET | Get single product |
| `/categories` | GET | List categories |
| `/login` | POST | Admin login |
| `/products` | POST | Create product (admin) |
| `/products/{id}` | PUT | Update product (admin) |
| `/products/{id}` | DELETE | Delete product (admin) |

---

## Cart Functionality

Cart data is persisted in `localStorage`:
- Add items with quantity
- Update quantities
- Remove individual items
- Clear entire cart
- Auto-calculate totals

---

## Admin Credentials

Default admin login (set by backend seeder):
- **Email:** `admin@example.com`
- **Password:** `password`

---

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^19.2.0 | UI framework |
| react-router-dom | ^6.22.3 | Routing |
| axios | ^1.6.7 | HTTP client |
| lucide-react | ^0.344.0 | Icons |
| tailwindcss | ^3.4.1 | Styling |

---

## Build for Production

```bash
npm run build
```

Output will be in `dist/` folder.
