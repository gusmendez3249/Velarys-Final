// controllers/leccion.controller.js
const Leccion = require('../models/leccion.model');

exports.getAllLecciones = (req, res) => {
  Leccion.getAll((err, results) => {
    if (err) res.status(500).send(err);
    else res.json(results);
  });
};

exports.getLeccionById = (req, res) => {
  Leccion.getById(req.params.id, (err, results) => {
    if (err) res.status(500).send(err);
    else res.json(results[0]);
  });
};

exports.getLeccionesByNivelId = (req, res) => {
  Leccion.getByNivelId(req.params.nivelId, (err, results) => {
    if (err) res.status(500).send(err);
    else res.json(results);
  });
};

exports.createLeccion = (req, res) => {
  Leccion.create(req.body, (err, results) => {
    if (err) res.status(500).send(err);
    else res.status(201).json({ id: results.insertId });
  });
};

exports.updateLeccion = (req, res) => {
  Leccion.update(req.params.id, req.body, (err, results) => {
    if (err) res.status(500).send(err);
    else res.json(results);
  });
};

exports.deleteLeccion = (req, res) => {
  Leccion.delete(req.params.id, (err, results) => {
    if (err) res.status(500).send(err);
    else res.status(204).send();
  });
};
