// models/nivel.model.js
const promisePool = require('./db');

const Nivel = {
  getAll: async (callback) => {
    try {
      const [rows] = await promisePool.query('SELECT * FROM niveles');
      callback(null, rows);
    } catch (err) {
      callback(err);
    }
  },
  getById: async (id, callback) => {
    try {
      const [rows] = await promisePool.query('SELECT * FROM niveles WHERE id = ?', [id]);
      callback(null, rows);
    } catch (err) {
      callback(err);
    }
  },
  getByCursoId: async (cursoId, callback) => {
    try {
      const [rows] = await promisePool.query('SELECT * FROM niveles WHERE cursoId = ?', [cursoId]);
      callback(null, rows);
    } catch (err) {
      callback(err);
    }
  },
  create: async (data, callback) => {
    try {
      const [result] = await promisePool.query('INSERT INTO niveles SET ?', data);
      callback(null, result);
    } catch (err) {
      callback(err);
    }
  },
  update: async (id, data, callback) => {
    try {
      const [result] = await promisePool.query('UPDATE niveles SET ? WHERE id = ?', [data, id]);
      callback(null, result);
    } catch (err) {
      callback(err);
    }
  },
  delete: async (id, callback) => {
    try {
      const [result] = await promisePool.query('DELETE FROM niveles WHERE id = ?', [id]);
      callback(null, result);
    } catch (err) {
      callback(err);
    }
  }
};

module.exports = Nivel;
