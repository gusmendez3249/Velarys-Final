// models/db.js
const mysql = require('mysql2');
const config = require('../config');

const pool = mysql.createPool({
  host: config.database.host,
  user: config.database.user,
  password: config.database.password,
  database: config.database.database,
  port: config.database.port,
  connectionLimit: 10 // Ajusta según tus necesidades
});

const promisePool = pool.promise();

module.exports = promisePool;
