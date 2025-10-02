const bcrypt = require("bcryptjs");
const userRepository = require("../repositories/userRepository");
const saltRounds = 10;

async function registrarUsuario(data) {
    const userExiste = await userRepository.obtenerPorEmail(data.email);
    if (userExiste) throw new Error("El usuario ya existe");

    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    const user = await userRepository.crearUser({ ...data, password: hashedPassword});

    return user;

}

const jwt = require("jsonwebtoken");    
const jwtSecret = process.env.JWT_SECRET;

const secret_key = jwtSecret;

async function loginUsuario(data) {
    const usuario = await userRepository.obtenerPorEmail(data.email);
    if (!usuario) throw new Error("Usuario no encontrado");

    const passwordCorrecto = await bcrypt.compare(data.password, usuario.password);

    const payload = { userId: usuario.id, email: usuario.email};

    //Firmar

    const token = jwt.sign(payload, secret_key, { expiresIn: "1h" });

    return token;
}


module.exports = {
    registrarUsuario,
    loginUsuario
}