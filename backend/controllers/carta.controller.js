// controllers/carta.controller.js
const Carta = require('../models/carta.model');

exports.getAllCartas = (req, res) => {
  Carta.getAll((err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.getCartaById = (req, res) => {
  Carta.getById(req.params.id, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results[0]);
  });
};

exports.createCarta = (req, res) => {
  Carta.create(req.body, (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ id: results.insertId });
  });
};

exports.updateCarta = (req, res) => {
  Carta.update(req.params.id, req.body, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.deleteCarta = (req, res) => {
  Carta.delete(req.params.id, (err, results) => {
    if (err) {
      if (err.code === 'ER_ROW_IS_REFERENCED_2') {
        return res.status(400).send('No se puede eliminar la carta porque existen registros relacionados en otras tablas.');
      }
      return res.status(500).send('Error al eliminar la carta.');
    }
    res.status(204).send();
  });
};
