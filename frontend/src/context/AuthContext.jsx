import { createContext, useContext, useState, useEffect } from 'react';
import initialUsers from '../data/initialUsers.json';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        initializeUsers();
        checkAuth();
    }, []);

    const initializeUsers = () => {
        const existingUsers = localStorage.getItem('users');
        if (!existingUsers) {
            localStorage.setItem('users', JSON.stringify(initialUsers));
        }
    };

    const checkAuth = () => {
        const token = localStorage.getItem('admin_token');
        const savedUser = localStorage.getItem('admin_user');
        if (token && savedUser) {
            setUser(JSON.parse(savedUser));
            setIsAuthenticated(true);
        }
        setLoading(false);
    };

    const login = (email, password) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const foundUser = users.find(u => u.email === email && u.password === password);

        if (foundUser) {
            const token = `local_token_${Date.now()}`;
            const userData = {
                id: foundUser.id,
                name: foundUser.name,
                email: foundUser.email,
                role: foundUser.role
            };

            localStorage.setItem('admin_token', token);
            localStorage.setItem('admin_user', JSON.stringify(userData));
            setUser(userData);
            setIsAuthenticated(true);
            return { success: true, user: userData };
        }

        return { success: false, error: 'Invalid email or password' };
    };

    const register = (name, email, password) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');

        if (users.some(u => u.email === email)) {
            return { success: false, error: 'Email already registered' };
        }

        const newUser = {
            id: Date.now(),
            name,
            email,
            password,
            role: 'user',
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        return { success: true, message: 'Registration successful! Please login.' };
    };

    const logout = () => {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                loading,
                login,
                register,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
