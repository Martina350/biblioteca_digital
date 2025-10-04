const express = require('express');
const router = express.Router();
const { verificarToken } = require("../middelware/authMiddelware");
const libroController = require('../controllers/libroController');
const { autorizarRoles } = require('../middelware/rolMiddelware');


router.get('/libros', verificarToken, libroController.getLibros)
router.delete('/libro/:id', verificarToken, autorizarRoles('admin'), libroController.deleteLibro);
router.post('/libros', verificarToken,autorizarRoles('admin'), libroController.createLibro);
router.put('/libros/:id', verificarToken, autorizarRoles('admin'), libroController.updateLibro);

module.exports = router;