// models/leccion.model.js
const promisePool = require('./db'); // Asegúrate de que el archivo db.js esté correctamente ubicado

const Leccion = {
  getAll: async (callback) => {
    try {
      const [rows] = await promisePool.query('SELECT * FROM lecciones');
      callback(null, rows);
    } catch (err) {
      callback(err);
    }
  },
  getById: async (id, callback) => {
    try {
      const [rows] = await promisePool.query('SELECT * FROM lecciones WHERE id = ?', [id]);
      callback(null, rows);
    } catch (err) {
      callback(err);
    }
  },
  getByNivelId: async (nivelId, callback) => {
    try {
      const [rows] = await promisePool.query('SELECT * FROM lecciones WHERE nivelId = ?', [nivelId]);
      callback(null, rows);
    } catch (err) {
      callback(err);
    }
  },
  create: async (data, callback) => {
    try {
      const [result] = await promisePool.query('INSERT INTO lecciones SET ?', data);
      callback(null, result);
    } catch (err) {
      callback(err);
    }
  },
  update: async (id, data, callback) => {
    try {
      const [result] = await promisePool.query('UPDATE lecciones SET ? WHERE id = ?', [data, id]);
      callback(null, result);
    } catch (err) {
      callback(err);
    }
  },
  delete: async (id, callback) => {
    try {
      const [result] = await promisePool.query('DELETE FROM lecciones WHERE id = ?', [id]);
      callback(null, result);
    } catch (err) {
      callback(err);
    }
  }
};

module.exports = Leccion;
