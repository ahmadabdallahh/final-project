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
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!product) return null;

    return (
        <div>
            {/* Back Button */}
            <Link
                to="/"
                className="inline-flex items-center text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 transition-colors duration-300"
            >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Products
            </Link>

            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-slate-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Image */}
                    <div className="h-96 bg-gray-100 dark:bg-slate-700 flex items-center justify-center">
                        {product.image ? (
                            <img
                                src={product.image}
                                alt={product.name}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="text-gray-400 dark:text-slate-500 text-8xl">📦</div>
                        )}
                    </div>

                    {/* Details */}
                    <div className="p-6 md:p-8">
                        <div className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-2">
                            {product.category?.name}
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            {product.name}
                        </h1>
                        <p className="text-gray-600 dark:text-slate-300 text-lg mb-6">
                            {product.description || 'No description available'}
                        </p>

                        <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-6">
                            ${Number(product.price).toFixed(2)}
                        </div>

                        <div className="mb-6">
                            <span className="text-gray-600 dark:text-slate-400">
                                Stock: {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
                            </span>
                        </div>

                        {product.stock > 0 && (
                            <div className="flex items-center space-x-4 mb-6">
                                <div className="flex items-center border border-gray-300 rounded-lg">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="p-3 hover:bg-gray-100 rounded-l-lg"
                                    >
                                        <Minus className="h-4 w-4" />
                                    </button>
                                    <span className="px-4 font-semibold">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                        className="p-3 hover:bg-gray-100 rounded-r-lg"
                                    >
                                        <Plus className="h-4 w-4" />
                                    </button>
                                </div>

                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                                >
                                    <ShoppingCart className="h-5 w-5" />
                                    <span>Add to Cart</span>
                                </button>
                            </div>
                        )}

                        {product.stock === 0 && (
                            <button
                                disabled
                                className="w-full bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold cursor-not-allowed"
                            >
                                Out of Stock
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Toast Container */}
            {toasts.map((toast) => (
                <div key={toast.id} className="fixed top-4 right-4 z-50">
                    <div
                        className={`flex items-center p-4 rounded-lg border shadow-lg min-w-[300px] max-w-md ${toast.type === 'success'
                            ? 'bg-green-50 border-green-200 text-green-800'
                            : toast.type === 'error'
                                ? 'bg-red-50 border-red-200 text-red-800'
                                : toast.type === 'warning'
                                    ? 'bg-yellow-50 border-yellow-200 text-yellow-800'
                                    : 'bg-blue-50 border-blue-200 text-blue-800'
                            }`}
                    >
                        <div className="flex-shrink-0 mr-3">
                            {toast.type === 'success' && <div className="h-5 w-5 rounded-full bg-green-600 flex items-center justify-center">✓</div>}
                            {toast.type === 'error' && <div className="h-5 w-5 rounded-full bg-red-600 flex items-center justify-center">✕</div>}
                            {toast.type === 'warning' && <div className="h-5 w-5 rounded-full bg-yellow-600 flex items-center justify-center">!</div>}
                            {toast.type === 'info' && <div className="h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center">i</div>}
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
    );
}

export default ProductDetail;
