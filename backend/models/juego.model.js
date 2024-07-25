// models/juego.model.js
const mysql = require('mysql2');
const config = require('../config');

const connection = mysql.createConnection(config.database);

const Juego = {
  getAll: (callback) => {
    connection.query('SELECT * FROM juegos', callback);
  },
  getById: (id, callback) => {
    connection.query('SELECT * FROM juegos WHERE id = ?', [id], callback);
  },
  getByLeccionId: (leccionId, callback) => {
    connection.query('SELECT * FROM juegos WHERE leccionId = ?', [leccionId], callback);
  },
  create: (data, callback) => {
    connection.query('INSERT INTO juegos SET ?', data, callback);
  },
  update: (id, data, callback) => {
    connection.query('UPDATE juegos SET ? WHERE id = ?', [data, id], callback);
  },
  delete: (id, callback) => {
    connection.query('DELETE FROM juegos WHERE id = ?', [id], callback);
  }
};

module.exports = Juego;
