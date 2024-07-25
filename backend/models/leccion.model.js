// models/leccion.model.js
const mysql = require('mysql2');
const config = require('../config');

const connection = mysql.createConnection(config.database);

const Leccion = {
  getAll: (callback) => {
    connection.query('SELECT * FROM lecciones', callback);
  },
  getById: (id, callback) => {
    connection.query('SELECT * FROM lecciones WHERE id = ?', [id], callback);
  },
  getByNivelId: (nivelId, callback) => {
    connection.query('SELECT * FROM lecciones WHERE nivelId = ?', [nivelId], callback);
  },
  create: (data, callback) => {
    connection.query('INSERT INTO lecciones SET ?', data, callback);
  },
  update: (id, data, callback) => {
    connection.query('UPDATE lecciones SET ? WHERE id = ?', [data, id], callback);
  },
  delete: (id, callback) => {
    connection.query('DELETE FROM lecciones WHERE id = ?', [id], callback);
  }
};

module.exports = Leccion;
