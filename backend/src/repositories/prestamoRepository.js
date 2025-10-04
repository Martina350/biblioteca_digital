const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient(); 


async function getPrestamos(usuarioId) {
  return await prisma.prestamo.findMany({
    where: { usuarioId: usuarioId },
    include: { libro: true }
  });
}

async function entregarLibro(id, usuarioId, rol) {
  const prestamoId = parseInt(id);
  if (isNaN(prestamoId)) {
    throw new Error('ID de préstamo inválido');
  }

  // Comprobar que el préstamo existe
  const prestamo = await prisma.prestamo.findUnique({ where: { id: prestamoId } });
  if (!prestamo) {
    throw new Error('Préstamo no encontrado');
  }

  // Si no es admin, validar que el préstamo pertenezca al usuario
  if (rol !== 'admin' && prestamo.usuarioId !== usuarioId) {
    throw new Error('No autorizado para eliminar este préstamo');
  }

  // Borrar el préstamo por id
  return await prisma.prestamo.delete({ where: { id: prestamoId } });
}

// Función para crear una nueva tarea asociada a un usuario
async function pedirLibro(data, usuarioId) {
    // Asignar el ID del usuario a los datos de la tarea
    data.usuarioId = usuarioId;
    // Crear la tarea en la base de datos
    return await prisma.prestamo.create({
        data: {
            ...data,
            usuarioId: usuarioId
        }
    });
}

async function historialPrestamo(usuarioId) {
  const prestamos = await prisma.prestamo.findMany({
    where: { usuarioId: usuarioId },
    include: { libro: true }
  });

  const historial = await prisma.historial.findMany({
    where: { usuarioId: usuarioId },
    include: { libro: true, usuario: true }
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