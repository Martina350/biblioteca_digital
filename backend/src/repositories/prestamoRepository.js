const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient(); 


async function getPrestamos(usuarioId) {
    return await prisma.Prestamo.findMany({
        where: {usuarioId: usuarioId} 
    });
}

async function entregarLibro(id, usuarioId, rol) {
    // Si el usuario es admin, puede eliminar cualquier tarea
    if (rol === 'admin') {
        return await prisma.Prestamo.delete({where: {id}});
    } else {
        // Si es usuario normal, solo puede eliminar sus propios Libros
        return await prisma.Prestamo.delete({where: {id, usuarioId}});
    }
}

// Función para crear una nueva tarea asociada a un usuario
async function pedirLibro(data, usuarioId) {
    // Asignar el ID del usuario a los datos de la tarea
    data.usuarioId = usuarioId;
    // Crear la tarea en la base de datos
    return await prisma.Prestamo.create({
        data: {
            ...data, // Datos del libro 
            usuarioId: usuarioId // ID del usuario propietario
        }
    });
}

async function historialPrestamo(usuarioId) {
  const prestamos = await prisma.prestamo.findMany({
    where: { usuarioId: usuarioId },
    include: {
      libro: true,
      usuarioId: true,
    },
  });

  const historial = await prisma.historial.findMany({
    where: { usuarioId: usuarioId },
    include: {
      libro: true,
      usuario: true,
    },
  });

  return { prestamos, historial };
}


// Exportar las funciones del repositorio de tareas
module.exports = {
    getPrestamos, // Función para obtener tareas de un usuario
    entregarLibro, // Función para eliminar una tarea
    pedirLibro, // Función para crear una nueva tarea
    historialPrestamo // Función para obtener el historial de préstamos de un usuario
};