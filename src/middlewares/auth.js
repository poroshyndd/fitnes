// backend/src/middlewares/auth.js
// (оставляем этот, и убираем authMiddleware.js)
require('dotenv').config();
const jwt  = require('jsonwebtoken');
const { User } = require('../../models');

module.exports = async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Токен отсутствует' });
  }

  const [scheme, token] = authHeader.split(' ');
  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Неверный формат токена' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(payload.id);
    if (!user) {
      return res.status(401).json({ message: 'Пользователь не найден' });
    }

    req.user = { id: user.id, email: user.email };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Неверный или просроченный токен' });
  }
};
