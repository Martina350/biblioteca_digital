const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getLibros() {
    return await prisma.libro.findMany();
    
}
async function deleteLibro(id, usuarioId) {
    const libroId = parseInt(id);
    if (isNaN(libroId)) {
        throw new Error("ID de libro inválido");
    }

    // Buscar la libro primero
    const libro = await prisma.libro.findFirst({
        where: {
            id: libroId,
            usuarioId: usuarioId
        }
    });

    if (!libro) {
        throw new Error("Libro no encontrada o no pertenece al usuario");
    }

    // Borrar la libro
    await prisma.libro.delete({
        where: {
            id: libroId
        }
    });

    return libro; // devolver la libro eliminada
}
async function createLibro(data, usuarioId) {
    return await prisma.libro.create({ data: { ...data, usuarioId: usuarioId } });
}

async function updateLibro(id, data) {
    const libroId = parseInt(id);
    if (isNaN(libroId)) {
        throw new Error("ID de libro inválido");
    }

    const libroExistente = await prisma.libro.findUnique({ where: { id: libroId } });
    if (!libroExistente) {
        throw new Error("Libro no encontrada");
    }

    const actualizado = await prisma.libro.update({
        where: { id: libroId },
        data: { ...data }
    });

    return actualizado;
}

module.exports = {
    getLibros,
    deleteLibro,
    createLibro
    ,updateLibro
}

