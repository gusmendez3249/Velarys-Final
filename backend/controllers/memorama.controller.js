const Memorama = require('../models/memorama.model');

exports.getAllMemoramas = (req, res) => {
  Memorama.getAll((err, results) => {
    if (err) res.status(500).send(err);
    else res.json(results);
  });
};

exports.getMemoramaById = (req, res) => {
  Memorama.getById(req.params.id, (err, results) => {
    if (err) res.status(500).send(err);
    else res.json(results[0]);
  });
};

// Nuevo método para obtener memoramas por leccionId
exports.getMemoramasPorLeccionId = (req, res) => {
  Memorama.getByLeccionId(req.params.leccionId, (err, results) => {
    if (err) res.status(500).send(err);
    else res.json(results);
  });
};

exports.createMemorama = (req, res) => {
  Memorama.create(req.body, (err, results) => {
    if (err) res.status(500).send(err);
    else res.status(201).json({ id: results.insertId });
  });
};

exports.updateMemorama = (req, res) => {
  Memorama.update(req.params.id, req.body, (err, results) => {
    if (err) res.status(500).send(err);
    else res.json(results);
  });
};

exports.deleteMemorama = (req, res) => {
  Memorama.delete(req.params.id, (err, results) => {
    if (err) res.status(500).send(err);
    else res.status(204).send();
  });
};
