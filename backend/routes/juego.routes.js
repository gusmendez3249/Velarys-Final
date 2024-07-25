// routes/juego.routes.js
const express = require('express');
const router = express.Router();
const juegoController = require('../controllers/juego.controller');

// Obtener todos los juegos
router.get('/', juegoController.getAllJuegos);

// Obtener un juego por ID
router.get('/:id', juegoController.getJuegoById);

// Obtener juegos por ID de lección
router.get('/leccion/:leccionId', juegoController.getJuegosByLeccionId);

// Crear un nuevo juego
router.post('/', juegoController.createJuego);

// Actualizar un juego por ID
router.put('/:id', juegoController.updateJuego);

// Eliminar un juego por ID
router.delete('/:id', juegoController.deleteJuego);

module.exports = router;
