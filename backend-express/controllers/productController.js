import { Product, Category } from '../models/index.js';
import { NotFoundError } from '../middleware/errorHandler.js';
import slugify from 'slugify';

class ProductController {
    /**
     * List all products with optional filtering
     * GET /api/products
     */
    async index(req, res, next) {
        try {
            const { search, category, page = 1, limit = 12 } = req.query;

            // Build where conditions
            const where = {};

            // Include category
            const include = [{
                model: Category,
                as: 'category',
                attributes: ['id', 'name', 'slug'],
            }];

            // Search by name
            if (search) {
                where.name = { [Product.sequelize.Op.like]: `%${search}%` };
            }

            // Filter by category
            if (category) {
                const categoryRecord = await Category.findOne({ where: { slug: category } });
                if (categoryRecord) {
                    where.category_id = categoryRecord.id;
                }
            }

            // Calculate pagination
            const offset = (page - 1) * limit;

            // Fetch products with pagination
            const { count, rows: products } = await Product.findAndCountAll({
                where,
                include,
                limit: parseInt(limit),
                offset: parseInt(offset),
                order: [['created_at', 'DESC']],
            });

            // Calculate pagination meta
            const totalPages = Math.ceil(count / limit);

            return res.json({
                data: products,
                meta: {
                    current_page: parseInt(page),
                    last_page: totalPages,
                    per_page: parseInt(limit),
                    total: count,
                },
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Get single product by slug
     * GET /api/products/:slug
     */
    async show(req, res, next) {
        try {
            const { slug } = req.params;

            const product = await Product.findOne({
                where: { slug },
                include: [{
                    model: Category,
                    as: 'category',
                    attributes: ['id', 'name', 'slug'],
                }],
            });

            if (!product) {
                throw new NotFoundError('Product not found');
            }

            return res.json({
                data: product,
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Create new product
     * POST /api/products
     */
    async store(req, res, next) {
        try {
            const productData = req.body;

            // Check for unique slug
            const existingProduct = await Product.findOne({ where: { slug: productData.slug } });
            if (existingProduct) {
                return res.status(422).json({
                    message: 'Validation failed',
                    errors: [{ field: 'slug', message: 'The slug has already been taken.' }],
                });
            }

            // Verify category exists
            const category = await Category.findByPk(productData.category_id);
            if (!category) {
                return res.status(422).json({
                    message: 'Validation failed',
                    errors: [{ field: 'category_id', message: 'The selected category does not exist.' }],
                });
            }

            const product = await Product.create(productData);

            // Reload with category
            await product.reload({
                include: [{
                    model: Category,
                    as: 'category',
                    attributes: ['id', 'name', 'slug'],
                }],
            });

            return res.status(201).json({
                message: 'Product created successfully',
                data: product,
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Update existing product
     * PUT /api/products/:id
     */
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const productData = req.body;

            const product = await Product.findByPk(id);
            if (!product) {
                throw new NotFoundError('Product not found');
            }

            // Check for unique slug if changed
            if (productData.slug && productData.slug !== product.slug) {
                const existingProduct = await Product.findOne({
                    where: { slug: productData.slug },
                });
                if (existingProduct && existingProduct.id !== parseInt(id)) {
                    return res.status(422).json({
                        message: 'Validation failed',
                        errors: [{ field: 'slug', message: 'The slug has already been taken.' }],
                    });
                }
            }

            // Verify category exists if provided
            if (productData.category_id) {
                const category = await Category.findByPk(productData.category_id);
                if (!category) {
                    return res.status(422).json({
                        message: 'Validation failed',
                        errors: [{ field: 'category_id', message: 'The selected category does not exist.' }],
                    });
                }
            }

            await product.update(productData);

            // Reload with category
            await product.reload({
                include: [{
                    model: Category,
                    as: 'category',
                    attributes: ['id', 'name', 'slug'],
                }],
            });

            return res.json({
                message: 'Product updated successfully',
                data: product,
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Delete product
     * DELETE /api/products/:id
     */
    async destroy(req, res, next) {
        try {
            const { id } = req.params;

            const product = await Product.findByPk(id);
            if (!product) {
                throw new NotFoundError('Product not found');
            }

            await product.destroy();

            return res.json({
                message: 'Product deleted successfully',
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new ProductController();
