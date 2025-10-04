const libroRepository = require('../repositories/prestamoRepository');

// Servicio para obtener todas las tareas de un usuario
async function getPrestamos(usuarioId) {
    // Delegar la operación al repositorio de tareas
    return await libroRepository.getPrestamos(usuarioId);
}

// Servicio para eliminar una tarea específica
async function entregarLibro(id, usuarioId, rol) {
    // Delegar la operación al repositorio con control de permisos
    return await libroRepository.entregarLibro(id, usuarioId, rol);
}
// Servicio para crear una nueva tarea
async function pedirLibro(data, usuarioId) {
    // Delegar la operación al repositorio de tareas
    return await libroRepository.pedirLibro(data, usuarioId);
}

// Exportar los servicios de tareas
module.exports = {
    getPrestamos, // Función para obtener tareas de un usuario
    pedirLibro, // Función para crear una nueva tarea
    entregarLibro // Función para eliminar una tarea
};