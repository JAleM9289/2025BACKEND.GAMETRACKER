const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 

const DB_URI = process.env.DB_URI; 
const PORT = process.env.PORT || 3000; 

const app = express();

// --- Configuración Robusta de CORS ---
// URL de la subcarpeta del repo (la correcta)
const REPO_URL = 'https://jalem9289.github.io/2025FRONTED.GAMETRACKER'; 
// URL raíz (la que el navegador reporta en el error)
const ROOT_URL = 'https://jalem9289.github.io'; 

const allowedOrigins = [
    // Orígenes que aceptamos para que no haya bloqueo
    ROOT_URL, 
    REPO_URL, 
    `${REPO_URL}/`, 
    `${ROOT_URL}/`
];

const corsOptions = {
    origin: function (origin, callback) {
        // Permitir si la peticion es local o si el origen esta en la lista de permitidos
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS: ' + origin));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200 
};
app.use(cors(corsOptions));

// --- Middleware y Rutas ---
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use('/api/games', require('./routes/juegos')); 

// --- Conexión a MongoDB ---
if (!DB_URI) {
    console.error("❌ Error: La variable de entorno DB_URI no está definida.");
    process.exit(1); 
}

mongoose.connect(DB_URI) 
    .then(() => {
        console.log('✅ Conexión exitosa a MongoDB');
        
        app.listen(PORT, () => {
            console.log(`🚀 Servidor Express escuchando en el puerto ${PORT}`); 
        });
    })
    .catch(err => {
        console.error('❌ Error de conexión a MongoDB:', err.message);
        process.exit(1); 
    });