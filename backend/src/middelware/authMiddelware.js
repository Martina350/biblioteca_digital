const jwt = require('jsonwebtoken');
const blacklistRepo = require('../repositories/tokenBlacklistRepository');
const secret_key = process.env.JWT_SECRET;


async function verificarToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({message: "No se proporciono el token"});


    const token = authHeader.split(" ")[1];

    if (!token) return res.status(401).json({message: "No se proporciono el token modificado"});


    const revocado = await blacklistRepo.estaRevocado(token);
    if (revocado) return res.status(401).json({message: "Token revocado"});
    try {
        const decoded = jwt.verify(token, secret_key);
        req.user = decoded;
        next();
    }
    catch(error) {
        return res.status(401).json({message: "Token invalido"});
    }
}

module.exports = {
    verificarToken
}