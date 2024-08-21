const express = require('express');
const router = express.Router();
const memoramaController = require('../controllers/memorama.controller');

// Obtener todos los memoramas
router.get('/', memoramaController.getAllMemoramas);

// Obtener un memorama por ID
router.get('/:id', memoramaController.getMemoramaById);

// Obtener memoramas por leccionId (nueva ruta)
router.get('/leccion/:leccionId', memoramaController.getMemoramasPorLeccionId);

// Crear un nuevo memorama
router.post('/', memoramaController.createMemorama);

// Actualizar un memorama por ID
router.put('/:id', memoramaController.updateMemorama);

// Eliminar un memorama por ID
router.delete('/:id', memoramaController.deleteMemorama);

module.exports = router;
