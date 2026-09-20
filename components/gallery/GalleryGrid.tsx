'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import type { Category, Product } from '@/data/types';
import CategoryFilter from '@/components/gallery/CategoryFilter';
import ProductCard from '@/components/gallery/ProductCard';
import ModelInspector from '@/components/product/ModelInspector';

export default function GalleryGrid({ products }: { products: Product[] }) {
  const [category, setCategory] = useState<Category | 'All'>('All');
  const [active, setActive] = useState<Product | null>(null);

  const filtered = useMemo(
    () => (category === 'All' ? products : products.filter((p) => p.category === category)),
    [products, category]
  );

  return (
    <section id="gallery" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="section-heading">The Gallery</h2>
          <p className="mt-2 max-w-xl text-slate-400">
            {products.length} models printed and photographed. Filter by category, tap any piece for
            details, or save it to your wishlist.
          </p>
        </div>
        <CategoryFilter active={category} onChange={setCategory} />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: (i % 8) * 0.03 }}
          >
            <ProductCard product={product} onOpen={setActive} />
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-16 text-center text-slate-500">No models in this category yet.</p>
      )}

      <ModelInspector key={active?.id} product={active} open={active !== null} onClose={() => setActive(null)} />
    </section>
  );
}
