const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); 

// --- 1. Configuraciones
dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 3001; 

// --- 2. Importaciones de Rutas (¡CORREGIDO con los nuevos nombres de archivo!)
const juegosRouter = require('./routes/juegos'); 
const resenasRouter = require('./routes/resenas');

// --- 3. Middlewares
// ¡CAMBIO CLAVE AQUÍ! Se cambió el origen a 5174 para que coincida con donde corre el Frontend.
app.use(cors({
    origin: 'http://localhost:5174', 
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express.json());

// --- 4. Definición de Rutas (Endpoints)
app.use('/api/juegos', juegosRouter);
app.use('/api/resenas', resenasRouter);

// Ruta Raíz
app.get('/', (req, res) => {
    res.send('Gametracker está funcionando con éxito');
});

// --- 5. Conexión a la Base de Datos
mongoose.connect(process.env.DB_URI)
    .then(() => {
        console.log('Conectado exitosamente a MongoDB Atlas'); 

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch(error => {
        console.error("Error al conectar a MongoDB:", error.message);
        process.exit(1); 
    });

module.exports = app;