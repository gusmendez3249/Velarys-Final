const express = require('express');
const router = express.Router();
const cartaController = require('../controllers/carta.controller');

// Obtener todas las cartas de un memorama
router.get('/:memoramaId', cartaController.getCartasByMemoramaId);

// Obtener una carta por ID
router.get('/carta/:id', cartaController.getCartaById);

// Crear una nueva carta
router.post('/', cartaController.createCarta);

// Actualizar una carta por ID
router.put('/:id', cartaController.updateCarta);

// Eliminar una carta por ID
router.delete('/:id', cartaController.deleteCarta);

module.exports = router;
