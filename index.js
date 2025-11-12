// index.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Para habilitar la comunicación con el frontend

// --- Configuración de Variables de Entorno ---
// Asegúrate de que este archivo carga las variables del .env
// Si usas nodemon con -r dotenv/config, puedes omitir esta línea:
// require('dotenv').config(); 

const DB_URI = process.env.DB_URI; 
const PORT = process.env.PORT || 3000; // Define un puerto para tu API

const app = express();

// --- 1. SOLUCIÓN CORS ---
const corsOptions = {
    // Es crucial que 'origin' sea exactamente la dirección de tu frontend (localhost:5173)
    origin: 'http://localhost:5173', 
    optionsSuccessStatus: 200 
};
app.use(cors(corsOptions));
// Si solo quieres habilitar CORS sin restricciones (MENOS SEGURO):
// app.use(cors());

// --- 2. SOLUCIÓN CONEXIÓN MONGODB ---

// Verifica que la URI se haya cargado correctamente
if (!DB_URI) {
    console.error("❌ Error: La variable de entorno DB_URI no está definida. Revisa tu archivo .env");
    process.exit(1); 
}

mongoose.connect(DB_URI) 
    .then(() => {
        console.log('✅ Conexión exitosa a MongoDB');
        
        // Solo inicia el servidor si la conexión a la DB fue exitosa
        app.listen(PORT, () => {
            console.log(`🚀 Servidor Express escuchando en el puerto ${PORT}`);
        });
    })
    .catch(err => {
        console.error('❌ Error de conexión a MongoDB:', err.message);
        // Si la conexión falla, el servidor no arranca
        process.exit(1); 
    });

// --- Middleware y Rutas ---
app.use(express.json()); // Permite a Express leer JSON en el body de las peticiones

// Define tus rutas aquí
// app.use('/api/games', require('./routes/games'));