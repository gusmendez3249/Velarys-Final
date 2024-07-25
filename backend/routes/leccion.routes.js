// routes/leccion.routes.js
const express = require('express');
const router = express.Router();
const leccionController = require('../controllers/leccion.controller');

// Obtener todas las lecciones
router.get('/', leccionController.getAllLecciones);

// Obtener una lección por ID
router.get('/:id', leccionController.getLeccionById);

// Obtener lecciones por ID de nivel
router.get('/nivel/:nivelId', leccionController.getLeccionesByNivelId);

// Crear una nueva lección
router.post('/', leccionController.createLeccion);

// Actualizar una lección por ID
router.put('/:id', leccionController.updateLeccion);

// Eliminar una lección por ID
router.delete('/:id', leccionController.deleteLeccion);

module.exports = router;
