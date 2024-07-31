const Curso = require('../models/curso.model');

exports.getAllCursos = (req, res) => {
  Curso.getAll((err, results) => {
    if (err) res.status(500).send(err);
    else res.json(results);
  });
};

exports.getCursoById = (req, res) => {
  Curso.getById(req.params.id, (err, results) => {
    if (err) res.status(500).send(err);
    else res.json(results[0]);
  });
};

exports.createCurso = (req, res) => {
  Curso.create(req.body, (err, results) => {
    if (err) res.status(500).send(err);
    else res.status(201).json({ id: results.insertId });
  });
};

exports.updateCurso = (req, res) => {
  Curso.update(req.params.id, req.body, (err, results) => {
    if (err) res.status(500).send(err);
    else res.json(results);
  });
};

exports.deleteCurso = (req, res) => {
  Curso.delete(req.params.id, (err, results) => {
    if (err) {
      // Verifica si el error es una restricción de clave foránea
      if (err.code === 'ER_ROW_IS_REFERENCED_2') {
        res.status(400).send('No se puede eliminar el curso porque existen registros relacionados en otras tablas.');
      } else {
        res.status(500).send('Error al eliminar el curso.');
      }
    } else {
      res.status(204).send();
    }
  });
};
