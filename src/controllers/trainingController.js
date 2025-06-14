// backend/src/controllers/trainingController.js
const { Training } = require('../../models');
const { Op } = require('sequelize');

module.exports = {
  // GET /trainings
  getAll: async (req, res) => {
    try {
      const where = { userId: req.user.id };
      const list = await Training.findAll({
        where,
        order: [['date', 'DESC']],
      });
      res.json(list);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  },

  // GET /trainings/:id
  getById: async (req, res) => {
    try {
      const tr = await Training.findOne({
        where: { id: req.params.id, userId: req.user.id },
      });
      if (!tr) return res.status(404).json({ message: 'Not found' });
      res.json(tr);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  },

  // POST /trainings
  create: async (req, res) => {
    try {
      const { type, intensity, duration, date } = req.body;
      const newTr = await Training.create({
        userId: req.user.id,
        type,
        intensity,
        duration,
        date,
      });
      res.status(201).json(newTr);
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: 'Invalid data' });
    }
  },

  // PUT /trainings/:id
  update: async (req, res) => {
    try {
      const { type, intensity, duration, date } = req.body;
      const [updated] = await Training.update(
        { type, intensity, duration, date },
        { where: { id: req.params.id, userId: req.user.id } }
      );
      if (!updated) return res.status(404).json({ message: 'Not found or no permission' });
      const tr = await Training.findByPk(req.params.id);
      res.json(tr);
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: 'Invalid data' });
    }
  },

  // DELETE /trainings/:id
  remove: async (req, res) => {
    try {
      const deleted = await Training.destroy({
        where: { id: req.params.id, userId: req.user.id },
      });
      if (!deleted) return res.status(404).json({ message: 'Not found or no permission' });
      res.status(204).end();
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  },

  // GET /trainings/stats
  stats: async (req, res) => {
    try {
      const { from, to } = req.query;
      const where = { userId: req.user.id };
      if (from || to) {
        where.date = {};
        if (from) where.date[Op.gte] = from;
        if (to)   where.date[Op.lte] = to;
      }
      const list = await Training.findAll({ where });
      const count = list.length;
      const totalMinutes = list.reduce((sum, tr) => sum + tr.duration, 0);
      res.json({ count, totalMinutes });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  },
};
