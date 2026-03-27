import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart } from 'lucide-react';
import { productApi, categoryApi } from '../services/api';
import { useCart } from '../context/CartContext';

function ProductCard({ product }) {
    const { addToCart } = useCart();

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-slate-700">
            <Link to={`/product/${product.slug}`}>
                <div className="h-48 bg-gray-200 dark:bg-slate-700 flex items-center justify-center">
                    {product.image ? (
                        <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="text-gray-400 dark:text-slate-500 text-4xl">📦</div>
                    )}
                </div>
            </Link>
            <div className="p-4">
                <Link to={`/product/${product.slug}`}>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        {product.name}
                    </h3>
                </Link>
                <p className="text-sm text-gray-500 dark:text-slate-400 mb-2">{product.category?.name}</p>
                <p className="text-gray-600 dark:text-slate-300 text-sm line-clamp-2 mb-3">
                    {product.description || 'No description available'}
                </p>
                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                        ${Number(product.price).toFixed(2)}
                    </span>
                    <button
                        onClick={() => addToCart(product)}
                        disabled={product.stock === 0}
                        className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed"
                    >
                        <ShoppingCart className="h-5 w-5" />
                    </button>
                </div>
                {product.stock === 0 && (
                    <p className="text-red-500 dark:text-rose-400 text-xs mt-2">Out of stock</p>
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
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Products</h1>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-slate-400 transition-colors duration-300"
                        />
                    </div>

                    {/* Category Filter */}
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-slate-800 text-gray-900 dark:text-white transition-colors duration-300"
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
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            ) : products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No products found</p>
                </div>
            )}

            {/* Pagination Info */}
            {!loading && pagination.total > 0 && (
                <div className="mt-8 text-center text-gray-600">
                    Showing {products.length} of {pagination.total} products
                </div>
            )}
        </div>
    );
}

export default ProductList;
