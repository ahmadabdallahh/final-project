import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Plus, Minus } from 'lucide-react';
import { productApi } from '../services/api';
import { useCart } from '../context/CartContext';
import { useToast } from '../components/Toast';

function ProductDetail() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();
    const { toasts, removeToast, success } = useToast();

    useEffect(() => {
        loadProduct();
    }, [slug]);

    const loadProduct = async () => {
        setLoading(true);
        try {
            const response = await productApi.getBySlug(slug);
            setProduct(response.data.data);
        } catch (error) {
            console.error('Error loading product:', error);
            navigate('/');
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = () => {
        addToCart(product, quantity);
        success('Added to cart!');
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64 sm:h-80">
                <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!product) return null;

    return (
        <div>
            {/* Back Button */}
            <Link
                to="/"
                className="inline-flex items-center text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 mb-4 sm:mb-6 transition-colors duration-300 text-sm sm:text-base"
            >
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Back to Products
            </Link>

            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-slate-700">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                    {/* Image */}
                    <div className="aspect-square lg:aspect-auto lg:h-96 bg-gray-100 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
                        {product.image ? (
                            <img
                                src={product.image}
                                alt={product.name}
                                className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                        ) : (
                            <div className="text-gray-400 dark:text-slate-500 text-6xl sm:text-8xl">📦</div>
                        )}
                    </div>

                    {/* Details */}
                    <div className="p-6 sm:p-8">
                        <div className="text-sm sm:text-base text-blue-600 dark:text-blue-400 font-medium mb-2">
                            {product.category?.name}
                        </div>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            {product.name}
                        </h1>
                        <p className="text-gray-600 dark:text-slate-300 text-base sm:text-lg mb-6 leading-relaxed">
                            {product.description || 'No description available'}
                        </p>

                        <div className="text-3xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-6">
                            ${Number(product.price).toFixed(2)}
                        </div>

                        <div className="mb-6">
                            <span className="text-gray-600 dark:text-slate-400 text-sm sm:text-base">
                                Stock: {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
                            </span>
                        </div>

                        {product.stock > 0 && (
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6">
                                <div className="flex items-center border border-gray-300 dark:border-slate-500 rounded-lg bg-white dark:bg-slate-900">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="p-2.5 sm:p-3 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-l-lg transition-colors text-gray-600 dark:text-slate-300"
                                    >
                                        <Minus className="h-4 w-4" />
                                    </button>
                                    <span className="px-4 sm:px-6 font-semibold text-base sm:text-lg text-gray-900 dark:text-white min-w-[3rem] text-center bg-gray-50 dark:bg-slate-800 rounded">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                        className="p-2.5 sm:p-3 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-r-lg transition-colors text-gray-600 dark:text-slate-300"
                                    >
                                        <Plus className="h-4 w-4" />
                                    </button>
                                </div>

                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 bg-blue-600 text-white px-4 sm:px-6 py-3 sm:py-3.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 hover:scale-[1.02] active:scale-[0.98] transform duration-200"
                                >
                                    <ShoppingCart className="h-5 w-5" />
                                    <span className="text-sm sm:text-base">Add to Cart</span>
                                </button>
                            </div>
                        )}

                        {product.stock === 0 && (
                            <button
                                disabled
                                className="w-full bg-gray-400 dark:bg-slate-600 text-white px-6 py-3.5 rounded-lg font-semibold cursor-not-allowed text-sm sm:text-base"
                            >
                                Out of Stock
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Toast Container */}
            <div className="fixed top-4 right-4 z-50 space-y-2">
                {toasts.map((toast) => (
                    <div key={toast.id} className="transform transition-all duration-300 ease-in-out">
                        <div
                            className={`flex items-center p-3 sm:p-4 rounded-lg border shadow-lg min-w-[280px] sm:min-w-[300px] max-w-md ${toast.type === 'success'
                                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200'
                                : toast.type === 'error'
                                    ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
                                    : toast.type === 'warning'
                                        ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200'
                                        : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200'
                                }`}
                        >
                            <div className="flex-shrink-0 mr-3">
                                {toast.type === 'success' && <div className="h-5 w-5 rounded-full bg-green-600 flex items-center justify-center text-white text-xs">✓</div>}
                                {toast.type === 'error' && <div className="h-5 w-5 rounded-full bg-red-600 flex items-center justify-center text-white text-xs">✕</div>}
                                {toast.type === 'warning' && <div className="h-5 w-5 rounded-full bg-yellow-600 flex items-center justify-center text-white text-xs">!</div>}
                                {toast.type === 'info' && <div className="h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs">i</div>}
                            </div>
                            <div className="flex-1 mr-2">
                                <p className="text-sm font-medium">{toast.message}</p>
                            </div>
                            <button
                                onClick={() => removeToast(toast.id)}
                                className="flex-shrink-0 p-1 rounded-md hover:bg-black hover:bg-opacity-10 transition-colors"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductDetail;
