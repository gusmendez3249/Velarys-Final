const promisePool = require('./db');

const Pregunta = {
  getAll: async (callback) => {
    try {
      const [rows] = await promisePool.query('SELECT * FROM preguntas');
      callback(null, rows);
    } catch (err) {
      callback(err);
    }
  },
  getById: async (id, callback) => {
    try {
      const [rows] = await promisePool.query('SELECT * FROM preguntas WHERE id = ?', [id]);
      callback(null, rows);
    } catch (err) {
      callback(err);
    }
  },
  create: async (data, callback) => {
    try {
      // Asegúrate de que `opciones` sea una cadena JSON
      data.opciones = JSON.stringify(data.opciones);
      const [result] = await promisePool.query('INSERT INTO preguntas SET ?', data);
      callback(null, result);
    } catch (err) {
      callback(err);
    }
  },
  update: async (id, data, callback) => {
    try {
      // Asegúrate de que `opciones` sea una cadena JSON
      if (data.opciones) {
        data.opciones = JSON.stringify(data.opciones);
      }
      const [result] = await promisePool.query('UPDATE preguntas SET ? WHERE id = ?', [data, id]);
      callback(null, result);
    } catch (err) {
      callback(err);
    }
  },
  delete: async (id, callback) => {
    try {
      const [result] = await promisePool.query('DELETE FROM preguntas WHERE id = ?', [id]);
      callback(null, result);
    } catch (err) {
      callback(err);
    }
  }
};

module.exports = Pregunta;
