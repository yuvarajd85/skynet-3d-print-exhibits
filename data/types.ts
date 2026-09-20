export const CATEGORIES = ['Art', 'Prototypes', 'Wearables', 'Miniatures'] as const;
export type Category = (typeof CATEGORIES)[number];

export const MATERIALS = ['PLA', 'PETG', 'Resin'] as const;
export type Material = (typeof MATERIALS)[number];

export interface ProductMeta {
  name: string;
  category: Category;
  materials: Material[];
  turnaround: string;
  blurb: string;
}

export interface ManifestEntry {
  id: string;
  photo: string | null;
  video: string | null;
  blurDataURL: string | null;
}

export interface Product extends ProductMeta {
  id: string;
  photo: string | null;
  video: string | null;
  blurDataURL: string | null;
}
