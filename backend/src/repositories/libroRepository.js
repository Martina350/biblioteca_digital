const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getLibros() {
    return await prisma.libro.findMany();
    
}

module.exports = {
    getLibros
}

