const express = require('express');
const router = express.Router();
const Resena = require('../models/Resena.js'); // Importamos el modelo de Reseña
const Juego = require('../models/Juego.js');   // Importamos el modelo de Juego (lo necesitaremos)

/*
 * ===============================================
 * RUTA 1: CREAR una nueva reseña (POST)
 * ===============================================
 * @route   POST /api/reseñas
 * @desc    Escribir una nueva reseña para un juego
 */
router.post('/', async (req, res) => {
  try {
    // 1. Verificamos si el juego (juegoId) al que se asocia la reseña existe.
    const juego = await Juego.findById(req.body.juegoId);
    if (!juego) {
      return res.status(404).json({ message: 'Juego no encontrado' });
    }

    // 2. Si el juego existe, creamos la nueva reseña
    const nuevaResena = new Resena(req.body);

    // 3. Guardamos la reseña en la base de datos
    const resenaGuardada = await nuevaResena.save();

    // 4. Respondemos con éxito (201)
    res.status(201).json(resenaGuardada);

  } catch (error) {
    // Si falta un campo obligatorio (como puntuacion o juegoId)
    res.status(400).json({ message: error.message });
  }
});

// Exportamos el router para que index.js pueda usarlo
module.exports = router;