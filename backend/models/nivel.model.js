// models/nivel.model.js
const mysql = require('mysql2');
const config = require('../config');

const connection = mysql.createConnection(config.database);

const Nivel = {
  // Obtiene todos los niveles sin filtrado por cursoId (si es necesario)
  getAll: (callback) => {
    connection.query('SELECT * FROM niveles', callback);
  },

  // Obtiene un nivel específico por ID
  getById: (id, callback) => {
    connection.query('SELECT * FROM niveles WHERE id = ?', [id], callback);
  },

  // Obtiene niveles por cursoId
  getByCursoId: (cursoId, callback) => {
    connection.query('SELECT * FROM niveles WHERE cursoId = ?', [cursoId], callback);
  },

  // Crea un nuevo nivel
  create: (data, callback) => {
    connection.query('INSERT INTO niveles SET ?', data, callback);
  },

  // Actualiza un nivel existente
  update: (id, data, callback) => {
    connection.query('UPDATE niveles SET ? WHERE id = ?', [data, id], callback);
  },

  // Elimina un nivel
  delete: (id, callback) => {
    connection.query('DELETE FROM niveles WHERE id = ?', [id], callback);
  }
};

module.exports = Nivel;
