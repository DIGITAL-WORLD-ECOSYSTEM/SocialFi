const fs = require('fs');
const path = require('path');

// Pastas que queremos ignorar
const IGNORE_DIRS = ['node_modules', '.next', '.git', 'dist', 'build', '.turbo'];

function generateTree(dir) {
    const stats = fs.statSync(dir);
    const name = path.basename(dir);

    if (IGNORE_DIRS.includes(name)) {
        return null;
    }

    if (stats.isDirectory()) {
        const children = fs.readdirSync(dir)
            .map(child => generateTree(path.join(dir, child)))
            .filter(child => child !== null);
        return { name, type: 'directory', children };
    } else {
        return { name, type: 'file' };
    }
}

const tree = generateTree(__dirname);
console.log(JSON.stringify(tree, null, 2));
