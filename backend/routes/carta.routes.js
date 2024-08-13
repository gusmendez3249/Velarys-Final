// routes/carta.routes.js
const express = require('express');
const router = express.Router();
const cartaController = require('../controllers/carta.controller');

// Obtener todas las cartas
router.get('/', cartaController.getAllCartas);

// Obtener una carta por ID
router.get('/:id', cartaController.getCartaById);

// Crear una nueva carta
router.post('/', cartaController.createCarta);

// Actualizar una carta existente por ID
router.put('/:id', cartaController.updateCarta);

// Eliminar una carta por ID
router.delete('/:id', cartaController.deleteCarta);

module.exports = router;
