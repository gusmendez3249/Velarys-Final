// models/curso.model.js
const mysql = require('mysql2');
const config = require('../config');

// Crear una conexión a la base de datos
const connection = mysql.createConnection({
  host: config.database.host,
  user: config.database.user,
  password: config.database.password,
  database: config.database.database,
  port: config.database.port
});


const Curso = {
  getAll: (callback) => {
    connection.query('SELECT * FROM cursos', callback);
  },
  getById: (id, callback) => {
    connection.query('SELECT * FROM cursos WHERE id = ?', [id], callback);
  },
  create: (data, callback) => {
    connection.query('INSERT INTO cursos SET ?', data, callback);
  },
  update: (id, data, callback) => {
    connection.query('UPDATE cursos SET ? WHERE id = ?', [data, id], callback);
  },
  delete: (id, callback) => {
    connection.query('DELETE FROM cursos WHERE id = ?', [id], callback);
  }
};

module.exports = Curso;
