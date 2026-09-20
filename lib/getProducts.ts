import type { ManifestEntry, Product, ProductMeta } from '../data/types';
import { withBasePath } from './basePath.ts';

const FALLBACK_META: ProductMeta = {
  name: 'Untitled Model',
  category: 'Prototypes',
  materials: ['PLA', 'PETG', 'Resin'],
  turnaround: '5-7 business days',
  blurb: 'A print from the gallery, ready for custom material and color selection.',
};

export function mergeProducts(
  manifest: ManifestEntry[],
  meta: Record<string, ProductMeta>
): Product[] {
  return manifest.map((entry) => ({
    ...FALLBACK_META,
    ...meta[entry.id],
    id: entry.id,
    photo: entry.photo ? withBasePath(entry.photo) : null,
    video: entry.video ? withBasePath(entry.video) : null,
    blurDataURL: entry.blurDataURL,
  }));
}
