const express = require('express');
const router = express.Router();
const { verificarToken } = require("../middelware/authMiddelware");
const libroController = require('../controllers/libroController');


router.get('/libros', verificarToken, libroController.getLibros)

module.exports = router;