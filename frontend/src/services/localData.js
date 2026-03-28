import initialProducts from '../data/products.json';
import initialCategories from '../data/categories.json';

const PRODUCTS_KEY = 'products';
const CATEGORIES_KEY = 'categories';

const initializeData = () => {
    if (!localStorage.getItem(PRODUCTS_KEY)) {
        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(initialProducts));
    }
    if (!localStorage.getItem(CATEGORIES_KEY)) {
        localStorage.setItem(CATEGORIES_KEY, JSON.stringify(initialCategories));
    }
};

const getProducts = () => {
    initializeData();
    const products = JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]');
    const categories = JSON.parse(localStorage.getItem(CATEGORIES_KEY) || '[]');

    return products.map(product => ({
        ...product,
        category: categories.find(c => c.id === product.category_id) || null
    }));
};

const getProductBySlug = (slug) => {
    const products = getProducts();
    return products.find(p => p.slug === slug) || null;
};

const addProduct = (productData) => {
    const products = JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]');
    const newProduct = {
        id: Date.now(),
        ...productData,
        price: parseFloat(productData.price),
        stock: parseInt(productData.stock),
        category_id: parseInt(productData.category_id)
    };
    products.push(newProduct);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    updateCategoryCounts();
    return newProduct;
};

const updateProduct = (id, productData) => {
    const products = JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]');
    const index = products.findIndex(p => p.id === id);

    if (index === -1) return null;

    products[index] = {
        ...products[index],
        ...productData,
        price: parseFloat(productData.price),
        stock: parseInt(productData.stock),
        category_id: parseInt(productData.category_id),
        id: products[index].id
    };

    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    updateCategoryCounts();
    return products[index];
};

const deleteProduct = (id) => {
    const products = JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]');
    const filtered = products.filter(p => p.id !== id);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(filtered));
    updateCategoryCounts();
    return true;
};

const getCategories = () => {
    initializeData();
    return JSON.parse(localStorage.getItem(CATEGORIES_KEY) || '[]');
};

const getCategoryBySlug = (slug) => {
    const categories = getCategories();
    return categories.find(c => c.slug === slug) || null;
};

const updateCategoryCounts = () => {
    const products = JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]');
    const categories = JSON.parse(localStorage.getItem(CATEGORIES_KEY) || '[]');

    const updatedCategories = categories.map(cat => ({
        ...cat,
        products_count: products.filter(p => p.category_id === cat.id).length
    }));

    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(updatedCategories));
};

const searchProducts = (searchTerm, categorySlug = '') => {
    let products = getProducts();

    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        products = products.filter(p =>
            p.name.toLowerCase().includes(term) ||
            p.description.toLowerCase().includes(term)
        );
    }

    if (categorySlug) {
        const category = getCategoryBySlug(categorySlug);
        if (category) {
            products = products.filter(p => p.category_id === category.id);
        }
    }

    return products;
};

export const localData = {
    initializeData,
    getProducts,
    getProductBySlug,
    addProduct,
    updateProduct,
    deleteProduct,
    getCategories,
    getCategoryBySlug,
    searchProducts
};

export default localData;
