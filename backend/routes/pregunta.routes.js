const express = require('express');
const router = express.Router();
const preguntaController = require('../controllers/pregunta.controller');

// Rutas para preguntas
router.get('/', preguntaController.getAllPreguntas);
router.get('/:id', preguntaController.getPreguntaById);
router.post('/', preguntaController.createPregunta);
router.put('/:id', preguntaController.updatePregunta);
router.delete('/:id', preguntaController.deletePregunta);

module.exports = router;
