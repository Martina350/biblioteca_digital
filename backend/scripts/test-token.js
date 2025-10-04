const { agregarToken, estaRevocado } = require('../src/repositories/tokenBlacklistRepository');

async function main(){
  const longToken = 'x'.repeat(5000);
  try{
    // Simulate concurrent revoke attempts
    await Promise.all([
      agregarToken(longToken),
      agregarToken(longToken),
      agregarToken(longToken)
    ]);
    const revoked = await estaRevocado(longToken);
    console.log('revoked?', revoked, 'createMany result should have skipped duplicates.');
  } catch(e){
    console.error('error:', e.message);
  } finally {
    process.exit();
  }
}

main();