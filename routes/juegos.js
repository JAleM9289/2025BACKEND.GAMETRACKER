const express = require('express');
const router = express.Router();
const Juego = require('../models/Juego.js'); // Importamos nuestro "plano" (Modelo)

/*
 * ===============================================
 * RUTA 1: CREAR un nuevo juego (POST)
 * ===============================================
 * @route   POST /api/juegos
 * @desc    Crear un nuevo juego en la biblioteca
 */
router.post('/', async (req, res) => {
  try {
    const nuevoJuego = new Juego(req.body);
    const juegoGuardado = await nuevoJuego.save();
    res.status(201).json(juegoGuardado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/*
 * ===============================================
 * RUTA 2: LEER todos los juegos (GET)
 * ===============================================
 * @route   GET /api/juegos
 * @desc    Obtener todos los juegos de la biblioteca
 */
router.get('/', async (req, res) => {
  try {
    const juegos = await Juego.find();
    res.json(juegos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/*
 * ===============================================
 * RUTA 3: LEER un juego específico (GET por ID)
 * ===============================================
 * @route   GET /api/juegos/:id
 * @desc    Obtener un juego específico por su ID
 */
router.get('/:id', async (req, res) => {
  try {
    const juego = await Juego.findById(req.params.id);
    if (!juego) {
      return res.status(404).json({ message: 'Juego no encontrado' });
    }
    res.json(juego);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/*
 * ===============================================
 * RUTA 4: ACTUALIZAR un juego (PUT)
 * ===============================================
 * @route   PUT /api/juegos/:id
 * @desc    Actualizar un juego existente por su ID
 */
router.put('/:id', async (req, res) => {
  try {
    // 1. Buscamos el juego por su ID y lo actualizamos
    //    req.body tiene la información nueva (ej: "completado": true)
    //    { new: true } le dice a Mongoose que nos devuelva el juego *después* de actualizarlo
    const juegoActualizado = await Juego.findByIdAndUpdate(
      req.params.id, // El ID del juego a actualizar
      req.body,      // Los nuevos datos a guardar
      { new: true, runValidators: true } // Opciones
    );

    // 2. Verificamos si el juego existía
    if (!juegoActualizado) {
      return res.status(404).json({ message: 'Juego no encontrado' });
    }

    // 3. Devolvemos el juego ya actualizado
    res.json(juegoActualizado);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/*
 * ===============================================
 * RUTA 5: ELIMINAR un juego (DELETE)
 * ===============================================
 * @route   DELETE /api/juegos/:id
 * @desc    Eliminar un juego por su ID
 */
router.delete('/:id', async (req, res) => {
  try {
    // 1. Buscamos el juego por su ID y lo eliminamos
    const juegoEliminado = await Juego.findByIdAndDelete(req.params.id);

    // 2. Verificamos si el juego existía
    if (!juegoEliminado) {
      return res.status(404).json({ message: 'Juego no encontrado' });
    }

    // 3. Devolvemos un mensaje de confirmación
    res.json({ message: 'Juego eliminado exitosamente' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;