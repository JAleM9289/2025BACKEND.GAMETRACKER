// models/Juego.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definimos el "plano" de Videojuegos (Games)
const JuegoSchema = new Schema(
  {
    // Campos del README
    titulo: { type: String, required: true },
    genero: { type: String },
    plataforma: { type: String },
    añoLanzamiento: { type: Number },
    desarrollador: { type: String },
    imagenPortada: { type: String }, // URL de la imagen
    descripcion: { type: String },
    completado: { type: Boolean, default: false },
  },
  {
    // El README pide fechaCreacion, Mongoose lo maneja
    // automáticamente con 'timestamps: true' (añade createdAt y updatedAt)
    timestamps: true,
  }
);

// Compilamos el modelo
// Mongoose creará la colección 'juegos' en la base de datos
const Juego = mongoose.model('Juego', JuegoSchema);

module.exports = Juego;