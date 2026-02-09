const fs = require('fs');
const path = require('path');

// Pastas que não interessam para a análise técnica
const ignoreDirs = [
    'node_modules', '.git', '.next', 'dist', 
    'build', 'out', '.vercel', 'public/assets', 
    'vendor', '.vscode', '.idea'
];

const outputFileName = 'estrutura_diretorios_app.txt';
let treeOutput = `=== ESTRUTURA COMPLETA DO PROJETO ===\n`;
treeOutput += `Gerado em: ${new Date().toLocaleString()}\n`;
treeOutput += `Raiz: ${path.basename(process.cwd())}\n`;
treeOutput += `${'='.repeat(40)}\n\n`;

function generateTree(dir, prefix = '') {
    try {
        const files = fs.readdirSync(dir).sort((a, b) => {
            const aPath = path.join(dir, a);
            const bPath = path.join(dir, b);
            const aIsDir = fs.statSync(aPath).isDirectory();
            const bIsDir = fs.statSync(bPath).isDirectory();
            if (aIsDir && !bIsDir) return -1;
            if (!aIsDir && bIsDir) return 1;
            return a.localeCompare(b);
        });

        files.forEach((file, index) => {
            if (ignoreDirs.includes(file)) return;

            const filePath = path.join(dir, file);
            const isDirectory = fs.statSync(filePath).isDirectory();
            const isLast = index === files.length - 1;

            treeOutput += `${prefix}${isLast ? '└── ' : '├── '}${file}${isDirectory ? '/' : ''}\n`;

            if (isDirectory) {
                generateTree(filePath, prefix + (isLast ? '    ' : '│   '));
            }
        });
    } catch (err) {
        treeOutput += `${prefix} [Erro ao acessar: ${err.message}]\n`;
    }
}

console.log('🌳 Gerando mapa do projeto...');
generateTree(process.cwd());

try {
    fs.writeFileSync(outputFileName, treeOutput);
    console.log(`\n✅ Árvore salva em: ${outputFileName}`);
    console.log(`\nAgora é só copiar o conteúdo desse arquivo e colar aqui para começarmos a análise!`);
} catch (err) {
    console.error(`❌ Erro ao salvar arquivo: ${err.message}`);
}
