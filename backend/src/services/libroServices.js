const libroRepository = require("../repositories/libroRepository");

async function getLibros() {
    return await libroRepository.getLibros();
}

async function deleteLibro(id, usuarioId) {
    return await libroRepository.deleteLibro(id, usuarioId);
}

async function createLibro(data, usuarioId) {
    return await libroRepository.createLibro(data, usuarioId)
}

async function updateLibro(id, data) {
    return await libroRepository.updateLibro(id, data);
}
module.exports = {
    getLibros,
    deleteLibro,
    createLibro,
    updateLibro
}
