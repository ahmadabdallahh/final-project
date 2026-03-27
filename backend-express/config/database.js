import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { URL } from 'url';

dotenv.config();

// Parse MYSQL_URL from Railway reference variable
function parseMySqlUrl(mysqlUrl) {
    if (!mysqlUrl) return null;

    try {
        const url = new URL(mysqlUrl);
        return {
            host: url.hostname,
            port: parseInt(url.port) || 3306,
            database: url.pathname.substring(1), // Remove leading slash
            username: url.username,
            password: url.password
        };
    } catch (error) {
        console.error('❌ Failed to parse MYSQL_URL:', error.message);
        return null;
    }
}

// Use Railway reference variable for MySQL connection
let dbConfig;

if (process.env.MYSQL_URL) {
    // Parse MYSQL_URL from Railway reference variable
    dbConfig = parseMySqlUrl(process.env.MYSQL_URL);
    if (!dbConfig) {
        throw new Error('Invalid MYSQL_URL format');
    }
    console.log('🔗 Using MYSQL_URL from Railway reference variable');
} else {
    // Fallback for local development
    dbConfig = {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        database: process.env.DB_NAME || 'ecommerce',
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || ''
    };
    console.log('🔧 Using local database configuration');
}

// Railway MySQL configuration
const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
        host: dbConfig.host,
        port: dbConfig.port,
        dialect: 'mysql',
        logging: process.env.NODE_ENV === 'development' ? console.log : false,
        dialectOptions: {
            // SSL configuration based on host
            ssl: dbConfig.host && (dbConfig.host.includes('railway') || dbConfig.host.includes('containers-')) ? {
                require: true,
                rejectUnauthorized: false
            } : false,
            connectTimeout: 30000,
            timeout: 30000,
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        retry: {
            max: 3,
            timeout: 5000,
        },
    }
);

export default sequelize;
