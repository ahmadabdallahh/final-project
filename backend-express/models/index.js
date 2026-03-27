import User from './User.js';
import Category from './Category.js';
import Product from './Product.js';

// Define associations
Category.hasMany(Product, {
  foreignKey: 'category_id',
  as: 'products',
});

Product.belongsTo(Category, {
  foreignKey: 'category_id',
  as: 'category',
});

export { User, Category, Product };
