// backend/test-connection.js
require('dotenv').config();
const { Sequelize } = require('sequelize');

// Инициализируем Sequelize из переменных окружения
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,      // отключить SQL-логирование
  }
);

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Успешно подключились к PostgreSQL!');
  } catch (err) {
    console.error('❌ Не удалось подключиться:', err);
  } finally {
    await sequelize.close();
  }
}

testConnection();
