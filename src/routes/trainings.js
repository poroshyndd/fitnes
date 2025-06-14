// backend/src/routes/trainings.js
const express        = require('express');
const authMiddleware = require('../middlewares/auth');             // файл src/middlewares/auth.js
const trainingCtrl   = require('../controllers/trainingController');

const router = express.Router();

// ВАЖНО: именно так — сначала мидлвэр, потом всё остальное
router.use(authMiddleware);

// GET    /trainings
router.get('/',        trainingCtrl.getAll);

// GET    /trainings/stats
router.get('/stats',   trainingCtrl.stats);

// GET    /trainings/:id
router.get('/:id',     trainingCtrl.getById);

// POST   /trainings
router.post('/',       trainingCtrl.create);

// PUT    /trainings/:id
router.put('/:id',     trainingCtrl.update);

// DELETE /trainings/:id
router.delete('/:id',  trainingCtrl.remove);

module.exports = router;
