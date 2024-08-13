const express = require('express');
const router = express.Router();
const preguntaController = require('../controllers/pregunta.controller');

router.get('/preguntas', preguntaController.getAllPreguntas);
router.get('/preguntas/:id', preguntaController.getPreguntaById);
router.post('/preguntas', preguntaController.createPregunta);
router.put('/preguntas/:id', preguntaController.updatePregunta);
router.delete('/preguntas/:id', preguntaController.deletePregunta);

module.exports = router;
