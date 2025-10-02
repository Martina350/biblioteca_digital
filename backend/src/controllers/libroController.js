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

module.exports = {
    getLibros
}