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


// Controlador para obtener niveles por cursoId
exports.getNivelesByCursoId = (req, res) => {
  const cursoId = parseInt(req.params.cursoId, 10); // Obtener cursoId de los parámetros de la ruta

  if (isNaN(cursoId)) {
    return res.status(400).json({ error: 'Invalid cursoId' });
  }

  Nivel.getByCursoId(cursoId, (err, niveles) => {
    if (err) {
      console.error('Error al obtener niveles por curso:', err);
      return res.status(500).json({ error: 'Error al obtener niveles' });
    }

    res.status(200).json(niveles);
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
