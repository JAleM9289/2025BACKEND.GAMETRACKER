const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 

const DB_URI = process.env.DB_URI; 
const PORT = process.env.PORT || 3000; 

const app = express();

// CLAVE: URL de tu Frontend desplegado en GitHub Pages.
// Asegúrate de que empieza con https://
const FRONTEND_URL = 'https://jalem9289.github.io/2025FRONTED.GAMETRACKER/'; 

const corsOptions = {
    origin: FRONTEND_URL, 
    credentials: true,
    optionsSuccessStatus: 200 
};
app.use(cors(corsOptions));

// Middleware para leer JSON
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); // Middleware extra, recomendado para formularios

// Definición de rutas
app.use('/api/games', require('./routes/juegos')); 

if (!DB_URI) {
    console.error("❌ Error: La variable de entorno DB_URI no está definida.");
    process.exit(1); 
}

mongoose.connect(DB_URI) 
    .then(() => {
        console.log('✅ Conexión exitosa a MongoDB');
        
        app.listen(PORT, () => {
            // NOTE: Render usa su propio puerto, pero el mensaje local es útil.
            console.log(`🚀 Servidor Express escuchando en el puerto ${PORT}`); 
        });
    })
    .catch(err => {
        console.error('❌ Error de conexión a MongoDB:', err.message);
        process.exit(1); 
    });