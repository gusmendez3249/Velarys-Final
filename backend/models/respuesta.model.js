// models/respuesta.model.js
const promisePool = require('./db');

const Respuesta = {
  getAll: async (callback) => {
    try {
      const [rows] = await promisePool.query('SELECT * FROM respuestas');
      callback(null, rows);
    } catch (err) {
      callback(err);
    }
  },
  getById: async (id, callback) => {
    try {
      const [rows] = await promisePool.query('SELECT * FROM respuestas WHERE id = ?', [id]);
      callback(null, rows);
    } catch (err) {
      callback(err);
    }
  },
  create: async (data, callback) => {
    try {
      const [result] = await promisePool.query('INSERT INTO respuestas SET ?', data);
      callback(null, result);
    } catch (err) {
      callback(err);
    }
  },
  update: async (id, data, callback) => {
    try {
      const [result] = await promisePool.query('UPDATE respuestas SET ? WHERE id = ?', [data, id]);
      callback(null, result);
    } catch (err) {
      callback(err);
    }
  },
  delete: async (id, callback) => {
    try {
      const [result] = await promisePool.query('DELETE FROM respuestas WHERE id = ?', [id]);
      callback(null, result);
    } catch (err) {
      callback(err);
    }
  }
};

module.exports = Respuesta;
