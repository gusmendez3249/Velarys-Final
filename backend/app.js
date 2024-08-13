const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const cursoRoutes = require('./routes/curso.routes');
const nivelRoutes = require('./routes/nivel.routes');
const leccionRoutes = require('./routes/leccion.routes');
const authRoutes = require('./routes/auth.routes');
const preguntaRoutes = require('./routes/pregunta.routes'); // Importar rutas de preguntas

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/cursos', cursoRoutes);
app.use('/api/niveles', nivelRoutes);
app.use('/api/lecciones', leccionRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/preguntas', preguntaRoutes); // Añadir middleware para preguntas

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
