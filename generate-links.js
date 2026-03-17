const guests = require('./guests.json');
const baseUrl = 'https://juliantorres92.github.io/boda-invitaciones';

console.log('=== ENLACES DE INVITACIÓN ===\n');

guests.forEach(guest => {
    const url = `${baseUrl}/index.html?f=${guest.id}`;
    console.log(`${guest.name}:`);
    console.log(`  ${url}\n`);
});

console.log(`Total: ${guests.length} invitados`);
console.log(`Cupos totales: ${guests.reduce((sum, g) => sum + g.cupos, 0)}`);