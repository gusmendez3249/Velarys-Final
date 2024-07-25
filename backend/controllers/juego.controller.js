// controllers/juego.controller.js
const Juego = require('../models/juego.model');

exports.getAllJuegos = (req, res) => {
  Juego.getAll((err, results) => {
    if (err) res.status(500).send(err);
    else res.json(results);
  });
};

exports.getJuegoById = (req, res) => {
  Juego.getById(req.params.id, (err, results) => {
    if (err) res.status(500).send(err);
    else res.json(results[0]);
  });
};

exports.getJuegosByLeccionId = (req, res) => {
  Juego.getByLeccionId(req.params.leccionId, (err, results) => {
    if (err) res.status(500).send(err);
    else res.json(results);
  });
};

exports.createJuego = (req, res) => {
  Juego.create(req.body, (err, results) => {
    if (err) res.status(500).send(err);
    else res.status(201).json({ id: results.insertId });
  });
};

exports.updateJuego = (req, res) => {
  Juego.update(req.params.id, req.body, (err, results) => {
    if (err) res.status(500).send(err);
    else res.json(results);
  });
};

exports.deleteJuego = (req, res) => {
  Juego.delete(req.params.id, (err, results) => {
    if (err) res.status(500).send(err);
    else res.status(204).send();
  });
};
