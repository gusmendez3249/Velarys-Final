const Respuesta = require('../models/respuesta.model');

exports.getAllRespuestas = (req, res) => {
  Respuesta.getAll((err, results) => {
    if (err) res.status(500).send(err);
    else res.json(results);
  });
};

exports.getRespuestaById = (req, res) => {
  Respuesta.getById(req.params.id, (err, results) => {
    if (err) res.status(500).send(err);
    else res.json(results[0]);
  });
};

exports.createRespuesta = (req, res) => {
  Respuesta.create(req.body, (err, results) => {
    if (err) res.status(500).send(err);
    else res.status(201).json({ id: results.insertId });
  });
};

exports.updateRespuesta = (req, res) => {
  Respuesta.update(req.params.id, req.body, (err, results) => {
    if (err) res.status(500).send(err);
    else res.json(results);
  });
};

exports.deleteRespuesta = (req, res) => {
  Respuesta.delete(req.params.id, (err, results) => {
    if (err) {
      if (err.code === 'ER_ROW_IS_REFERENCED_2') {
        res.status(400).send('No se puede eliminar la respuesta porque existen registros relacionados en otras tablas.');
      } else {
        res.status(500).send('Error al eliminar la respuesta.');
      }
    } else {
      res.status(204).send();
    }
  });
};
