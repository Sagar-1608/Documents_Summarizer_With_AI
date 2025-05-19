import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

const sequelize = new Sequelize({
  username: process.env.DB_USERNAME,        // Oracle DB Username
  password: process.env.PASSWORD,         // Oracle DB Password
  database: process.env.DATABASE,         // Oracle DB Name (optional)
  dialect: 'oracle',
  logging: false,                         // Disable SQL logging
  pool: {
    max: 50,
    min: 5,
    idle: 10000,
    acquire: 30000,
  },
  dialectOptions: {
    connectString: process.env.DB_CONNECT_STRING, // Example: "localhost/XEPDB1"
  },
});

// Test Connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('🎉🎉🎉 Congratulations! Your Database Connected successfully!🎉🎉🎉');
  } catch (error) {
    console.error('❌ Unable to connect to Oracle DB:', error.message);
  }
}

testConnection();

export default sequelize;
