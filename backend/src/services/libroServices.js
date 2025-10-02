const libroRepository = require("../repositories/libroRepository");

async function getLibros() {
    return await libroRepository.getLibros();
}

module.exports = {
    getLibros
}
