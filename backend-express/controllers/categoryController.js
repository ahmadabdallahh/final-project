import { Category, Product } from '../models/index.js';
import { NotFoundError } from '../middleware/errorHandler.js';

class CategoryController {
    /**
     * List all categories with product count
     * GET /api/categories
     */
    async index(req, res, next) {
        try {
            const categories = await Category.findAll({
                attributes: {
                    include: [
                        [
                            Category.sequelize.fn('COUNT', Category.sequelize.col('products.id')),
                            'products_count',
                        ],
                    ],
                },
                include: [{
                    model: Product,
                    as: 'products',
                    attributes: [],
                }],
                group: ['Category.id'],
                raw: true,
            });

            // Format response
            const formattedCategories = categories.map(cat => ({
                id: cat.id,
                name: cat.name,
                slug: cat.slug,
                products_count: parseInt(cat.products_count) || 0,
                created_at: cat.created_at,
                updated_at: cat.updated_at,
            }));

            return res.json({
                data: formattedCategories,
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Get single category with its products
     * GET /api/categories/:slug
     */
    async show(req, res, next) {
        try {
            const { slug } = req.params;

            const category = await Category.findOne({
                where: { slug },
                include: [{
                    model: Product,
                    as: 'products',
                    include: [{
                        model: Category,
                        as: 'category',
                        attributes: ['id', 'name', 'slug'],
                    }],
                }],
            });

            if (!category) {
                throw new NotFoundError('Category not found');
            }

            return res.json({
                data: category,
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new CategoryController();
