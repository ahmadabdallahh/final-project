import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Store, LogOut, Sun, Moon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

function Navbar() {
    const { totalItems } = useCart();
    const { darkMode, toggleDarkMode } = useTheme();
    const navigate = useNavigate();
    const isAdmin = !!localStorage.getItem('admin_token');

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        navigate('/');
        window.location.reload();
    };

    return (
        <nav className="bg-white dark:bg-slate-800 shadow-md sticky top-0 z-50 transition-colors duration-300 border-b border-gray-200 dark:border-slate-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <Store className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                        <span className="text-xl font-bold text-gray-900 dark:text-white">ShopApp</span>
                    </Link>

                    {/* Navigation */}
                    <div className="flex items-center space-x-6">
                        <Link
                            to="/"
                            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
                        >
                            Products
                        </Link>

                        <Link
                            to="/about"
                            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
                        >
                            About
                        </Link>

                        <Link
                            to="/contact"
                            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
                        >
                            Contact
                        </Link>

                        <Link
                            to="/cart"
                            className="relative text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                            <ShoppingCart className="h-6 w-6" />
                            {totalItems > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {totalItems}
                                </span>
                            )}
                        </Link>

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-lg border border-gray-300 dark:border-slate-600 text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                        >
                            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </button>

                        {isAdmin ? (
                            <div className="flex items-center space-x-4">
                                <Link
                                    to="/admin"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-gray-600 hover:text-red-600 transition-colors"
                                >
                                    <LogOut className="h-5 w-5" />
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/admin/login"
                                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                                <User className="h-6 w-6" />
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

function Footer() {
    return (
        <footer className="bg-slate-900 text-white mt-12 dark:bg-slate-950 transition-colors duration-300 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center space-x-2 mb-4 md:mb-0">
                        <Store className="h-6 w-6 text-blue-400" />
                        <span className="text-lg font-bold">ShopApp</span>
                    </div>
                    <div className="flex items-center space-x-6 mb-4 md:mb-0">
                        <Link to="/about" className="text-slate-400 hover:text-white text-sm transition-colors">
                            About Us
                        </Link>
                        <Link to="/contact" className="text-slate-400 hover:text-white text-sm transition-colors">
                            Contact
                        </Link>
                    </div>
                    <p className="text-slate-400 text-sm">
                        © {new Date().getFullYear()} ShopApp. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export function Layout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
            <Navbar />
            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
                {children}
            </main>
            <Footer />
        </div>
    );
}
