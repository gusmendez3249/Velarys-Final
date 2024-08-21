const Carta = require('../models/carta.model');

exports.getCartasByMemoramaId = (req, res) => {
  Carta.getByMemoramaId(req.params.memoramaId, (err, results) => {
    if (err) res.status(500).send(err);
    else res.json(results);
  });
};

exports.getCartaById = (req, res) => {
  Carta.getById(req.params.id, (err, results) => {
    if (err) res.status(500).send(err);
    else res.json(results[0]);
  });
};

exports.createCarta = (req, res) => {
  Carta.create(req.body, (err, results) => {
    if (err) res.status(500).send(err);
    else res.status(201).json({ id: results.insertId });
  });
};

exports.updateCarta = (req, res) => {
  Carta.update(req.params.id, req.body, (err, results) => {
    if (err) res.status(500).send(err);
    else res.json(results);
  });
};

exports.deleteCarta = (req, res) => {
  Carta.delete(req.params.id, (err, results) => {
    if (err) res.status(500).send(err);
    else res.status(204).send();
  });
};
