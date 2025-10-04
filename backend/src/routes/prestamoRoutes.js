const express = require('express');
const router = express.Router(); // Crear instancia del router de Express

const prestamoController = require('../controllers/prestamoController');
// Importar middleware desde la carpeta correcta y con los nombres que usa el proyecto
const { verificarToken } = require('../middelware/authMiddelware');
const { autorizarRoles } = require('../middelware/rolMiddelware');

// Definir las rutas de préstamos
router.get('/prestamo', verificarToken, prestamoController.getPrestamos);
router.post('/prestamo', verificarToken, prestamoController.pedirLibro);
router.delete('/prestamo/:id', verificarToken, autorizarRoles('admin'), prestamoController.entregarLibro);
router.get('/prestamo/history', verificarToken, prestamoController.historial);

module.exports = router;