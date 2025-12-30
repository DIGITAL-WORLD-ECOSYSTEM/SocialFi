import { Project } from 'ts-morph';
import fs from 'fs-extra';
import * as glob from 'glob';
import madge from 'madge';
import path from 'path';
import { cruise } from 'dependency-cruiser';

const ROOT = process.cwd();
const SRC = path.join(ROOT, 'src');
const OUT = path.join(ROOT, 'audit-report');

await fs.ensureDir(OUT);

/* -------------------------------------------------- */
/* 1. ÁRVORE REAL DO PROJETO */
/* -------------------------------------------------- */
const tree = glob.sync('src/**/*', { nodir: true }).join('\n');
await fs.writeFile(`${OUT}/structure.tree.txt`, tree);

/* -------------------------------------------------- */
/* 2. ANÁLISE DE IMPORTS (AST REAL) */
/* -------------------------------------------------- */
const project = new Project({
  tsConfigFilePath: 'tsconfig.json',
});

project.addSourceFilesAtPaths('src/**/*.{ts,tsx}');

const importGraph = {};

project.getSourceFiles().forEach((file) => {
  const filePath = file.getFilePath().replace(ROOT, '');
  importGraph[filePath] = file
    .getImportDeclarations()
    .map((i) => i.getModuleSpecifierValue());
});

await fs.writeJSON(`${OUT}/imports-graph.json`, importGraph, { spaces: 2 });

/* -------------------------------------------------- */
/* 3. ARQUIVOS ZUMBI (NÃO IMPORTADOS) */
/* -------------------------------------------------- */
const allFiles = Object.keys(importGraph);
const imported = new Set();

Object.values(importGraph).flat().forEach((imp) => {
  allFiles.forEach((file) => {
    if (file.includes(imp)) imported.add(file);
  });
});

const zombies = allFiles.filter(
  (file) =>
    !imported.has(file) &&
    !file.includes('page.tsx') &&
    !file.includes('layout.tsx')
);

await fs.writeJSON(`${OUT}/zombie-files.json`, zombies, { spaces: 2 });

/* -------------------------------------------------- */
/* 4. DEPENDÊNCIAS REAIS x PACKAGE.JSON */
/* -------------------------------------------------- */
const depResult = await cruise(['src'], {
  exclude: 'node_modules',
  combinedDependencies: true,
});

await fs.writeJSON(
  `${OUT}/dependencies.json`,
  depResult.output.summary,
  { spaces: 2 }
);

/* -------------------------------------------------- */
/* 5. AUTH AUDIT (FOCO EM SEGURANÇA) */
/* -------------------------------------------------- */
const authFiles = glob.sync('src/auth/**/*.{ts,tsx}');
let authReport = `# 🔐 Auth Audit Report\n\n`;

authFiles.forEach((file) => {
  const content = fs.readFileSync(file, 'utf-8');

  if (content.includes('localStorage')) {
    authReport += `⚠️ localStorage usado em: ${file}\n`;
  }

  if (content.includes('sessionStorage')) {
    authReport += `⚠️ sessionStorage usado em: ${file}\n`;
  }

  if (content.includes('role') && content.includes('admin')) {
    authReport += `🚨 Possível elevação de privilégio: ${file}\n`;
  }

  if (content.includes('useEffect') && !content.includes('dependency')) {
    authReport += `⚠️ useEffect sem dependências claras: ${file}\n`;
  }
});

await fs.writeFile(`${OUT}/auth-analysis.md`, authReport);

/* -------------------------------------------------- */
/* 6. GRAFO VISUAL (MADGE) */
/* -------------------------------------------------- */
const madgeResult = await madge(SRC, { tsConfig: 'tsconfig.json' });
await fs.writeJSON(`${OUT}/madge-graph.json`, madgeResult.obj(), { spaces: 2 });

/* -------------------------------------------------- */
/* 7. RELATÓRIO FINAL */
/* -------------------------------------------------- */
const finalReport = `
# 📊 AUDITORIA COMPLETA DO FRONTEND

## ✔️ Escopo
- Estrutura real
- Imports e dependências
- Arquivos zumbi
- Autenticação
- Riscos arquiteturais

## ⚠️ Próximos Passos Seguros
1. Remover arquivos zumbi (um por um)
2. Consolidar providers de auth
3. Normalizar storage de token
4. Introduzir tenant layer
5. Refatorar sem alterar contratos públicos

Todos os dados detalhados estão nos arquivos desta pasta.
`;

await fs.writeFile(`${OUT}/final-report.md`, finalReport);

console.log('✅ Auditoria concluída com sucesso!');
