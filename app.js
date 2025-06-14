// backend/app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes     = require('./src/routes/auth');
const trainingRoutes = require('./src/routes/trainings');
const profileRoutes  = require('./src/routes/profile');

const app = express();

// CORS — разрешаем крёстные запросы с React
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.options('*', cors());  // чтобы сразу отвечать на preflight

app.use(express.json());

// статика для аватарок
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// роуты
app.use('/auth',     authRoutes);
app.use('/trainings', trainingRoutes);
app.use('/profile',   profileRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

// общий обработчик ошибок
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Server error' });
});

module.exports = app;
