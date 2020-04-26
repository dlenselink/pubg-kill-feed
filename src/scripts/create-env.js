const fs = require('fs');
console.log(process.env.PUBG_API_KEY);
fs.writeFileSync('./.env', `PUBG_API_KEY=${process.env.PUBG_API_KEY}\n`);
