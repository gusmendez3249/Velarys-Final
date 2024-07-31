const bcrypt = require('bcryptjs');
const userModel = require('../models/user.model');

// Función para registrar un nuevo usuario
const register = (req, res) => {
  const { nombres, apellidos, email, edad, sexo, password, role } = req.body;

  // Define 'user' como el rol predeterminado si no se proporciona
  const userRole = role || 'user';

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Error al encriptar la contraseña:', err);
      return res.status(500).json({ message: 'Error al encriptar la contraseña', error: err.message });
    }

    const userData = { nombres, apellidos, email, edad, sexo, password: hashedPassword, role: userRole };

    userModel.createUser(userData, (error, userId) => {
      if (error) {
        console.error('Error al registrar el usuario:', error);
        return res.status(500).json({ message: 'Error al registrar el usuario', error: error.message });
      }
      res.status(201).json({ message: 'Usuario registrado correctamente', userId });
    });
  });
};

// Función para iniciar sesión
const login = (req, res) => {
  const { email, password } = req.body;

  userModel.getUserByEmail(email, (error, user) => {
    if (error) {
      console.error('Error al buscar el usuario:', error);
      return res.status(500).json({ message: 'Error al buscar el usuario', error: error.message });
    }
    if (!user) return res.status(401).json({ message: 'Usuario o contraseña equivocada' });

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        console.error('Error al comparar contraseñas:', err);
        return res.status(500).json({ message: 'Error al comparar contraseñas', error: err.message });
      }
      if (!result) return res.status(401).json({ message: 'Usuario o contraseña equivocada' });

      // En lugar de JWT, devolvemos una respuesta simple
      res.json({ message: 'Inicio de sesión correcto', userId: user.id, role: user.role });
    });
  });
};

module.exports = { register, login };
