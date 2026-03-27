import sequelize from '../config/database.js';
import { User, Category, Product } from '../models/index.js';

const migrate = async () => {
  try {
    console.log('🔧 Running database migrations...');

    // Test connection
    await sequelize.authenticate();
    console.log('✅ Database connection established.');

    // Sync all models (create tables)
    await sequelize.sync({ force: true });
    console.log('✅ All tables created successfully.');

    console.log('🎉 Migration completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
};

migrate();
