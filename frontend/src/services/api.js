import { localData } from './localData';

const mockResponse = (data) => ({
    data: {
        data: data,
        meta: { total: Array.isArray(data) ? data.length : 1 }
    }
});

const mockError = (message) => {
    throw { response: { data: { message } } };
};

export const productApi = {
    getAll: (params = {}) => {
        const products = localData.searchProducts(params.search || '', params.category || '');
        return Promise.resolve(mockResponse(products));
    },
    getBySlug: (slug) => {
        const product = localData.getProductBySlug(slug);
        if (!product) return Promise.reject(mockError('Product not found'));
        return Promise.resolve(mockResponse(product));
    },
    create: (data) => {
        const product = localData.addProduct(data);
        return Promise.resolve(mockResponse(product));
    },
    update: (id, data) => {
        const product = localData.updateProduct(id, data);
        if (!product) return Promise.reject(mockError('Product not found'));
        return Promise.resolve(mockResponse(product));
    },
    delete: (id) => {
        localData.deleteProduct(id);
        return Promise.resolve(mockResponse({ success: true }));
    },
};

export const categoryApi = {
    getAll: () => {
        const categories = localData.getCategories();
        return Promise.resolve(mockResponse(categories));
    },
    getBySlug: (slug) => {
        const category = localData.getCategoryBySlug(slug);
        if (!category) return Promise.reject(mockError('Category not found'));
        return Promise.resolve(mockResponse(category));
    },
};

export const authApi = {
    login: (credentials) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                const user = users.find(u => u.email === credentials.email && u.password === credentials.password);

                if (user) {
                    const token = `local_token_${Date.now()}`;
                    const userData = {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role
                    };
                    resolve({
                        data: {
                            token,
                            user: userData
                        }
                    });
                } else {
                    reject({ response: { data: { message: 'Invalid credentials' } } });
                }
            }, 300);
        });
    },
    logout: () => Promise.resolve({ data: { success: true } }),
};

export default {
    productApi,
    categoryApi,
    authApi
};
