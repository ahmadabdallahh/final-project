// Global error handler middleware
export const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);

    // Default error
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';

    // Sequelize validation errors
    if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
        statusCode = 422;
        message = 'Validation error';
        const errors = err.errors?.map(e => ({
            field: e.path,
            message: e.message,
        })) || [];
        return res.status(statusCode).json({
            message,
            errors,
        });
    }

    // Sequelize foreign key constraint error
    if (err.name === 'SequelizeForeignKeyConstraintError') {
        statusCode = 422;
        message = 'Invalid category ID';
    }

    // Sequelize database error
    if (err.name === 'SequelizeDatabaseError') {
        statusCode = 500;
        message = 'Database error';
    }

    // Not found error
    if (err.name === 'NotFoundError') {
        statusCode = 404;
        message = err.message || 'Resource not found';
    }

    res.status(statusCode).json({
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
};

// 404 Not Found handler
export const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        message: `Route ${req.originalUrl} not found`,
    });
};

// Custom error class
export class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
        this.statusCode = 404;
    }
}
