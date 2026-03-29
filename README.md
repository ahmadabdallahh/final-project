# E-Commerce Project (React Frontend)

A modern e-commerce frontend application built with React, featuring product management, shopping cart, user authentication, and admin dashboard with local data storage.

---

## 🏗️ Project Structure

```
finial project (laravel & react)/
├── frontend/               # React SPA
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.jsx    # Main layout with navbar and footer
│   │   │   └── Toast.jsx     # Toast notification system
│   │   ├── context/
│   │   │   ├── AuthContext.jsx    # User authentication context
│   │   │   ├── CartContext.jsx    # Shopping cart state management
│   │   │   └── ThemeContext.jsx   # Dark mode theme management
│   │   ├── pages/
│   │   │   ├── ProductList.jsx    # Homepage with product grid
│   │   │   ├── ProductDetail.jsx  # Single product view
│   │   │   ├── Cart.jsx           # Shopping cart page
│   │   │   ├── AdminLogin.jsx     # Admin authentication
│   │   │   ├── AdminDashboard.jsx # Admin CRUD panel
│   │   │   ├── Register.jsx       # User registration
│   │   │   ├── AboutUs.jsx        # About page
│   │   │   └── ContactUs.jsx      # Contact page with form
│   │   ├── services/
│   │   │   ├── api.js             # API service layer with mock responses
│   │   │   └── localData.js       # Local storage data management
│   │   ├── data/
│   │   │   ├── products.json      # Initial product data
│   │   │   ├── categories.json    # Initial category data
│   │   │   └── initialUsers.json  # Initial user data
│   │   ├── App.jsx                # Main routing and layout
│   │   ├── main.jsx               # Application entry point
│   │   └── index.css              # Global styles
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vite.config.js
├── README.md                      # This file
└── Technical Documentation.docx   # Project documentation
```

---

## 🚀 Features

### Customer Features
- **Product Browsing** - View all products with responsive grid layout
- **Product Search** - Real-time search by product name and description
- **Category Filtering** - Filter products by category with dynamic counts
- **Product Details** - Detailed product view with images and specifications
- **Shopping Cart** - Add/remove items, update quantities with localStorage persistence
- **User Registration** - Create customer accounts with secure validation
- **Dark Mode** - Toggle between light and dark themes with system preference detection
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Contact Form** - Reach out to support with validation and feedback
- **About Page** - Company information and values

### Admin Features
- **Secure Authentication** - Local token-based authentication system
- **User Registration** - Admin account creation with role management
- **Product CRUD** - Create, read, update, delete products with image support
- **Category Management** - View categories with real-time product counts
- **Protected Routes** - Admin-only access to management features
- **Toast Notifications** - Real-time feedback for user actions

---

## 🗄️ Data Storage

### Local Storage Structure

**Categories Data**
```json
{
  "id": 1,
  "name": "Electronics",
  "slug": "electronics",
  "products_count": 15,
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

**Products Data**
```json
{
  "id": 1,
  "name": "Wireless Headphones",
  "slug": "wireless-headphones",
  "description": "High-quality wireless headphones with noise cancellation",
  "price": 199.99,
  "stock": 50,
  "image": "https://example.com/image.jpg",
  "category_id": 1,
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

**Users Data**
```json
{
  "id": 1,
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "hashed_password",
  "role": "admin",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

---

## 🔌 Service Layer

### API Services (Mock Implementation)

**Product Service**
| Method | Description | Returns |
|---------|-------------|---------|
| `getAll(params)` | List all products with search/filter | Promise<Product[]> |
| `getBySlug(slug)` | Get single product by slug | Promise<Product> |
| `create(data)` | Create new product (admin) | Promise<Product> |
| `update(id, data)` | Update existing product (admin) | Promise<Product> |
| `delete(id)` | Delete product (admin) | Promise<void> |

**Category Service**
| Method | Description | Returns |
|---------|-------------|---------|
| `getAll()` | List all categories | Promise<Category[]> |
| `getBySlug(slug)` | Get category by slug | Promise<Category> |

**Auth Service**
| Method | Description | Returns |
|---------|-------------|---------|
| `login(credentials)` | User authentication | Promise<{token, user}> |
| `logout()` | Clear authentication | Promise<void> |

### Local Data Management
- **localStorage Integration** - Persistent data storage
- **Auto-initialization** - Seeds default data on first load
- **Real-time Updates** - Category counts update automatically
- **Search & Filter** - Client-side product filtering

---

## 🛠️ Technology Stack

### Frontend (React 19)
- **Framework**: React 19 with modern hooks
- **Routing**: React Router v6 for SPA navigation
- **Styling**: Tailwind CSS v4 with dark mode support
- **State Management**: React Context API
  - AuthContext for user authentication
  - CartContext for shopping cart state
  - ThemeContext for dark mode
- **HTTP Client**: Axios for API communication
- **Icons**: Lucide React icon library
- **Build Tool**: Vite for fast development and building
- **Data Storage**: localStorage for persistence
- **Notifications**: Custom Toast component system
- **Form Validation**: Client-side validation with error handling

---

## 📦 Dependencies

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

### Dev Dependencies
```json
{
  "@eslint/js": "^9.39.1",
  "@types/react": "^19.2.5",
  "@types/react-dom": "^19.2.3",
  "@vitejs/plugin-react": "^5.1.1",
  "@tailwindcss/postcss": "^4.0.0",
  "@tailwindcss/vite": "^4.0.0",
  "eslint": "^9.39.1",
  "postcss": "^8.4.35"
}
```

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js 18+
- npm or yarn or bun

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

   **Application URL**: `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The production build will be in the `dist/` folder.

---

## 🔑 Default Credentials

The application initializes with default user data in localStorage:

**Admin Account:**
- Email: `admin@example.com`
- Password: `password`

You can also register new accounts through the registration page at `/register`.

---

## 🎯 Usage Guide

### Customer Flow
1. Browse products on homepage with responsive grid
2. Use search bar for real-time product search
3. Filter products by category
4. Click product for detailed view
5. Add to cart with quantity selection
6. View cart and manage items
7. Register account or use guest checkout
8. Contact support through contact form

### Admin Flow
1. Register new admin account or use default credentials
2. Login at `/admin/login`
3. Access dashboard at `/admin`
4. Manage products (Create, Read, Update, Delete)
5. View categories with product counts
6. Monitor user registrations
7. Logout when done

### Theme Customization
- Toggle dark/light mode using theme switcher
- Theme preference persists in localStorage
- Respects system color scheme preference

---

## 🔄 Development Commands

### Frontend
```bash
npm run dev                  # Start development server
npm run build                 # Build for production
npm run preview               # Preview production build
npm run lint                  # Run ESLint
```

### Available Scripts
- `npm run dev` - Starts Vite development server with hot reload
- `npm run build` - Creates optimized production build
- `npm run preview` - Serves the production build locally
- `npm run lint` - Runs ESLint for code quality checks

---

## 🎨 UI/UX Features

- **Responsive Design** - Mobile-first approach with breakpoint optimization
- **Dark Mode Support** - System preference detection with manual toggle
- **Modern UI** - Clean, minimalist design with Tailwind CSS
- **Loading States** - Skeleton loaders and spinners for better UX
- **Toast Notifications** - Non-intrusive feedback system
- **Error Handling** - User-friendly error messages with validation
- **Form Validation** - Real-time validation feedback with visual indicators
- **Hover Effects** - Interactive elements with smooth transitions
- **Accessibility** - Semantic HTML and ARIA labels
- **Smooth Animations** - CSS transitions for enhanced user experience

---

## 🔒 Security Features

- **Local Authentication** - Token-based authentication with localStorage
- **Input Validation** - Client-side form validation with error handling
- **XSS Protection** - React's built-in XSS protection
- **Password Security** - Secure password handling (in production, use proper hashing)
- **Route Protection** - Admin-only routes with authentication checks
- **Data Validation** - Type checking and validation for all user inputs

---

## 📊 Performance Features

- **Local Storage Caching** - Instant data access without API calls
- **Lazy Loading** - Components load only when needed
- **Code Splitting** - Vite automatic code splitting for faster loads
- **Minification** - Production build optimization
- **Image Optimization** - Responsive images with proper sizing
- **Search Optimization** - Client-side search with debouncing
- **State Management** - Efficient React Context usage

### Manual Testing Checklist
- **User Registration** - Test account creation with validation
- **User Login** - Test authentication flow
- **Product Management** - Test CRUD operations
- **Cart Functionality** - Test add/update/remove items
- **Search & Filter** - Test search and category filtering
- **Theme Toggle** - Test dark/light mode switching
- **Responsive Design** - Test on various screen sizes
- **Form Validation** - Test all form validations

---

## 🚀 Production Deployment

### Static Site Deployment
Since this is a frontend-only application, you can deploy it to any static hosting service:

1. **Build for Production**:
   ```bash
   npm run build
   ```

2. **Deploy to Static Hosting**:
   - **Netlify**: Drag and drop the `dist/` folder
   - **Vercel**: Connect your repository and auto-deploy
   - **GitHub Pages**: Use `gh-pages` branch
   - **AWS S3**: Upload `dist/` folder to S3 bucket
   - **Firebase Hosting**: Deploy with `firebase deploy`

3. **Configure SPA Routing**:
   - Ensure all routes redirect to `index.html`
   - Configure 404 handling for client-side routing

---

## 📞 Support

For issues and questions:
- Check the documentation
- Review the API routes
- Verify environment configuration
- Check browser console for errors

---

## 🔄 Version History

- **v2.0.0** - React Frontend with Local Storage (Current)
  - Complete frontend rewrite with React 19
  - Local storage data persistence
  - Dark mode support with ThemeContext
  - User registration and authentication system
  - Toast notification system
  - Contact Us and About Us pages
  - Enhanced UI with Tailwind CSS v4
  - Mobile-responsive design
  - Real-time search and filtering

---
