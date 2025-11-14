const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 

const DB_URI = process.env.DB_URI; 
const PORT = process.env.PORT || 3000; 

const app = express();

// --- Configuración Final y Robusta de CORS ---
// Las URLs que GitHub Pages podría enviar como origen
const allowedOrigins = [
    'https://jalem9289.github.io', 
    'https://jalem9289.github.io/',
    'https://jalem9289.github.io/2025FRONTED.GAMETRACKER', 
    'https://jalem9289.github.io/2025FRONTED.GAMETRACKER/'
];

const corsOptions = {
    origin: function (origin, callback) {
        // Permitir si la peticion es local o si el origen esta en la lista
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            // Este error nunca debería ocurrir con la lista de arriba
            callback(new Error('CORS BLOCK: Origin no permitido: ' + origin));
        }
    },
    // Es CRUCIAL que esto esté en true si usas cookies o sesiones (o si tu Frontend lo espera)
    credentials: true,
    optionsSuccessStatus: 200 
};
app.use(cors(corsOptions));

// --- Middleware y Conexión ---
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use('/api/games', require('./routes/juegos')); 

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