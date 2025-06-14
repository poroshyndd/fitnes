// backend/src/routes/profile.js
const express        = require('express');
const authMiddleware = require('../middlewares/auth');
const upload         = require('../middlewares/upload');
const { User }       = require('../../models');

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  const user = await User.findByPk(req.user.id, {
    attributes: ['email','name','weight','height','avatarUrl','isVerified']
  });
  res.json(user);
});

router.put('/', authMiddleware, async (req, res) => {
  const { name, weight, height } = req.body;
  const u = await User.findByPk(req.user.id);
  Object.assign(u, { name, weight, height });
  await u.save();
  res.json(u);
});

router.post(
  '/avatar',
  authMiddleware,
  upload.single('avatar'),
  async (req, res) => {
    const u = await User.findByPk(req.user.id);
    u.avatarUrl = `/uploads/${req.file.filename}`;
    await u.save();
    res.json({ avatarUrl: u.avatarUrl });
  }
);

module.exports = router;
