import { body, param, validationResult } from 'express-validator';

// Handle validation errors
export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: 'Validation failed',
            errors: errors.array().map(err => ({
                field: err.path,
                message: err.msg,
            })),
        });
    }
    next();
};

// Product validation rules for CREATE
export const validateCreateProduct = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isString().withMessage('Name must be a string')
        .isLength({ max: 255 }).withMessage('Name must not exceed 255 characters'),
    body('slug')
        .trim()
        .notEmpty().withMessage('Slug is required')
        .isString().withMessage('Slug must be a string')
        .isLength({ max: 255 }).withMessage('Slug must not exceed 255 characters'),
    body('description')
        .optional()
        .isString().withMessage('Description must be a string'),
    body('price')
        .notEmpty().withMessage('Price is required')
        .isDecimal().withMessage('Price must be a number')
        .custom(value => {
            if (parseFloat(value) < 0) {
                throw new Error('Price must be at least 0');
            }
            return true;
        }),
    body('stock')
        .notEmpty().withMessage('Stock is required')
        .isInt().withMessage('Stock must be an integer')
        .custom(value => {
            if (parseInt(value) < 0) {
                throw new Error('Stock must be at least 0');
            }
            return true;
        }),
    body('image')
        .optional()
        .isString().withMessage('Image must be a string')
        .isLength({ max: 1000 }).withMessage('Image URL must not exceed 1000 characters'),
    body('category_id')
        .notEmpty().withMessage('Category ID is required')
        .isInt().withMessage('Category ID must be an integer'),
    handleValidationErrors,
];

// Product validation rules for UPDATE
export const validateUpdateProduct = [
    body('name')
        .optional()
        .trim()
        .isString().withMessage('Name must be a string')
        .isLength({ max: 255 }).withMessage('Name must not exceed 255 characters'),
    body('slug')
        .optional()
        .trim()
        .isString().withMessage('Slug must be a string')
        .isLength({ max: 255 }).withMessage('Slug must not exceed 255 characters'),
    body('description')
        .optional()
        .isString().withMessage('Description must be a string'),
    body('price')
        .optional()
        .isDecimal().withMessage('Price must be a number')
        .custom(value => {
            if (parseFloat(value) < 0) {
                throw new Error('Price must be at least 0');
            }
            return true;
        }),
    body('stock')
        .optional()
        .isInt().withMessage('Stock must be an integer')
        .custom(value => {
            if (parseInt(value) < 0) {
                throw new Error('Stock must be at least 0');
            }
            return true;
        }),
    body('image')
        .optional()
        .isString().withMessage('Image must be a string')
        .isLength({ max: 1000 }).withMessage('Image URL must not exceed 1000 characters'),
    body('category_id')
        .optional()
        .isInt().withMessage('Category ID must be an integer'),
    handleValidationErrors,
];

// Login validation
export const validateLogin = [
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Email must be a valid email address'),
    body('password')
        .notEmpty().withMessage('Password is required'),
    handleValidationErrors,
];
