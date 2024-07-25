// models/nivel.model.js
const mysql = require('mysql2');
const config = require('../config');

const connection = mysql.createConnection(config.database);

const Nivel = {
  getAll: (callback) => {
    connection.query('SELECT * FROM niveles', callback);
  },
  getById: (id, callback) => {
    connection.query('SELECT * FROM niveles WHERE id = ?', [id], callback);
  },
  getByCursoId: (cursoId, callback) => {
    connection.query('SELECT * FROM niveles WHERE cursoId = ?', [cursoId], callback);
  },
  create: (data, callback) => {
    connection.query('INSERT INTO niveles SET ?', data, callback);
  },
  update: (id, data, callback) => {
    connection.query('UPDATE niveles SET ? WHERE id = ?', [data, id], callback);
  },
  delete: (id, callback) => {
    connection.query('DELETE FROM niveles WHERE id = ?', [id], callback);
  }
};

module.exports = Nivel;
