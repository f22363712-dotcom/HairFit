import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const root = new URL('../', import.meta.url);
const output = new URL('public/vendor/mesh-cut/worker.js', root);
await mkdir(new URL('./', output), { recursive: true });
await build({
  entryPoints: [fileURLToPath(new URL('src/workers/reconstructed-mesh-cut.worker.js', root))],
  outfile: fileURLToPath(output),
  bundle: true,
  format: 'iife',
  platform: 'browser',
  target: ['es2020'],
  minify: true,
  legalComments: 'eof',
});
