import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../components/Toast';

function Cart() {
    const { cart, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart } = useCart();
    const { toasts, removeToast, success, info } = useToast();

    if (cart.length === 0) {
        return (
            <div className="text-center py-12 sm:py-16">
                <ShoppingBag className="h-16 w-16 sm:h-24 sm:w-24 text-gray-300 dark:text-slate-600 mx-auto mb-4 sm:mb-6" />
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">Your cart is empty</h2>
                <p className="text-gray-500 dark:text-slate-400 text-sm sm:text-base mb-6 sm:mb-8 max-w-md mx-auto px-4">
                    Looks like you haven't added anything to your cart yet.
                </p>
                <Link
                    to="/"
                    className="inline-flex items-center bg-blue-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors hover:scale-[1.02] active:scale-[0.98] transform duration-200"
                >
                    <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    <span className="text-sm sm:text-base">Continue Shopping</span>
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">Shopping Cart ({totalItems})</h1>

            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-slate-700">
                {/* Cart Items */}
                <div className="divide-y divide-gray-200 dark:divide-slate-700">
                    {cart.map((item) => (
                        <div key={item.id} className="p-4 sm:p-6">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                                {/* Image */}
                                <div className="h-20 w-20 sm:h-24 sm:w-24 bg-gray-100 dark:bg-slate-700 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
                                    {item.image ? (
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="h-full w-full object-cover rounded-lg"
                                        />
                                    ) : (
                                        <div className="text-2xl sm:text-3xl">📦</div>
                                    )}
                                </div>

                                {/* Details */}
                                <div className="flex-1 min-w-0">
                                    <Link
                                        to={`/product/${item.slug}`}
                                        className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2"
                                    >
                                        {item.name}
                                    </Link>
                                    <p className="text-gray-500 dark:text-slate-400 text-sm sm:text-base mt-1">${Number(item.price).toFixed(2)} each</p>
                                </div>

                                {/* Quantity Controls */}
                                <div className="flex items-center border border-gray-300 dark:border-slate-600 rounded-lg">
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="p-2 sm:p-2.5 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-l-lg transition-colors"
                                    >
                                        <Minus className="h-3 w-3 sm:h-4 sm:w-4 text-gray-700 dark:text-slate-300" />
                                    </button>
                                    <span className="px-3 sm:px-4 font-semibold text-gray-900 dark:text-white text-sm sm:text-base min-w-[2rem] text-center">
                                        {item.quantity}
                                    </span>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="p-2 sm:p-2.5 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-r-lg transition-colors"
                                    >
                                        <Plus className="h-3 w-3 sm:h-4 sm:w-4 text-gray-700 dark:text-slate-300" />
                                    </button>
                                </div>

                                {/* Price */}
                                <div className="text-right min-w-[80px] sm:min-w-[100px]">
                                    <p className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </p>
                                </div>

                                {/* Remove */}
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="p-2 text-red-500 hover:bg-red-50 dark:text-rose-400 dark:hover:bg-rose-900/30 rounded-lg transition-colors flex-shrink-0"
                                >
                                    <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary */}
                <div className="bg-gray-50 dark:bg-slate-700/50 p-4 sm:p-6 border-t border-gray-200 dark:border-slate-700">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-base sm:text-lg font-semibold text-gray-700 dark:text-slate-300">Total:</span>
                        <span className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
                            ${totalPrice.toFixed(2)}
                        </span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={clearCart}
                            className="px-4 sm:px-6 py-2.5 sm:py-3 border border-red-300 dark:border-rose-700 text-red-600 dark:text-rose-400 rounded-lg font-semibold hover:bg-red-50 dark:hover:bg-rose-900/30 transition-colors text-sm sm:text-base"
                        >
                            Clear Cart
                        </button>
                        <Link
                            to="/"
                            className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 rounded-lg font-semibold text-center hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors text-sm sm:text-base"
                        >
                            Continue Shopping
                        </Link>
                        <button
                            onClick={() => info('Checkout coming soon!')}
                            className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm sm:text-base hover:scale-[1.02] active:scale-[0.98] transform duration-200"
                        >
                            Checkout
                        </button>
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

export default Cart;
