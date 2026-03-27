import sequelize from '../config/database.js';
import { User, Category, Product } from '../models/index.js';

const seedDatabase = async () => {
    try {
        console.log('🌱 Seeding database...');

        // Create Admin User
        const [admin, adminCreated] = await User.findOrCreate({
            where: { email: 'admin@example.com' },
            defaults: {
                name: 'Admin',
                email: 'admin@example.com',
                password: 'password',
                is_admin: true,
            },
        });

        if (adminCreated) {
            console.log('✅ Admin user created:');
            console.log('   Email: admin@example.com');
            console.log('   Password: password');
        } else {
            console.log('ℹ️ Admin user already exists');
        }

        // Create Categories
        const categoriesData = [
            { name: 'Electronics', slug: 'electronics' },
            { name: 'Clothing', slug: 'clothing' },
            { name: 'Books', slug: 'books' },
            { name: 'Home & Garden', slug: 'home-garden' },
        ];

        const categories = [];
        for (const catData of categoriesData) {
            const [category, created] = await Category.findOrCreate({
                where: { slug: catData.slug },
                defaults: catData,
            });
            categories.push(category);
            if (created) {
                console.log(`✅ Category created: ${catData.name}`);
            }
        }

        // Create Products
        const productsData = [
            {
                name: 'Smartphone',
                slug: 'smartphone',
                description: 'Latest smartphone with amazing features',
                price: 599.99,
                stock: 50,
                image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
                category_slug: 'electronics',
            },
            {
                name: 'Laptop',
                slug: 'laptop',
                description: 'Powerful laptop for work and gaming',
                price: 999.99,
                stock: 30,
                image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
                category_slug: 'electronics',
            },
            {
                name: 'T-Shirt',
                slug: 't-shirt',
                description: 'Comfortable cotton t-shirt',
                price: 19.99,
                stock: 100,
                image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop',
                category_slug: 'clothing',
            },
            {
                name: 'Jeans',
                slug: 'jeans',
                description: 'Classic blue jeans',
                price: 49.99,
                stock: 75,
                image: 'https://images.unsplash.com/photo-1714729382668-7bc3bb261662?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                category_slug: 'clothing',
            },
            {
                name: 'Programming Book',
                slug: 'programming-book',
                description: 'Learn programming from scratch',
                price: 29.99,
                stock: 40,
                image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=300&fit=crop',
                category_slug: 'books',
            },
            {
                name: 'Coffee Maker',
                slug: 'coffee-maker',
                description: 'Automatic coffee maker',
                price: 79.99,
                stock: 25,
                image: 'https://images.unsplash.com/photo-1560885521-4e61e9bc1631?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                category_slug: 'home-garden',
            },
        ];

        for (const prodData of productsData) {
            const category = categories.find(c => c.slug === prodData.category_slug);
            if (category) {
                const [product, created] = await Product.findOrCreate({
                    where: { slug: prodData.slug },
                    defaults: {
                        name: prodData.name,
                        slug: prodData.slug,
                        description: prodData.description,
                        price: prodData.price,
                        stock: prodData.stock,
                        image: prodData.image,
                        category_id: category.id,
                    },
                });

                // Force update image URL even if product exists
                if (!created) {
                    await product.update({
                        image: prodData.image,
                    });
                    console.log(`✅ Product updated: ${prodData.name} (new image URL)`);
                } else {
                    console.log(`✅ Product created: ${prodData.name}`);
                }
            }
        }

        console.log('🎉 Database seeding completed!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
};

seedDatabase();
