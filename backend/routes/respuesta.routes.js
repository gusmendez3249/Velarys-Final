const express = require('express');
const router = express.Router();
const respuestaController = require('../controllers/respuesta.controller');

router.get('/respuestas', respuestaController.getAllRespuestas);
router.get('/respuestas/:id', respuestaController.getRespuestaById);
router.post('/respuestas', respuestaController.createRespuesta);
router.put('/respuestas/:id', respuestaController.updateRespuesta);
router.delete('/respuestas/:id', respuestaController.deleteRespuesta);

module.exports = router;
