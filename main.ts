// Hand-in program for the TagDrop Black Friday deal finder
// (competition black-friday-deal-finder-01, Node 22, standard library only).
//
// The entry itself is the static site in app/: plain files a browser opens
// with no build step and no network request, its deals held in app/data.
// This program packages that site for the grader. It copies app/ and
// screenshots/ into the output directory and writes dossier.json there with
// buildDossier from the vendored make.fun library, which is also what the
// scorer uses, so the dossier must come from the library exactly as shipped.
//
// Run it locally with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// MAKEFUN_OUTPUT_DIR stands in for the grader's /output outside the sandbox.

import { cpSync, existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const entryRoot = fileURLToPath(new URL('.', import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outputDir, { recursive: true });
cpSync(join(entryRoot, 'app'), join(outputDir, 'app'), { recursive: true });
mkdirSync(join(outputDir, 'screenshots'), { recursive: true });
if (existsSync(join(entryRoot, 'screenshots'))) {
  cpSync(join(entryRoot, 'screenshots'), join(outputDir, 'screenshots'), { recursive: true });
}

const dossier = buildDossier(outputDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
});
writeFileSync(join(outputDir, 'dossier.json'), dossier);

// Say what was handed in, so a person running this by hand can see the
// package is complete before entering it: how many screenshots went along
// and how large the dossier came out.
const screenshotCount = readdirSync(join(outputDir, 'screenshots')).length;
const dossierBytes = statSync(join(outputDir, 'dossier.json')).size;
console.log(`handed in: app/ + ${screenshotCount} screenshots, dossier.json ${dossierBytes} bytes -> ${outputDir}`);
