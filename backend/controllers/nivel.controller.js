// controllers/nivel.controller.js
const Nivel = require('../models/nivel.model');

exports.getAllNiveles = (req, res) => {
  Nivel.getAll((err, results) => {
    if (err) res.status(500).send(err);
    else res.json(results);
  });
};

exports.getNivelById = (req, res) => {
  Nivel.getById(req.params.id, (err, results) => {
    if (err) res.status(500).send(err);
    else res.json(results[0]);
  });
};

exports.getNivelesByCursoId = (req, res) => {
  Nivel.getByCursoId(req.params.cursoId, (err, results) => {
    if (err) res.status(500).send(err);
    else res.json(results);
  });
};

exports.createNivel = (req, res) => {
  Nivel.create(req.body, (err, results) => {
    if (err) res.status(500).send(err);
    else res.status(201).json({ id: results.insertId });
  });
};

exports.updateNivel = (req, res) => {
  Nivel.update(req.params.id, req.body, (err, results) => {
    if (err) res.status(500).send(err);
    else res.json(results);
  });
};

exports.deleteNivel = (req, res) => {
  Nivel.delete(req.params.id, (err, results) => {
    if (err) res.status(500).send(err);
    else res.status(204).send();
  });
};
