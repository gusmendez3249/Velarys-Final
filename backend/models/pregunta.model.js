const promisePool = require('./db');

const Pregunta = {
  // Obtener todas las preguntas
  getAll: async (callback) => {
    try {
      const [rows] = await promisePool.query('SELECT * FROM preguntas');
      callback(null, rows);
    } catch (err) {
      callback(err);
    }
  },

  // Obtener preguntas por lección
  getByLeccionId: async (leccionId, callback) => {
    try {
      const [rows] = await promisePool.query('SELECT * FROM preguntas WHERE leccionId = ?', [leccionId]);
      callback(null, rows);
    } catch (err) {
      callback(err);
    }
  },

  // Obtener una pregunta por su ID
  getById: async (id, callback) => {
    try {
      const [rows] = await promisePool.query('SELECT * FROM preguntas WHERE id = ?', [id]);
      callback(null, rows);
    } catch (err) {
      callback(err);
    }
  },

  // Crear una nueva pregunta
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

  // Actualizar una pregunta existente
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

  // Eliminar una pregunta
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
