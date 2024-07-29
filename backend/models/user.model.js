const mysql = require('mysql2');
const dbConfig = require('../config').database;

const pool = mysql.createPool(dbConfig);

const getUserByEmail = (email, callback) => {
  pool.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
    if (error) return callback(error);
    callback(null, results[0]);
  });
};

const createUser = (userData, callback) => {
  pool.query('INSERT INTO users SET ?', userData, (error, results) => {
    if (error) return callback(error);
    callback(null, results.insertId);
  });
};

module.exports = { getUserByEmail, createUser };
