const prestamoServices = require('../services/libroServices');

// Controlador para obtener todas las tareas del usuario autenticado
async function getPrestamos(req, res) {
    try {
        // Obtener el ID del usuario desde el token JWT decodificado
        const usuarioId = req.user.userId;
        // Llamar al servicio para obtener las tareas del usuario
        const prestamos = await prestamoServices.getPrestamos(usuarioId);
        // Log para debugging
        console.log(prestamos);
        // Devolver respuesta exitosa con los prestamos
        res.status(200).json({message: "prestamos obtenidas correctamente", data: prestamos });
    } catch (error) {
        // Log del error para debugging
        console.error("Error fetching prestamos:", error);
        // Devolver error del servidor
        res.status(500).json({ message: error.message });
    }
}

// Controlador para eliminar una tarea específica
async function entregarLibro(req, res) {
    try {
        // Obtener información del usuario desde el token JWT
        const usuarioId = req.user.userId; // ID del usuario
        const rol = req.user.rol; // Rol del usuario (usuario/admin)
        // Obtener el ID de la tarea desde los parámetros de la URL
        const id = parseInt(req.params.id);
       
        const prestamo = await prestamoServices.entregarLibro(id, usuarioId, rol);
        // Devolver respuesta exitosa
        res.status(200).json({ message: "eliminado correctamente", data: prestamo });
    } catch (error) {
        // Log del error para debugging
        console.error("Error deleting tarea:", error);
        // Devolver error del servidor
        res.status(500).json({ message: error.message });
    }
}

// Controlador para crear una nueva tarea
async function pedirLibro(req, res) {
    try {
        // Llamar al servicio para crear la tarea con los datos del body y el ID del usuario
        const nuevoLibro = await prestamoServices.pedirLibro(req.body, req.user.userId);
        // Devolver respuesta exitosa con la tarea creada
        res.status(201).json({ message: "Libro pedido correctamente", data: nuevoLibro });
    } catch (error) {
        // Log del error para debugging
        console.error("Error creating tarea:", error);
        // Devolver error del servidor
        res.status(500).json({ message: error.message });
    }
}

// Exportar las funciones del controlador de tareas
module.exports = {
    getPrestamos, // Función para obtener todas las tareas del usuario
    entregarLibro, // Función para eliminar una tarea específica
    pedirLibro // Función para crear una nueva tarea
};
