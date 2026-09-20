'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Clock, Package, ZoomIn, ZoomOut } from 'lucide-react';
import type { Product } from '@/data/types';
import Modal from '@/components/ui/Modal';
import WishlistButton from '@/components/wishlist/WishlistButton';
import OrderBuilderModal from '@/components/product/OrderBuilderModal';

export default function ModelInspector({
  product,
  open,
  onClose,
}: {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}) {
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState('50% 50%');
  const [orderOpen, setOrderOpen] = useState(false);
  const viewerRef = useRef<HTMLDivElement>(null);

  if (!product) return null;

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    const rect = viewerRef.current?.getBoundingClientRect();
    if (rect) {
      const originX = ((e.clientX - rect.left) / rect.width) * 100;
      const originY = ((e.clientY - rect.top) / rect.height) * 100;
      setOrigin(`${originX}% ${originY}%`);
    }
    setZoomed((z) => !z);
  }

  return (
    <>
      <Modal open={open} onClose={onClose} title={product.name} panelClassName="max-w-4xl">
        <div className="grid gap-6 lg:grid-cols-2">
          <div
            ref={viewerRef}
            onClick={product.photo ? handleClick : undefined}
            className={`relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-obsidian-800 ${
              product.photo ? 'cursor-zoom-in' : ''
            }`}
          >
            {product.photo && (
              <Image
                src={product.photo}
                alt={product.name}
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-contain transition-transform duration-300"
                style={{ transform: zoomed ? 'scale(2.2)' : 'scale(1)', transformOrigin: origin }}
                placeholder={product.blurDataURL ? 'blur' : 'empty'}
                blurDataURL={product.blurDataURL ?? undefined}
              />
            )}
            {!product.photo && product.video && (
              <video src={product.video} controls className="h-full w-full object-contain" />
            )}
            {product.photo && (
              <span className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-obsidian-950/70 px-2.5 py-1 text-xs text-white">
                {zoomed ? <ZoomOut className="h-3.5 w-3.5" /> : <ZoomIn className="h-3.5 w-3.5" />}
                {zoomed ? 'Click to reset' : 'Click to zoom'}
              </span>
            )}
            <div className="absolute right-3 top-3">
              <WishlistButton productId={product.id} />
            </div>
          </div>

          <div className="flex flex-col">
            {product.photo && product.video && (
              <video src={product.video} controls muted loop className="mb-4 aspect-video w-full rounded-lg" />
            )}

            <p className="text-xs font-medium uppercase tracking-wide text-glow-cyan">{product.category}</p>
            <p className="mt-2 text-slate-300">{product.blurb}</p>

            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex items-center gap-2 text-slate-300">
                <Package className="h-4 w-4 text-glow-cyan" aria-hidden />
                <dt className="font-medium text-white">Materials:</dt>
                <dd>{product.materials.join(', ')}</dd>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="h-4 w-4 text-glow-cyan" aria-hidden />
                <dt className="font-medium text-white">Turnaround:</dt>
                <dd>{product.turnaround}</dd>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <dt className="font-medium text-white">Reference:</dt>
                <dd className="font-mono text-xs text-slate-400">{product.id}</dd>
              </div>
            </dl>

            <button type="button" onClick={() => setOrderOpen(true)} className="btn-primary mt-8">
              Order This Model
            </button>
          </div>
        </div>
      </Modal>

      <OrderBuilderModal product={product} open={orderOpen} onClose={() => setOrderOpen(false)} />
    </>
  );
}
