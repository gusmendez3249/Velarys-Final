const Pregunta = require('../models/pregunta.model');

exports.getAllPreguntas = (req, res) => {
  Pregunta.getAll((err, results) => {
    if (err) res.status(500).send(err);
    else res.json(results);
  });
};

exports.getPreguntaById = (req, res) => {
  Pregunta.getById(req.params.id, (err, results) => {
    if (err) res.status(500).send(err);
    else res.json(results[0]);
  });
};

exports.createPregunta = (req, res) => {
  Pregunta.create(req.body, (err, results) => {
    if (err) res.status(500).send(err);
    else res.status(201).json({ id: results.insertId });
  });
};

exports.updatePregunta = (req, res) => {
  Pregunta.update(req.params.id, req.body, (err, results) => {
    if (err) res.status(500).send(err);
    else res.json(results);
  });
};

exports.deletePregunta = (req, res) => {
  Pregunta.delete(req.params.id, (err, results) => {
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
