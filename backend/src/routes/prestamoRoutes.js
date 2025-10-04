const express = require('express');
const router = express.Router(); // Crear instancia del router de Express

const prestamoController = require('../controllers/prestamoController');
// Importar middleware de autenticación
const { verifyToken } = require('../middleware/authMiddleware');
// Importar middleware de autorización por roles
const autorizarRoles = require('../middleware/rolMiddleware');

// Definir las rutas de gestión de tareas
router.get('/prestamo',verifyToken ,prestamoController.getPrestamos); // Obtener todas las tareas del usuario (requiere autenticación)
router.post('/tarprestamoeas',verifyToken,prestamoController.pedirLibro); // Crear nueva tarea (requiere autenticación)
router.delete('/prestamo/:id',verifyToken, autorizarRoles("admin") ,prestamoController.entregarLibro); // Eliminar tarea (requiere autenticación y rol admin)
router.get("/prestamo/history", validarToken, prestamoController.historial);

// Exportar el router de tareas
module.exports = router;