import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart } from 'lucide-react';
import { productApi, categoryApi } from '../services/api';
import { useCart } from '../context/CartContext';

function ProductCard({ product }) {
    const { addToCart } = useCart();

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-slate-700 group">
            <Link to={`/product/${product.slug}`} className="block">
                <div className="aspect-square bg-gray-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
                    {product.image ? (
                        <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    ) : (
                        <div className="text-gray-400 dark:text-slate-500 text-4xl sm:text-5xl">📦</div>
                    )}
                </div>
            </Link>
            <div className="p-4 sm:p-5">
                <Link to={`/product/${product.slug}`} className="block">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2 mb-2">
                        {product.name}
                    </h3>
                </Link>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 mb-3">{product.category?.name}</p>
                <p className="text-gray-600 dark:text-slate-300 text-xs sm:text-sm line-clamp-2 mb-4 min-h-[2.5rem]">
                    {product.description || 'No description available'}
                </p>
                <div className="flex justify-between items-center gap-2">
                    <span className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
                        ${Number(product.price).toFixed(2)}
                    </span>
                    <button
                        onClick={() => addToCart(product)}
                        disabled={product.stock === 0}
                        className="bg-blue-600 text-white p-2.5 sm:p-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transform duration-200"
                    >
                        <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                </div>
                {product.stock === 0 && (
                    <p className="text-red-500 dark:text-rose-400 text-xs mt-2 font-medium">Out of stock</p>
                )}
            </div>
        </div>
    );
}

function ProductList() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [pagination, setPagination] = useState({});

    useEffect(() => {
        loadCategories();
    }, []);

    useEffect(() => {
        loadProducts();
    }, [search, selectedCategory]);

    const loadCategories = async () => {
        try {
            const response = await categoryApi.getAll();
            setCategories(response.data.data);
        } catch (error) {
            console.error('Error loading categories:', error);
        }
    };

    const loadProducts = async () => {
        setLoading(true);
        try {
            const params = {};
            if (search) params.search = search;
            if (selectedCategory) params.category = selectedCategory;

            const response = await productApi.getAll(params);
            setProducts(response.data.data);
            setPagination(response.data.meta);
        } catch (error) {
            console.error('Error loading products:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">Our Products</h1>

                {/* Filters */}
                <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">
                    {/* Search */}
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 dark:text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-slate-400 transition-colors duration-300 text-sm sm:text-base"
                        />
                    </div>

                    {/* Category Filter */}
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full lg:w-auto px-4 py-2.5 sm:py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-slate-800 text-gray-900 dark:text-white transition-colors duration-300 text-sm sm:text-base"
                    >
                        <option value="">All Categories</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.slug}>
                                {category.name} ({category.products_count})
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Products Grid */}
            {loading ? (
                <div className="flex justify-center items-center h-64 sm:h-80">
                    <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-blue-600"></div>
                </div>
            ) : products.length > 0 ? (
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 sm:py-16">
                    <div className="text-4xl sm:text-5xl mb-4">🔍</div>
                    <p className="text-gray-500 dark:text-slate-400 text-base sm:text-lg font-medium">No products found</p>
                    <p className="text-gray-400 dark:text-slate-500 text-sm sm:text-base mt-2">Try adjusting your search or filter criteria</p>
                </div>
            )}

            {/* Pagination Info */}
            {!loading && pagination.total > 0 && (
                <div className="mt-8 sm:mt-10 text-center text-gray-600 dark:text-slate-400 text-sm sm:text-base">
                    Showing {products.length} of {pagination.total} products
                </div>
            )}
        </div>
    );
}

export default ProductList;
