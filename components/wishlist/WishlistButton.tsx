'use client';

import { Heart } from 'lucide-react';
import { useWishlist } from '@/lib/wishlist';

export default function WishlistButton({ productId, className = '' }: { productId: string; className?: string }) {
  const { isSaved, toggle } = useWishlist();
  const saved = isSaved(productId);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        toggle(productId);
      }}
      aria-pressed={saved}
      aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'}
      className={`rounded-full border border-white/15 bg-obsidian-950/60 p-2 backdrop-blur transition-colors hover:bg-white/10 ${className}`}
    >
      <Heart
        className={`h-4 w-4 transition-colors ${saved ? 'fill-glow-cyan text-glow-cyan' : 'text-white'}`}
        aria-hidden
      />
    </button>
  );
}
