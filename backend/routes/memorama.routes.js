const express = require('express');
const router = express.Router();
const {
  getAllMemoramasByLeccion,
  getMemoramaById,
  createMemorama,
  updateMemorama,
  deleteMemorama,
  getCartasByMemoramaId,
  createCarta,
  updateCarta,
  deleteCarta
} = require('../controllers/memorama.controller');

// Rutas para memoramas
router.get('/leccion/:leccionId', getAllMemoramasByLeccion);
router.get('/:id', getMemoramaById);
router.post('/', createMemorama);
router.put('/:id', updateMemorama);
router.delete('/:id', deleteMemorama);

// Rutas para cartas en memoramas
router.get('/:id/cartas', getCartasByMemoramaId);
router.post('/:id/cartas', createCarta);
router.put('/cartas/:id', updateCarta);
router.delete('/cartas/:id', deleteCarta);

module.exports = router;
