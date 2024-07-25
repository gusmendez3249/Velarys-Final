// routes/nivel.routes.js
const express = require('express');
const router = express.Router();
const nivelController = require('../controllers/nivel.controller');

// Obtener todos los niveles
router.get('/', nivelController.getAllNiveles);

// Obtener un nivel por ID
router.get('/:id', nivelController.getNivelById);

// Obtener niveles por ID de curso
router.get('/curso/:cursoId', nivelController.getNivelesByCursoId);

// Crear un nuevo nivel
router.post('/', nivelController.createNivel);


// Actualizar un nivel por ID
router.put('/:id', nivelController.updateNivel);

// Eliminar un nivel por ID
router.delete('/:id', nivelController.deleteNivel);

module.exports = router;
