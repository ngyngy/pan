const { execSync } = require('child_process');
const out = execSync('npm run build:seo', { encoding: 'utf8' });
console.log(out);
