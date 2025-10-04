const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main(){
  const regs = await prisma.tokenRevocado.findMany({ orderBy: { id: 'desc' }, take: 10 });
  console.log('Last blacklist entries:');
  regs.forEach(r => console.log(r));
  await prisma.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });