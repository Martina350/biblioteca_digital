const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

async function agregarToken(token) {
    // Use createMany with skipDuplicates to avoid Unique Constraint errors
    // This is safer under concurrent requests than upsert which can still
    // race and cause duplicate-insert failures.
    const result = await prisma.tokenRevocado.createMany({
        data: [{ token }],
        skipDuplicates: true
    });
    return result;
}

async function estaRevocado(token) {
    const registro = await prisma.tokenRevocado.findUnique({where: {token}})
    return !!registro
}

module.exports = {
    agregarToken,
    estaRevocado
}