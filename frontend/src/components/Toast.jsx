import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

export const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const getToastStyles = () => {
        switch (type) {
            case 'success':
                return 'bg-green-50 dark:bg-emerald-900/30 border-green-200 dark:border-emerald-700 text-green-800 dark:text-emerald-300';
            case 'error':
                return 'bg-red-50 dark:bg-rose-900/30 border-red-200 dark:border-rose-700 text-red-800 dark:text-rose-300';
            case 'warning':
                return 'bg-yellow-50 dark:bg-amber-900/30 border-yellow-200 dark:border-amber-700 text-yellow-800 dark:text-amber-300';
            case 'info':
                return 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700 text-blue-800 dark:text-blue-300';
            default:
                return 'bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-800 dark:text-slate-300';
        }
    };

    const getIcon = () => {
        switch (type) {
            case 'success':
                return <CheckCircle className="h-5 w-5 text-green-600 dark:text-emerald-400" />;
            case 'error':
                return <XCircle className="h-5 w-5 text-red-600 dark:text-rose-400" />;
            case 'warning':
                return <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-amber-400" />;
            case 'info':
                return <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
            default:
                return <AlertCircle className="h-5 w-5 text-gray-600 dark:text-slate-400" />;
        }
    };

    return (
        <div className="fixed top-4 right-4 z-50 animate-pulse">
            <div className={`flex items-center p-4 rounded-lg border shadow-lg ${getToastStyles()} min-w-[300px] max-w-md`}>
                <div className="flex-shrink-0 mr-3">
                    {getIcon()}
                </div>
                <div className="flex-1 mr-2">
                    <p className="text-sm font-medium">{message}</p>
                </div>
                <button
                    onClick={onClose}
                    className="flex-shrink-0 p-1 rounded-md hover:bg-black hover:bg-opacity-10 transition-colors"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
};

export const useToast = () => {
    const [toasts, setToasts] = useState([]);

    const addToast = (message, type = 'success') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
    };

    const removeToast = (id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    const success = (message) => addToast(message, 'success');
    const error = (message) => addToast(message, 'error');
    const warning = (message) => addToast(message, 'warning');
    const info = (message) => addToast(message, 'info');

    return {
        toasts,
        addToast,
        removeToast,
        success,
        error,
        warning,
        info,
    };
};
