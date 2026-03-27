import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';

// Protected Route Component
function ProtectedRoute({ children }) {
    const token = localStorage.getItem('admin_token');
    return token ? children : <Navigate to="/admin/login" />;
}

function App() {
    return (
        <ThemeProvider>
            <CartProvider>
                <BrowserRouter>
                    <Layout>
                        <Routes>
                            {/* Public Routes */}
                            <Route path="/" element={<ProductList />} />
                            <Route path="/product/:slug" element={<ProductDetail />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/about" element={<AboutUs />} />
                            <Route path="/contact" element={<ContactUs />} />

                            {/* Admin Routes */}
                            <Route path="/admin/login" element={<AdminLogin />} />
                            <Route
                                path="/admin"
                                element={
                                    <ProtectedRoute>
                                        <AdminDashboard />
                                    </ProtectedRoute>
                                }
                            />

                            {/* Fallback */}
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                    </Layout>
                </BrowserRouter>
            </CartProvider>
        </ThemeProvider>
    );
}

export default App;
