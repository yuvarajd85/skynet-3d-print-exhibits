'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import type { Product } from '@/data/types';
import WishlistButton from '@/components/wishlist/WishlistButton';

export default function ProductCard({
  product,
  onOpen,
}: {
  product: Product;
  onOpen: (product: Product) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function resetTilt() {
    x.set(0);
    y.set(0);
    setHovering(false);
  }

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={resetTilt}
      onClick={() => onOpen(product)}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpen(product)}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${product.name}`}
      className="group relative aspect-square transform-gpu cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-obsidian-800 shadow-lg transition-shadow duration-300 hover:shadow-glow"
    >
      {product.photo && (
        <Image
          src={product.photo}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className={`object-cover transition-transform duration-500 ${hovering && product.video ? 'opacity-0' : 'opacity-100'} group-hover:scale-110`}
          placeholder={product.blurDataURL ? 'blur' : 'empty'}
          blurDataURL={product.blurDataURL ?? undefined}
        />
      )}

      {product.video && (
        <video
          src={product.video}
          muted
          loop
          playsInline
          autoPlay={hovering}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
            hovering ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian-950/90 via-obsidian-950/10 to-transparent" />

      <div className="absolute right-3 top-3">
        <WishlistButton productId={product.id} />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-glow-cyan">{product.category}</p>
        <h3 className="font-display text-lg font-semibold text-white">{product.name}</h3>
      </div>
    </motion.div>
  );
}
