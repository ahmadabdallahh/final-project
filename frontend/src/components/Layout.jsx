import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Store, LogOut, Sun, Moon, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useState } from 'react';

function Navbar() {
    const { totalItems } = useCart();
    const { darkMode, toggleDarkMode } = useTheme();
    const navigate = useNavigate();
    const isAdmin = !!localStorage.getItem('admin_token');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
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

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center space-x-3">
                        {/* Mobile Cart Icon */}
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

                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                        >
                            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-gray-200 dark:border-slate-700 py-4">
                        <div className="flex flex-col space-y-3">
                            <Link
                                to="/"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"
                            >
                                Products
                            </Link>

                            <Link
                                to="/about"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"
                            >
                                About
                            </Link>

                            <Link
                                to="/contact"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"
                            >
                                Contact
                            </Link>

                            {/* Mobile Theme Toggle */}
                            <button
                                onClick={() => {
                                    toggleDarkMode();
                                    setIsMobileMenuOpen(false);
                                }}
                                className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 text-left"
                            >
                                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                                <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                            </button>

                            {isAdmin ? (
                                <div className="flex flex-col space-y-3 pt-3 border-t border-gray-200 dark:border-slate-700">
                                    <Link
                                        to="/admin"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium text-center"
                                    >
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="flex items-center justify-center space-x-2 text-gray-600 hover:text-red-600 transition-colors py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"
                                    >
                                        <LogOut className="h-5 w-5" />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    to="/admin/login"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"
                                >
                                    <User className="h-6 w-6" />
                                    <span>Admin Login</span>
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

function Footer() {
    return (
        <footer className="bg-slate-900 text-white mt-12 dark:bg-slate-950 transition-colors duration-300 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Brand Section */}
                    <div className="flex flex-col space-y-4">
                        <div className="flex items-center space-x-2">
                            <Store className="h-6 w-6 text-blue-400" />
                            <span className="text-lg font-bold">ShopApp</span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                            Your trusted e-commerce platform for quality products and exceptional service.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col space-y-4">
                        <h3 className="text-base font-semibold text-white mb-2">Quick Links</h3>
                        <div className="flex flex-col space-y-2">
                            <Link
                                to="/about"
                                className="text-slate-400 hover:text-white text-sm transition-colors duration-200 hover:translate-x-1 transform"
                            >
                                About Us
                            </Link>
                            <Link
                                to="/contact"
                                className="text-slate-400 hover:text-white text-sm transition-colors duration-200 hover:translate-x-1 transform"
                            >
                                Contact
                            </Link>
                            <Link
                                to="/"
                                className="text-slate-400 hover:text-white text-sm transition-colors duration-200 hover:translate-x-1 transform"
                            >
                                Products
                            </Link>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-col space-y-4">
                        <h3 className="text-base font-semibold text-white mb-2">Get in Touch</h3>
                        <div className="flex flex-col space-y-2">
                            <p className="text-slate-400 text-sm">
                                Email: support@shopapp.com
                            </p>
                            <p className="text-slate-400 text-sm">
                                Phone: 1-800-SHOPAPP
                            </p>
                            <p className="text-slate-400 text-sm">
                                Hours: Mon-Fri 9AM-6PM
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-slate-800 mt-8 pt-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                        <p className="text-slate-400 text-sm text-center sm:text-left">
                            © {new Date().getFullYear()} ShopApp. All rights reserved.
                        </p>
                        <div className="flex items-center space-x-6">
                            <Link to="/privacy" className="text-slate-400 hover:text-white text-sm transition-colors duration-200">
                                Privacy Policy
                            </Link>
                            <Link to="/terms" className="text-slate-400 hover:text-white text-sm transition-colors duration-200">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export function Layout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
            <Navbar />
            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full">
                <div className="animate-fade-in">
                    {children}
                </div>
            </main>
            <Footer />
        </div>
    );
}
