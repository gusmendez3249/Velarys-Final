// models/user.model.js
const promisePool = require('./db');

const User = {
  getUserByEmail: async (email, callback) => {
    try {
      const [rows] = await promisePool.query('SELECT * FROM users WHERE email = ?', [email]);
      callback(null, rows[0]);
    } catch (err) {
      callback(err);
    }
  },
  create: async (userData, callback) => {
    try {
      const [result] = await promisePool.query('INSERT INTO users SET ?', userData);
      callback(null, result.insertId);
    } catch (err) {
      callback(err);
    }
  }
};

module.exports = User;
