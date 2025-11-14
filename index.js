const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const DB_URI = process.env.DB_URI;
const PORT = process.env.PORT || 3000;

const app = express();

// --- CORS ---
const allowedOrigins = [
    'https://jalem9289.github.io',
    'https://jalem9289.github.io/',
    'https://jalem9289.github.io/2025FRONTED.GAMETRACKER',
    'https://jalem9289.github.io/2025FRONTED.GAMETRACKER/'
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error("CORS BLOCK: Origin no permitido"));
    },
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- ESTO ES LO QUE FALTABA ---
// Rutas correctas para tu backend
app.use('/api/juegos', require('./routes/juegos'));
app.use('/api/resenas', require('./routes/resenas'));

// --- Conexión a Mongo ---
if (!DB_URI) {
    console.error("❌ Error: La variable de entorno DB_URI no está definida.");
    process.exit(1);
}

mongoose.connect(DB_URI)
    .then(() => {
        console.log('✅ Conexión exitosa a MongoDB');
        app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
    })
    .catch(err => {
        console.error('❌ Error al conectar MongoDB:', err);
        process.exit(1);
    });
