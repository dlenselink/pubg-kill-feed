const fs = require('fs');
fs.writeFileSync('./.env', `PUBG_API_KEY=${process.env.PUBG_API_KEY}\n`);
