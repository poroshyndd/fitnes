// backend/test-models.js
require('dotenv').config();
const { sequelize, User, Training } = require('./models');

async function check() {
  try {
    await sequelize.authenticate();
    console.log('✅ Успешно подключились к БД и инициализировали Sequelize');

    // опционально: проверим, что модели доступны и имеют методы
    console.log('User model methods:', Object.keys(User).filter(k => typeof User[k] === 'function'));
    console.log('Training model methods:', Object.keys(Training).filter(k => typeof Training[k] === 'function'));

  } catch (err) {
    console.error('❌ Ошибка при инициализации моделей:', err);
  } finally {
    await sequelize.close();
  }
}

check();
