const promisePool = require('./db');

const Memorama = {
  getAll: async (callback) => {
    try {
      const [rows] = await promisePool.query('SELECT * FROM memoramas');
      callback(null, rows);
    } catch (err) {
      callback(err);
    }
  },
  getById: async (id, callback) => {
    try {
      const [rows] = await promisePool.query('SELECT * FROM memoramas WHERE id = ?', [id]);
      callback(null, rows);
    } catch (err) {
      callback(err);
    }
  },
  getByLeccionId: async (leccionId, callback) => {
    try {
      const [rows] = await promisePool.query('SELECT * FROM memoramas WHERE leccionId = ?', [leccionId]);
      callback(null, rows);
    } catch (err) {
      callback(err);
    }
  },
  create: async (data, callback) => {
    try {
      const [result] = await promisePool.query('INSERT INTO memoramas SET ?', data);
      callback(null, result);
    } catch (err) {
      callback(err);
    }
  },
  update: async (id, data, callback) => {
    try {
      const [result] = await promisePool.query('UPDATE memoramas SET ? WHERE id = ?', [data, id]);
      callback(null, result);
    } catch (err) {
      callback(err);
    }
  },
  delete: async (id, callback) => {
    try {
      const [result] = await promisePool.query('DELETE FROM memoramas WHERE id = ?', [id]);
      callback(null, result);
    } catch (err) {
      callback(err);
    }
  }
};

module.exports = Memorama;
