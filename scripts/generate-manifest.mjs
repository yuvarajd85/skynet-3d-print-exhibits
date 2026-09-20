import { mkdir, readdir, copyFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { groupProductFiles } from './manifest-lib.mjs';

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const sourceDir = path.join(rootDir, 'resources', 'pics');
const publicDir = path.join(rootDir, 'public', 'pics');
const outFile = path.join(rootDir, 'data', 'manifest.generated.json');

async function blurDataURL(absPhotoPath) {
  try {
    const buf = await sharp(absPhotoPath)
      .resize(16, 16, { fit: 'inside' })
      .jpeg({ quality: 40 })
      .toBuffer();
    return `data:image/jpeg;base64,${buf.toString('base64')}`;
  } catch {
    return null;
  }
}

async function main() {
  const filenames = await readdir(sourceDir);
  const products = groupProductFiles(filenames);

  await mkdir(publicDir, { recursive: true });

  const entries = [];
  for (const product of products) {
    const files = [product.photo, product.video].filter(Boolean);
    for (const file of files) {
      await copyFile(path.join(sourceDir, file), path.join(publicDir, file));
    }
    entries.push({
      id: product.id,
      photo: product.photo ? `/pics/${product.photo}` : null,
      video: product.video ? `/pics/${product.video}` : null,
      blurDataURL: product.photo
        ? await blurDataURL(path.join(sourceDir, product.photo))
        : null,
    });
  }

  await mkdir(path.dirname(outFile), { recursive: true });
  await writeFile(outFile, JSON.stringify(entries, null, 2));

  const known = await import('../data/products.ts').catch(() => null);
  if (known?.products) {
    const missing = entries
      .map((e) => e.id)
      .filter((id) => !(id in known.products));
    if (missing.length) {
      console.warn(
        `[generate-manifest] ${missing.length} product(s) missing hand-authored metadata in data/products.ts:\n  ${missing.join('\n  ')}`
      );
    }
  }

  console.log(`[generate-manifest] wrote ${entries.length} products to ${path.relative(rootDir, outFile)}`);
}

main();
