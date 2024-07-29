const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const SECRET_KEY = require('../config').secretKey;

const register = (req, res) => {
  const { nombres, apellidos, email, edad, sexo, password, role } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ message: 'Error al encriptar la contraseña' });

    const userData = { nombres, apellidos, email, edad, sexo, password: hashedPassword, role };

    userModel.createUser(userData, (error, userId) => {
      if (error) return res.status(500).json({ message: 'Error al registrar el usuario' });
      res.status(201).json({ message: 'Usuario registrado correctamente', userId });
    });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  userModel.getUserByEmail(email, (error, user) => {
    if (error) return res.status(500).json({ message: 'Error al buscar el usuario' });
    if (!user) return res.status(401).json({ message: 'Usuario o contraseña equivocada' });

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) return res.status(500).json({ message: 'Error al comparar contraseñas' });
      if (!result) return res.status(401).json({ message: 'Usuario o contraseña equivocada' });

      const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
      res.json({ message: 'Inicio de sesión correcto', token });
    });
  });
};

module.exports = { register, login };
