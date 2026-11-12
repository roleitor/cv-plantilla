// ============================================================================
// Harness de verificación de plantillas - CV Astro
// Comprueba que las 8 plantillas existen, que /ats/ no tiene emoji en el DOM
// y que los PDF impresos no superan el límite de páginas acordado.
// Uso: node scripts/verify-templates.mjs
// ============================================================================

import { existsSync, readFileSync, mkdirSync, statSync, rmSync } from 'node:fs';
import { execFile } from 'node:child_process';
import { createServer } from 'node:http';
import { extname, join, resolve, normalize } from 'node:path';
import { tmpdir } from 'node:os';
import { randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PROJECT_ROOT = resolve(__dirname, '..');

// ============================================================================
// Configuración
// ============================================================================

export const TEMPLATES = [
  'vertical',
  'classic',
  'two-column',
  'timeline',
  'ats',
  'ejecutivo',
  'minimal',
  'compacto',
];

export const ROUTES = {
  vertical: '',
  classic: 'classic/',
  'two-column': 'two-column/',
  timeline: 'timeline/',
  ats: 'ats/',
  ejecutivo: 'ejecutivo/',
  minimal: 'minimal/',
  compacto: 'compacto/',
};

/** Máximo de páginas permitido en el PDF de cada plantilla. */
export const MAX_PAGES = {
  vertical: 4,
  classic: 4,
  'two-column': 4,
  timeline: 4,
  ats: 4,
  ejecutivo: 4,
  minimal: 4,
  compacto: 2,
};

const EMOJI_RE = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/u;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

// ============================================================================
// Runner de aserciones
// ============================================================================

/**
 * Acumula fallos en vez de lanzar, para reportarlos todos de una vez.
 */
export function createAssert() {
  const failures = [];
  return {
    failures,
    assert(cond, mensaje) {
      if (!cond) failures.push(mensaje);
      return cond;
    },
  };
}

// ============================================================================
// Checks
// ============================================================================

/**
 * El HTML de la plantilla existe en dist/.
 */
export function checkRoute(distDir, route) {
  const file = route ? join(distDir, route, 'index.html') : join(distDir, 'index.html');
  if (!existsSync(file)) {
    return { ok: false, mensaje: `falta la plantilla ${route || '/'}` };
  }
  return { ok: true, mensaje: `plantilla ${route || '/'} presente` };
}

/**
 * El HTML no contiene emoji (los parsers ATS leen el texto del DOM).
 */
export function checkNoEmoji(html) {
  const found = html.match(EMOJI_RE);
  if (found) {
    const unicos = [...new Set(found)].join(' ');
    return { ok: false, mensaje: `emoji en el DOM: ${unicos}` };
  }
  return { ok: true, mensaje: 'sin emoji en el DOM' };
}

/**
 * El HTML contiene la cadena esperada.
 */
export function checkContains(html, needle) {
  if (!html.includes(needle)) {
    return { ok: false, mensaje: `falta "${needle}" en el HTML` };
  }
  return { ok: true, mensaje: `contiene "${needle}"` };
}

/**
 * El PDF no supera el máximo de páginas.
 */
export function checkPageCount(pdfPath, max) {
  if (!existsSync(pdfPath)) {
    return { ok: false, mensaje: `no se generó el PDF ${pdfPath}` };
  }
  const buf = readFileSync(pdfPath);
  // `/Type /Page` sin la 's' de `/Type /Pages`
  const matches = buf.toString('latin1').match(/\/Type\s*\/Page\b/g);
  const pages = matches ? matches.length : 0;
  if (pages === 0) {
    return { ok: false, mensaje: 'no se pudo leer el conteo de páginas del PDF' };
  }
  if (pages > max) {
    return { ok: false, mensaje: `${pages} páginas (máximo ${max})` };
  }
  return { ok: true, mensaje: `${pages} páginas (máximo ${max})` };
}

// ============================================================================
// Servidor estático y renderizado
// ============================================================================

/**
 * Servir un directorio en http://127.0.0.1:<puerto>.
 */
export function serveDir(dir, port = 0) {
  const root = resolve(dir);
  return new Promise((resolvePromise, reject) => {
    const server = createServer((req, res) => {
      const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
      let filePath = normalize(join(root, urlPath));
      if (!filePath.startsWith(root)) {
        res.writeHead(403).end('Prohibido');
        return;
      }
      if (existsSync(filePath) && extname(filePath) === '') {
        filePath = join(filePath, 'index.html');
      }
      if (!existsSync(filePath) || !statSync(filePath).isFile()) {
        res.writeHead(404).end('No encontrado');
        return;
      }
      res.writeHead(200, { 'Content-Type': MIME[extname(filePath)] || 'application/octet-stream' });
      res.end(readFileSync(filePath));
    });

    server.on('error', reject);
    server.listen(port, '127.0.0.1', () => {
      const { port: actual } = server.address();
      resolvePromise({
        url: `http://127.0.0.1:${actual}`,
        close: () => new Promise((r) => server.close(r)),
      });
    });
  });
}

/**
 * Localizar el binario de Chrome headless.
 */
export function findChrome() {
  const candidates = [
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/snap/bin/chromium',
  ];
  for (const candidate of candidates) {
    if (existsSync(candidate)) return candidate;
  }
  return null;
}

/**
 * Renderizar una URL a PDF con Chrome headless.
 */
/**
 * Renderizar una URL a PDF con Chrome headless.
 *
 * Es asíncrona a propósito: con execFileSync el event loop de Node queda
 * bloqueado y el servidor HTTP estático (mismo proceso) no puede responder
 * a Chrome, que se queda esperando la página para siempre.
 */
export async function renderPdf(url, outPath, chrome = findChrome()) {
  if (!chrome) {
    return { ok: false, mensaje: 'Chrome no encontrado (se omiten los checks de páginas)', skipped: true };
  }
  // Perfil aislado por invocación: sin él, varias ejecuciones seguidas de
  // Chrome headless se bloquean esperando el lock del perfil por defecto.
  const profile = join(tmpdir(), `cv-chrome-${process.pid}-${randomUUID()}`);
  try {
    await new Promise((resolvePromise, reject) => {
      execFile(
        chrome,
        [
          '--headless',
          '--disable-gpu',
          '--no-sandbox',
          '--no-first-run',
          '--no-default-browser-check',
          '--disable-dev-shm-usage',
          '--disable-extensions',
          '--disable-background-networking',
          `--user-data-dir=${profile}`,
          '--no-pdf-header-footer',
          `--print-to-pdf=${outPath}`,
          '--virtual-time-budget=8000',
          url,
        ],
        { timeout: 120000 },
        (error) => (error ? reject(error) : resolvePromise())
      );
    });
    return { ok: true, mensaje: `PDF generado en ${outPath}` };
  } catch (error) {
    return { ok: false, mensaje: `error al renderizar ${url}: ${error.message}` };
  } finally {
    rmSync(profile, { recursive: true, force: true });
  }
}

// ============================================================================
// Runner principal
// ============================================================================

/**
 * Ejecuta todos los checks. Devuelve el informe.
 */
export async function verifyTemplates(options = {}) {
  const distDir = options.distDir || join(PROJECT_ROOT, 'dist');
  const pdfDir = options.pdfDir || join(PROJECT_ROOT, '.superpowers-pdf');
  const results = [];
  const { assert, failures } = createAssert();

  if (!existsSync(distDir)) {
    return {
      ok: false,
      results: [{ name: 'dist', ok: false, mensaje: `no existe ${distDir}; ejecuta npm run build` }],
      failures: [`no existe ${distDir}`],
    };
  }

  // 1) Las 8 rutas existen
  for (const template of TEMPLATES) {
    const route = ROUTES[template];
    const result = checkRoute(distDir, route);
    results.push({ name: `ruta /${route}`, ...result });
    assert(result.ok, result.mensaje);
  }

  // 2) /ats/ no debe tener emoji en el DOM
  const atsFile = join(distDir, 'ats', 'index.html');
  if (existsSync(atsFile)) {
    const html = readFileSync(atsFile, 'utf8');
    const result = checkNoEmoji(html);
    results.push({ name: 'ats sin emoji', ...result });
    assert(result.ok, result.mensaje);
  }

  // 3) Conteo de páginas de los PDF
  mkdirSync(pdfDir, { recursive: true });
  const server = await serveDir(distDir);
  const chrome = findChrome();
  try {
    for (const template of TEMPLATES) {
      const route = ROUTES[template];
      // Sin este guarda, una plantilla inexistente devuelve 404 y Chrome
      // genera un PDF de 1 página: un falso "pasa".
      if (!existsSync(route ? join(distDir, route, 'index.html') : join(distDir, 'index.html'))) {
        continue;
      }
      const url = `${server.url}/${route}`;
      const pdfPath = join(pdfDir, `${template}.pdf`);
      const rendered = await renderPdf(url, pdfPath, chrome);
      if (rendered.skipped) {
        results.push({ name: `pdf ${template}`, ok: true, mensaje: rendered.mensaje, skipped: true });
        continue;
      }
      if (!rendered.ok) {
        results.push({ name: `pdf ${template}`, ...rendered });
        assert(false, rendered.mensaje);
        continue;
      }
      const result = checkPageCount(pdfPath, MAX_PAGES[template]);
      results.push({ name: `pdf ${template}`, ...result });
      assert(result.ok, `pdf ${template}: ${result.mensaje}`);
    }
  } finally {
    await server.close();
  }

  return { ok: failures.length === 0, results, failures };
}

async function main() {
  const report = await verifyTemplates();

  for (const result of report.results) {
    const mark = result.skipped ? '○' : result.ok ? '✓' : '✗';
    console.log(`  ${mark} ${result.name.padEnd(28)} ${result.mensaje}`);
  }

  console.log('');
  if (report.ok) {
    console.log(`✅ Todas las comprobaciones han pasado (${report.results.length})`);
  } else {
    console.log(`❌ ${report.failures.length} comprobación(es) fallida(s):`);
    for (const failure of report.failures) console.log(`   · ${failure}`);
  }

  process.exit(report.ok ? 0 : 1);
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))) {
  main().catch((error) => {
    console.error('Error inesperado:', error);
    process.exit(1);
  });
}
