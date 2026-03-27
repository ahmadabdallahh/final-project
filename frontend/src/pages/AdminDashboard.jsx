import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, LogOut, Package, Grid } from 'lucide-react';
import { productApi, categoryApi } from '../services/api';
import { useToast } from '../components/Toast';

function AdminDashboard() {
    const navigate = useNavigate();
    const { toasts, removeToast, success, error, warning } = useToast();
    const [activeTab, setActiveTab] = useState('products');
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // Form states
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState({ show: false, id: null, name: '' });
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        price: '',
        stock: '',
        category_id: '',
        image: '',
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const [productsRes, categoriesRes] = await Promise.all([
                productApi.getAll(),
                categoryApi.getAll(),
            ]);
            setProducts(productsRes.data.data);
            setCategories(categoriesRes.data.data);
        } catch (error) {
            if (error.response?.status === 401) {
                handleLogout();
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        navigate('/admin/login');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingProduct) {
                await productApi.update(editingProduct.id, formData);
                success('Product updated successfully!');
            } else {
                await productApi.create(formData);
                success('Product created successfully!');
            }
            setShowForm(false);
            setEditingProduct(null);
            setFormData({
                name: '',
                slug: '',
                description: '',
                price: '',
                stock: '',
                category_id: '',
                image: '',
            });
            loadData();
        } catch (err) {
            error(err.response?.data?.message || 'Operation failed');
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            slug: product.slug,
            description: product.description,
            price: product.price,
            stock: product.stock,
            category_id: product.category_id,
            image: product.image || '',
        });
        setShowForm(true);
    };

    const handleDelete = (id, name) => {
        setDeleteConfirm({ show: true, id, name });
    };

    const confirmDelete = async () => {
        try {
            await productApi.delete(deleteConfirm.id);
            success('Product deleted successfully!');
            loadData();
        } catch (err) {
            error('Failed to delete product');
        } finally {
            setDeleteConfirm({ show: false, id: null, name: '' });
        }
    };

    const generateSlug = (name) => {
        return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    };

    return (
        <div className="max-w-6xl mx-auto min-h-screen p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
                <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-red-600 dark:text-rose-400 hover:text-red-700 dark:hover:text-rose-300 font-medium transition-colors"
                >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                </button>
            </div>

            {/* Tabs */}
            <div className="flex space-x-4 mb-6">
                <button
                    onClick={() => setActiveTab('products')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'products'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-slate-300 hover:bg-gray-300 dark:hover:bg-slate-600'
                        }`}
                >
                    <Package className="h-5 w-5" />
                    <span>Products</span>
                </button>
                <button
                    onClick={() => setActiveTab('categories')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'categories'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-slate-300 hover:bg-gray-300 dark:hover:bg-slate-600'
                        }`}
                >
                    <Grid className="h-5 w-5" />
                    <span>Categories</span>
                </button>
            </div>

            {/* Products Tab */}
            {activeTab === 'products' && (
                <div>
                    {/* Add Button */}
                    <div className="mb-6">
                        <button
                            onClick={() => {
                                setEditingProduct(null);
                                setFormData({ name: '', slug: '', description: '', price: '', stock: '', category_id: '' });
                                setShowForm(true);
                            }}
                            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                        >
                            <Plus className="h-5 w-5" />
                            <span>Add Product</span>
                        </button>
                    </div>

                    {/* Form Modal */}
                    {showForm && (
                        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
                            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-slate-700">
                                <h2 className="text-xl font-bold mb-4 dark:text-white">
                                    {editingProduct ? 'Edit Product' : 'Add Product'}
                                </h2>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Name</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => {
                                                const name = e.target.value;
                                                setFormData({
                                                    ...formData,
                                                    name,
                                                    slug: editingProduct ? formData.slug : generateSlug(name),
                                                });
                                            }}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-slate-700 text-gray-900 dark:text-white transition-colors"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Slug</label>
                                        <input
                                            type="text"
                                            value={formData.slug}
                                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-slate-700 text-gray-900 dark:text-white transition-colors"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Description</label>
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            rows="3"
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-slate-700 text-gray-900 dark:text-white transition-colors"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Price</label>
                                            <input
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                value={formData.price}
                                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-slate-700 text-gray-900 dark:text-white transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Stock</label>
                                            <input
                                                type="number"
                                                min="0"
                                                value={formData.stock}
                                                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-slate-700 text-gray-900 dark:text-white transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Category</label>
                                        <select
                                            value={formData.category_id}
                                            onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-slate-700 text-gray-900 dark:text-white transition-colors"
                                        >
                                            <option value="">Select Category</option>
                                            {categories.map((cat) => (
                                                <option key={cat.id} value={cat.id}>
                                                    {cat.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Image URL</label>
                                        <input
                                            type="url"
                                            value={formData.image}
                                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                            placeholder="https://example.com/image.jpg"
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-slate-400 transition-colors"
                                        />
                                        <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Enter a valid image URL (optional)</p>
                                    </div>

                                    <div className="flex space-x-3 pt-4">
                                        <button
                                            type="button"
                                            onClick={() => setShowForm(false)}
                                            className="flex-1 px-4 py-2 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            {editingProduct ? 'Update' : 'Create'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Products Table */}
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-slate-700">
                            <table className="w-full">
                                <thead className="bg-gray-50 dark:bg-slate-700/50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">Category</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">Price</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">Stock</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                                    {products.map((product) => (
                                        <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-white">{product.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-slate-400">{product.category?.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">${Number(product.price).toFixed(2)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 rounded-full text-xs ${product.stock > 0 ? 'bg-green-100 dark:bg-emerald-900/30 text-green-800 dark:text-emerald-400' : 'bg-red-100 dark:bg-rose-900/30 text-red-800 dark:text-rose-400'}`}>
                                                    {product.stock}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <button
                                                    onClick={() => handleEdit(product)}
                                                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mr-3 transition-colors"
                                                >
                                                    <Edit className="h-5 w-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product.id, product.name)}
                                                    className="text-red-600 dark:text-rose-400 hover:text-red-800 dark:hover:text-rose-300 transition-colors"
                                                >
                                                    <Trash2 className="h-5 w-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}

            {/* Categories Tab */}
            {activeTab === 'categories' && (
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-slate-700">
                    <h2 className="text-xl font-bold mb-4 dark:text-white">Categories</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {categories.map((category) => (
                            <div key={category.id} className="border border-gray-200 dark:border-slate-600 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors">
                                <h3 className="font-semibold text-gray-900 dark:text-white">{category.name}</h3>
                                <p className="text-sm text-gray-500 dark:text-slate-400">Slug: {category.slug}</p>
                                <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">{category.products_count} products</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteConfirm.show && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 w-full max-w-md border border-gray-200 dark:border-slate-700">
                        <div className="flex items-center mb-4">
                            <div className="flex-shrink-0">
                                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-rose-900/30">
                                    <Trash2 className="h-6 w-6 text-red-600 dark:text-rose-400" />
                                </div>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Delete Product</h3>
                                <p className="text-sm text-gray-500 dark:text-slate-400">This action cannot be undone.</p>
                            </div>
                        </div>
                        <p className="text-gray-700 dark:text-slate-300 mb-6">
                            Are you sure you want to delete <strong className="dark:text-white">"{deleteConfirm.name}"</strong>?
                        </p>
                        <div className="flex space-x-3">
                            <button
                                onClick={() => setDeleteConfirm({ show: false, id: null, name: '' })}
                                className="flex-1 px-4 py-2 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

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

export default AdminDashboard;
