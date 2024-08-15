const Pregunta = require('../models/pregunta.model');

// Obtener todas las preguntas
exports.getAllPreguntas = (req, res) => {
  Pregunta.getAll((err, results) => {
    if (err) res.status(500).send(err);
    else res.json(results);
  });
};

// Obtener preguntas por lección
exports.getPreguntasPorLeccionId = (req, res) => {
  const leccionId = parseInt(req.params.leccionId, 10);
  if (isNaN(leccionId)) {
    return res.status(400).send('ID de lección inválido');
  }
  Pregunta.getByLeccionId(leccionId, (err, results) => {
    if (err) res.status(500).send(err);
    else res.json(results);
  });
};

// Obtener una pregunta por su ID
exports.getPreguntaById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).send('ID de pregunta inválido');
  }
  Pregunta.getById(id, (err, results) => {
    if (err) res.status(500).send(err);
    else res.json(results[0]);
  });
};

// Crear una nueva pregunta
exports.createPregunta = (req, res) => {
  // Validar el formato de `opciones` si es necesario
  if (!req.body.opciones) {
    return res.status(400).send('El campo `opciones` es obligatorio');
  }
  Pregunta.create(req.body, (err, results) => {
    if (err) res.status(500).send(err);
    else res.status(201).json({ id: results.insertId });
  });
};

// Actualizar una pregunta existente
exports.updatePregunta = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).send('ID de pregunta inválido');
  }
  Pregunta.update(id, req.body, (err, results) => {
    if (err) res.status(500).send(err);
    else res.json(results);
  });
};

// Eliminar una pregunta
exports.deletePregunta = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).send('ID de pregunta inválido');
  }
  Pregunta.delete(id, (err, results) => {
    if (err) {
      if (err.code === 'ER_ROW_IS_REFERENCED_2') {
        res.status(400).send('No se puede eliminar la pregunta porque existen registros relacionados en otras tablas.');
      } else {
        res.status(500).send('Error al eliminar la pregunta.');
      }
    } else {
      res.status(204).send();
    }
  });
};
