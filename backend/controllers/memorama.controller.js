const Memorama = require('../models/memorama.model');
const Carta = require('../models/carta.model');

exports.getAllMemoramasByLeccion = (req, res) => {
  Memorama.getAllByLeccion(req.params.leccionId, (err, results) => {
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
    if (err) {
      if (err.code === 'ER_ROW_IS_REFERENCED_2') {
        res.status(400).send('No se puede eliminar el memorama porque existen registros relacionados en otras tablas.');
      } else {
        res.status(500).send('Error al eliminar el memorama.');
      }
    } else {
      res.status(204).send();
    }
  });
};

exports.getCartasByMemoramaId = (req, res) => {
  Carta.getByMemoramaId(req.params.id, (err, results) => {
    if (err) res.status(500).send(err);
    else res.json(results);
  });
};

exports.createCarta = (req, res) => {
  Carta.create(req.params.id, req.body, (err, results) => {
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
    if (err) {
      if (err.code === 'ER_ROW_IS_REFERENCED_2') {
        res.status(400).send('No se puede eliminar la carta porque existen registros relacionados en otras tablas.');
      } else {
        res.status(500).send('Error al eliminar la carta.');
      }
    } else {
      res.status(204).send();
    }
  });
};
