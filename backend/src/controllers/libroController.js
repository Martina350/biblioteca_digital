const libroService = require('../services/libroServices')

async function getLibros(req, res) {
    try {
        const libros = await libroService.getLibros();
        console.log(libros);
        res.status(200).json({message: "Libros obtenidas correctamente", data: libros});
    } 
    catch (error) {
        res.status(500).json({ message: error.message });  
    }
}
async function deleteLibro(req, res) {
    try {
        const usuarioId = req.user.userId;
        const libroId = req.params.id;
        const libro = await libroService.deleteLibro(libroId, usuarioId);
        res.status(200).json({message: "Libro eliminada correctamente", data:libro})
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
}

async function createLibro(req, res) {
    try {
        const usuarioId = req.user.userId;
        const libro = await libroService.createLibro(req.body, usuarioId);
        res.status(200).json({message: "Libro creada correctamente", data:libro})
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
}

async function updateLibro(req, res) {
    try {
        const libroId = req.params.id;
        const data = req.body;
        const libroActualizado = await libroService.updateLibro(libroId, data);
        res.status(200).json({ message: "Libro actualizada correctamente", data: libroActualizado });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getLibros,
    deleteLibro,
    createLibro
    ,updateLibro
}