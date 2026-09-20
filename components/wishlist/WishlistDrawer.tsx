'use client';

import { useState } from 'react';
import Image from 'next/image';
import { HeartOff } from 'lucide-react';
import { useWishlist } from '@/lib/wishlist';
import { useProducts } from '@/lib/products-context';
import Modal from '@/components/ui/Modal';
import OrderBuilderModal from '@/components/product/OrderBuilderModal';
import type { Product } from '@/data/types';

export default function WishlistDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { ids, toggle } = useWishlist();
  const products = useProducts();
  const [orderProduct, setOrderProduct] = useState<Product | null>(null);

  const saved = products.filter((p) => ids.includes(p.id));

  return (
    <>
      <Modal open={open} onClose={onClose} title="Your Wishlist" align="right" panelClassName="max-w-md">
        {saved.length === 0 ? (
          <p className="text-sm text-slate-400">
            Nothing saved yet — tap the heart on any model in the gallery to add it here.
          </p>
        ) : (
          <ul className="space-y-4">
            {saved.map((product) => (
              <li key={product.id} className="glass-panel flex items-center gap-3 p-3">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-obsidian-800">
                  {product.photo && (
                    <Image
                      src={product.photo}
                      alt={product.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                      placeholder={product.blurDataURL ? 'blur' : 'empty'}
                      blurDataURL={product.blurDataURL ?? undefined}
                    />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">{product.name}</p>
                  <p className="text-xs text-slate-400">{product.category}</p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1.5">
                  <button
                    type="button"
                    onClick={() => setOrderProduct(product)}
                    className="rounded-full bg-glow-cyan px-3 py-1.5 text-xs font-medium text-obsidian-950"
                  >
                    Order
                  </button>
                  <button
                    type="button"
                    onClick={() => toggle(product.id)}
                    aria-label={`Remove ${product.name} from wishlist`}
                    className="flex items-center gap-1 text-xs text-slate-400 hover:text-white"
                  >
                    <HeartOff className="h-3.5 w-3.5" aria-hidden />
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Modal>

      <OrderBuilderModal
        key={orderProduct?.id}
        product={orderProduct}
        open={orderProduct !== null}
        onClose={() => setOrderProduct(null)}
      />
    </>
  );
}
