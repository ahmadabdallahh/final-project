import express from 'express';
import authController from '../controllers/authController.js';
import productController from '../controllers/productController.js';
import categoryController from '../controllers/categoryController.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import { 
  validateLogin, 
  validateCreateProduct, 
  validateUpdateProduct 
} from '../middleware/validation.js';

const router = express.Router();

// Auth Routes
router.post('/login', validateLogin, authController.login);
router.post('/logout', authenticate, authController.logout);

// Public Routes - Products
router.get('/products', productController.index);
router.get('/products/:slug', productController.show);

// Public Routes - Categories
router.get('/categories', categoryController.index);
router.get('/categories/:slug', categoryController.show);

// Admin Routes - Products (Protected)
router.post('/products', authenticate, requireAdmin, validateCreateProduct, productController.store);
router.put('/products/:id', authenticate, requireAdmin, validateUpdateProduct, productController.update);
router.delete('/products/:id', authenticate, requireAdmin, productController.destroy);

export default router;
