// ============================================================================
// Build All Versions Script
// Genera 4 versiones del CV en carpetas separadas para GitHub Pages
// ============================================================================

import { build } from 'astro';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { existsSync, mkdirSync, rmSync, cpSync } from 'fs';
import { writeFile } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_ROOT = resolve(__dirname, '..');

// GitHub Pages: el sitio se publica en https://roleitor.github.io/cv-plantilla/
const SITE_URL = process.env.SITE_URL || 'https://roleitor.github.io/cv-plantilla';
const BASE_PATH = process.env.BASE_PATH || '/cv-plantilla';

const CV_VERSIONS = [
  { key: 'fullstack', label: '🎯 Full Stack' },
  { key: 'arquitectura', label: '🏗️ Arquitectura' },
  { key: 'angular_backend', label: '💻 Angular & Backend' },
  { key: 'institucion_publica', label: '🏛️ Institución Pública' },
];

async function buildVersion(versionKey, outputDir) {
  console.log(`\n🔨 Building version: ${versionKey} → ${outputDir}`);

  try {
    // La versión se resuelve en build-time desde process.env.CV_VERSION
    process.env.CV_VERSION = versionKey;

    await build({
      root: PROJECT_ROOT,
      site: SITE_URL,
      base: BASE_PATH,
      outDir: outputDir,
      // Astro resuelve configFile respecto a `root`, debe ser una ruta relativa
      configFile: 'astro.config.mjs',
    });
    console.log(`✅ ${versionKey} built successfully`);
  } catch (error) {
    console.error(`❌ Error building ${versionKey}:`, error);
    throw error;
  }
}

async function copyDir(sourceDir, targetDir, label) {
  // Limpiar directorio destino si existe
  if (existsSync(targetDir)) {
    rmSync(targetDir, { recursive: true, force: true });
  }

  mkdirSync(targetDir, { recursive: true });
  cpSync(sourceDir, targetDir, { recursive: true });
  console.log(`📁 Copied ${label}`);
}

async function createVersionIndex() {
  const links = CV_VERSIONS.map(
    ({ key, label }) =>
      `<li><a href="${BASE_PATH}/${key}/">${label}</a> <code>/${key}/</code></li>`
  ).join('\n      ');

  const indexHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CV - Rolando Moises Quispe Mendoza</title>
  <meta name="description" content="Versiones del CV profesional de Rolando Moises Quispe Mendoza">
  <style>
    body { font-family: system-ui, sans-serif; text-align: center; padding: 2rem; line-height: 1.8; }
    a { color: #2563eb; }
    code { background: #f3f4f6; padding: .1rem .35rem; border-radius: .25rem; }
    ul { list-style: none; padding: 0; }
  </style>
</head>
<body>
  <h1>CV - Rolando Moises Quispe Mendoza</h1>
  <p><a href="${BASE_PATH}/">Ver CV principal (Full Stack)</a></p>
  <h2>Versiones</h2>
  <ul>
      ${links}
  </ul>
</body>
</html>
`;

  const distDir = resolve(PROJECT_ROOT, 'astro-dist');
  if (!existsSync(distDir)) mkdirSync(distDir, { recursive: true });

  // Se escribe en versions.html: NO sobrescribe el index.html del build principal
  await writeFile(resolve(distDir, 'versions.html'), indexHtml);
  console.log('📄 Created versions.html index');
}

async function main() {
  console.log('🚀 Starting multi-version build...\n');

  const tempBuildDir = resolve(PROJECT_ROOT, '.astro-build-temp');
  const distDir = resolve(PROJECT_ROOT, 'astro-dist');

  try {
    // 1) Compilar cada versión en una carpeta temporal.
    //    Astro vacía el outDir en cada build, por eso nada se escribe
    //    directamente en astro-dist hasta tener todos los resultados.
    for (const { key } of CV_VERSIONS) {
      const versionOutDir = resolve(tempBuildDir, key);
      await buildVersion(key, versionOutDir);
    }

    // 2) Compilar la versión por defecto (fullstack) también en temporal
    console.log('\n🔨 Building default version (fullstack)...');
    process.env.CV_VERSION = 'fullstack';
    const defaultOutDir = resolve(tempBuildDir, '_default');
    await build({
      root: PROJECT_ROOT,
      site: SITE_URL,
      base: BASE_PATH,
      outDir: defaultOutDir,
      configFile: 'astro.config.mjs',
    });

    // 3) Publicar: primero la versión por defecto en la raíz y luego
    //    cada versión en su propia subcarpeta.
    await copyDir(defaultOutDir, distDir, 'default (fullstack) → astro-dist/');

    for (const { key } of CV_VERSIONS) {
      await copyDir(resolve(tempBuildDir, key), resolve(distDir, key), `${key} → astro-dist/${key}/`);
    }

    // 4) Índice con los enlaces a cada versión
    await createVersionIndex();

    // 5) Limpieza
    if (existsSync(tempBuildDir)) {
      rmSync(tempBuildDir, { recursive: true, force: true });
    }

    console.log('\n✅ All versions built successfully!');
    console.log('📂 Output structure:');
    console.log('   astro-dist/                     ← Default (fullstack)');
    console.log('   astro-dist/versions.html        ← Índice de versiones');
    console.log('   astro-dist/fullstack/           ← Full Stack version');
    console.log('   astro-dist/arquitectura/        ← Arquitectura version');
    console.log('   astro-dist/angular_backend/     ← Angular & Backend version');
    console.log('   astro-dist/institucion_publica/ ← Institución Pública version');
  } catch (error) {
    console.error('\n❌ Build failed:', error);
    process.exit(1);
  }
}

main();