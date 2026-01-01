
const fs = require('fs');
const path = require('path');

const ROOT_SRC = path.join(__dirname, 'src');

// MANIFESTO DA ARQUITETURA DEFINITIVA
const MASTER_PLAN = {
  'actions': ['blog-ssr.ts', 'blog.ts', 'mappers/blog-mapper.ts'],
  'app/post': ['page.tsx', 'layout.tsx', '[title]/page.tsx'],
  'schemas': ['blog-zod.ts'],
  'sections/blog/components': ['featured.tsx', 'authors.tsx', 'community.tsx', 'video.tsx', 'banner.tsx', 'post-search.tsx', 'post-sort.tsx'],
  'sections/blog/details': ['post-comment-item.tsx', 'post-comment-list.tsx', 'post-details-toolbar.tsx', 'post-details-hero.tsx'],
  'sections/blog/management': ['post-create-edit-form.tsx', 'post-create-view.tsx', 'post-details-preview.tsx', 'post-edit-view.tsx'],
  'sections/blog/item': ['item.tsx', 'item-horizontal.tsx', 'list.tsx', 'list-horizontal.tsx', 'recent.tsx', 'trending.tsx', 'skeleton.tsx'],
  'sections/blog/view': ['post-details-view.tsx', 'post-list-home-view.tsx', 'post-list-view.tsx']
};

const ISSUES = { missing: [], misplaced: [], brokenImports: [], boundaries: [] };

function checkIntegrity() {
  console.log("🛠️  INICIANDO AUDITORIA FINAL: ARQUITETURA DEFINITIVA V2\n");

  // 1. VALIDAR EXISTÊNCIA E LOCALIZAÇÃO
  for (const [folder, files] of Object.entries(MASTER_PLAN)) {
    files.forEach(file => {
      const fullPath = path.join(ROOT_SRC, folder, file);
      if (!fs.existsSync(fullPath)) {
        ISSUES.missing.push(`[❌] FALTANDO: ${folder}/${file}`);
      }
    });
  }

  // 2. SCAN RECURSIVO PARA BUSCAR ZUMBIS E IMPORTS
  const allFiles = [];
  function walk(dir) {
    fs.readdirSync(dir).forEach(f => {
      const p = path.join(dir, f);
      if (fs.statSync(p).isDirectory()) walk(p);
      else allFiles.push(p);
    });
  }
  walk(ROOT_SRC);

  allFiles.forEach(filePath => {
    const content = fs.readFileSync(filePath, 'utf8');
    const relativePath = path.relative(ROOT_SRC, filePath);

    // ANALISAR VIOLAÇÃO DE FRONTEIRA (View chamando Management)
    if (relativePath.includes('sections/blog/view') && content.includes('../management/')) {
      ISSUES.boundaries.push(`[⚠️] FRONTEIRA: ${relativePath} importa de /management (Vazamento de Lógica Admin)`);
    }

    // ANALISAR IMPORTS QUEBRADOS (Caminhos relativos que não existem)
    const imports = content.match(/from\s+['"](\.\.?\/.*)['"]/g);
    if (imports) {
      imports.forEach(imp => {
        const target = imp.match(/['"](.*)['"]/)[1];
        const targetPath = path.resolve(path.dirname(filePath), target);
        const exts = ['', '.tsx', '.ts', '/index.tsx', '/index.ts'];
        const exists = exts.some(ext => fs.existsSync(targetPath + ext));
        if (!exists) ISSUES.brokenImports.push(`[🔥] IMPORT QUEBRADO em ${relativePath}: ${target}`);
      });
    }
  });

  // --- RELATÓRIO ---
  console.log("=== 📜 RESULTADO DA AUDITORIA ===");
  
  if (ISSUES.missing.length > 0) {
    console.log("\n🚩 ARQUIVOS NÃO ENCONTRADOS:");
    ISSUES.missing.forEach(m => console.log(m));
  } else { console.log("✅ Todos os arquivos estão em seus lugares."); }

  if (ISSUES.brokenImports.length > 0) {
    console.log("\n🚩 ERROS DE IMPORTAÇÃO (CAMINHOS RELATIVOS):");
    ISSUES.brokenImports.forEach(i => console.log(i));
  } else { console.log("✅ Nenhuma quebra de importação detectada."); }

  if (ISSUES.boundaries.length > 0) {
    console.log("\n🚩 VIOLAÇÃO DE REGRAS DE ARQUITETURA:");
    ISSUES.boundaries.forEach(b => console.log(b));
  } else { console.log("✅ Fronteiras entre Admin e Público estão protegidas."); }

  console.log("\n--- FIM DA AUDITORIA ---");
}

checkIntegrity();
