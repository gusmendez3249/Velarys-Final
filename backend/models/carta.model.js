const promisePool = require('./db');

const Carta = {
  getByMemoramaId: async (memoramaId, callback) => {
    try {
      const [rows] = await promisePool.query('SELECT * FROM Cartas WHERE memoramaId = ?', [memoramaId]);
      callback(null, rows);
    } catch (err) {
      callback(err);
    }
  },
  create: async (memoramaId, data, callback) => {
    try {
      const [result] = await promisePool.query('INSERT INTO Cartas SET ?', { memoramaId, ...data });
      callback(null, result);
    } catch (err) {
      callback(err);
    }
  },
  update: async (id, data, callback) => {
    try {
      const [result] = await promisePool.query('UPDATE Cartas SET ? WHERE id = ?', [data, id]);
      callback(null, result);
    } catch (err) {
      callback(err);
    }
  },
  delete: async (id, callback) => {
    try {
      const [result] = await promisePool.query('DELETE FROM Cartas WHERE id = ?', [id]);
      callback(null, result);
    } catch (err) {
      callback(err);
    }
  }
};

module.exports = Carta;
