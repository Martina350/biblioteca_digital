const prestamoServices = require('../services/libroServices');
const prestamoRepository = require('../repositories/prestamoRepository');

async function getPrestamos(req, res) {
    try {
        const usuarioId = req.user.userId;
        const prestamos = await prestamoServices.getPrestamos(usuarioId);
        console.log(prestamos);
        res.status(200).json({message: "prestamos obtenidas correctamente", data: prestamos });
    } catch (error) {
        console.error("Error fetching prestamos:", error);
        res.status(500).json({ message: error.message });
    }
}

async function entregarLibro(req, res) {
    try {
        const usuarioId = req.user.userId; 
        const rol = req.user.rol; 
        const id = parseInt(req.params.id);
       
        const prestamo = await prestamoServices.entregarLibro(id, usuarioId, rol);
        res.status(200).json({ message: "eliminado correctamente", data: prestamo });
    } catch (error) {
        console.error("Error deleting tarea:", error);
        res.status(500).json({ message: error.message });
    }
}

async function pedirLibro(req, res) {
    try {
        const nuevoLibro = await prestamoServices.pedirLibro(req.body, req.user.userId);
        res.status(201).json({ message: "Libro pedido correctamente", data: nuevoLibro });
    } catch (error) {
        console.error("Error creating tarea:", error);
        res.status(500).json({ message: error.message });
    }
}

async function historial(req, res) {
  const idUsuario = req.usuario.id;
  try {
    const historialusuarios = await prestamoRepository.historialPrestamo(
      parseInt(idUsuario)
    );
    res.json(historialusuarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
    getPrestamos, 
    entregarLibro, 
    pedirLibro,
    historial
};
