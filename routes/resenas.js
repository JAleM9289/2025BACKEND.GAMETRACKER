const express = require('express');
const router = express.Router();
const Resena = require('../models/Resena.js'); // Importamos el modelo de Reseña
const Juego = require('../models/Juego.js');   // Importamos el modelo de Juego

/*
 * ===============================================
 * RUTA 1: CREAR una nueva reseña (POST)
 * ===============================================
 * @route   POST /api/resenas
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

/*
 * ===============================================
 * RUTA 2: LEER todas las reseñas (GET)
 * ===============================================
 * @route   GET /api/resenas
 * @desc    Obtener todas tus reseñas
 */
router.get('/', async (req, res) => {
  try {
    const resenas = await Resena.find();
    res.json(resenas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/*
 * ===============================================
 * RUTA 3: LEER reseñas de un juego específico (GET)
 * ===============================================
 * @route   GET /api/resenas/juego/:juegoId
 * @desc    Reseñas de un juego específico
 */
router.get('/juego/:juegoId', async (req, res) => {
  try {
    const resenas = await Resena.find({ juegoId: req.params.juegoId });
    res.json(resenas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/*
 * ===============================================
 * RUTA 4: ACTUALIZAR una reseña (PUT)
 * ===============================================
 * @route   PUT /api/resenas/:id
 * @desc    Actualizar reseña existente
 */
router.put('/:id', async (req, res) => {
  try {
    const resenaActualizada = await Resena.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!resenaActualizada) {
      return res.status(404).json({ message: 'Reseña no encontrada' });
    }
    res.json(resenaActualizada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/*
 * ===============================================
 * RUTA 5: ELIMINAR una reseña (DELETE)
 * ===============================================
 * @route   DELETE /api/resenas/:id
 * @desc    Eliminar reseña
 */
router.delete('/:id', async (req, res) => {
  try {
    const resenaEliminada = await Resena.findByIdAndDelete(req.params.id);
    if (!resenaEliminada) {
      return res.status(404).json({ message: 'Reseña no encontrada' });
    }
    res.json({ message: 'Reseña eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;