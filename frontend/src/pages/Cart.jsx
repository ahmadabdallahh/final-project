import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../components/Toast';

function Cart() {
    const { cart, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart } = useCart();
    const { toasts, removeToast, success, info } = useToast();

    if (cart.length === 0) {
        return (
            <div className="text-center py-16">
                <ShoppingBag className="h-24 w-24 text-gray-300 dark:text-slate-600 mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Your cart is empty</h2>
                <p className="text-gray-500 dark:text-slate-400 mb-8">
                    Looks like you haven't added anything to your cart yet.
                </p>
                <Link
                    to="/"
                    className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Shopping Cart ({totalItems})</h1>

            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-slate-700">
                {/* Cart Items */}
                <div className="divide-y divide-gray-200 dark:divide-slate-700">
                    {cart.map((item) => (
                        <div key={item.id} className="p-6 flex items-center space-x-4">
                            {/* Image */}
                            <div className="h-24 w-24 bg-gray-100 dark:bg-slate-700 rounded-lg flex-shrink-0 flex items-center justify-center">
                                {item.image ? (
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="h-full w-full object-cover rounded-lg"
                                    />
                                ) : (
                                    <div className="text-3xl">📦</div>
                                )}
                            </div>

                            {/* Details */}
                            <div className="flex-1">
                                <Link
                                    to={`/product/${item.slug}`}
                                    className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                >
                                    {item.name}
                                </Link>
                                <p className="text-gray-500 dark:text-slate-400">${Number(item.price).toFixed(2)} each</p>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center border border-gray-300 dark:border-slate-600 rounded-lg">
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-l-lg transition-colors"
                                >
                                    <Minus className="h-4 w-4 text-gray-700 dark:text-slate-300" />
                                </button>
                                <span className="px-4 font-semibold text-gray-900 dark:text-white">{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-r-lg transition-colors"
                                >
                                    <Plus className="h-4 w-4 text-gray-700 dark:text-slate-300" />
                                </button>
                            </div>

                            {/* Price */}
                            <div className="text-right min-w-[100px]">
                                <p className="text-lg font-bold text-gray-900 dark:text-white">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </p>
                            </div>

                            {/* Remove */}
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="p-2 text-red-500 hover:bg-red-50 dark:text-rose-400 dark:hover:bg-rose-900/30 rounded-lg transition-colors"
                            >
                                <Trash2 className="h-5 w-5" />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Summary */}
                <div className="bg-gray-50 dark:bg-slate-700/50 p-6 border-t border-gray-200 dark:border-slate-700">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-semibold text-gray-700 dark:text-slate-300">Total:</span>
                        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            ${totalPrice.toFixed(2)}
                        </span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={clearCart}
                            className="px-6 py-3 border border-red-300 dark:border-rose-700 text-red-600 dark:text-rose-400 rounded-lg font-semibold hover:bg-red-50 dark:hover:bg-rose-900/30 transition-colors"
                        >
                            Clear Cart
                        </button>
                        <Link
                            to="/"
                            className="flex-1 px-6 py-3 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 rounded-lg font-semibold text-center hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                        >
                            Continue Shopping
                        </Link>
                        <button
                            onClick={() => info('Checkout coming soon!')}
                            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                        >
                            Checkout
                        </button>
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

export default Cart;
