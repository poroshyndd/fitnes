// backend/server.js
const app = require('./app');
const { sequelize } = require('./models');

const PORT = process.env.PORT || 4000;

// Сначала проверяем соединение с БД…
sequelize.authenticate()
  .then(() => {
    console.log('✅ DB connected');
    // …а потом поднимаем веб-сервер
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Unable to connect to the database:', err);
    process.exit(1);
  });
