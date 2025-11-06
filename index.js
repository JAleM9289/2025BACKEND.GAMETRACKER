// --- Importaciones ---
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const juegosRouter = require('./routes/juegos.js'); // Ruta de juegos
const resenasRouter = require('./routes/resenas.js'); // <-- 1. IMPORTAMOS LAS NUEVAS RUTAS

// --- Inicialización ---
const app = express();
const PORT = 3001;

// --- Middlewares ---
app.use(express.json()); // Para que Express entienda JSON

// --- Conexión a la Base de Datos ---
mongoose.connect(process.env.DB_URI)
  .then(() => {
    console.log('¡Conectado exitosamente a MongoDB Atlas!');
  })
  .catch((error) => {
    console.error('Error al conectar a MongoDB:', error);
  });

// --- Rutas ---
app.get('/', (req, res) => {
  res.send('¡Mi servidor GameTracker funciona!');
});

// Conectamos las rutas de JUEGOS
app.use('/api/juegos', juegosRouter);

// <-- 2. CONECTAMOS LAS NUEVAS RUTAS
// Le decimos a Express:
// "Cualquier petición que empiece con /api/reseñas,
// mándasela al archivo 'resenasRouter' que importamos"
app.use('/api/reseñas', resenasRouter);


// --- Iniciar Servidor ---
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});