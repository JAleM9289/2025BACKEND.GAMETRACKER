// models/Resena.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definimos el "plano" de Reseñas (Reviews)
const ResenaSchema = new Schema(
  {
    // Este es el campo MÁS IMPORTANTE.
    // Conecta esta reseña con un juego específico.
    juegoId: {
      type: Schema.Types.ObjectId, // Almacena un ID de Mongoose
      ref: 'Juego', // Le dice a Mongoose que este ID pertenece al modelo 'Juego'
      required: true,
    },

    // Campos del README
    puntuacion: {
      type: Number,
      min: 1, // Puntuación de 1 a 5
      max: 5,
      required: true,
    },
    textoReseña: { type: String },
    horasJugadas: { type: Number, default: 0 },
    dificultad: { type: String }, // "Fácil", "Normal", "Difícil"
    recomendaria: { type: Boolean },
  },
  {
    // El README pide fechaCreacion y fechaActualizacion.
    // 'timestamps: true' hace esto por nosotros.
    timestamps: true,
  }
);

// Compilamos el modelo
// Mongoose creará la colección 'resenas' en la base de datos
const Resena = mongoose.model('Resena', ResenaSchema);

module.exports = Resena;