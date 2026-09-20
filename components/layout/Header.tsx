'use client';

import { useState } from 'react';
import { Heart, Menu, X, Sparkles } from 'lucide-react';
import { useWishlist } from '@/lib/wishlist';
import WishlistDrawer from '@/components/wishlist/WishlistDrawer';

const NAV_LINKS = [
  { href: '#gallery', label: 'Gallery' },
  { href: '#custom-orders', label: 'Custom Orders' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const { ids } = useWishlist();

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-obsidian-950/70 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-2 font-display text-lg font-semibold text-white">
          <Sparkles className="h-5 w-5 text-glow-cyan" aria-hidden />
          Skynet Exhibits
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setWishlistOpen(true)}
            className="relative rounded-full border border-white/10 p-2.5 text-slate-200 transition-colors hover:bg-white/10"
            aria-label={`Open wishlist (${ids.length} saved)`}
          >
            <Heart className="h-5 w-5" aria-hidden />
            {ids.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-glow-cyan text-[10px] font-bold text-obsidian-950">
                {ids.length}
              </span>
            )}
          </button>

          <a href="#gallery" className="btn-primary hidden sm:inline-flex">
            Explore Gallery
          </a>

          <button
            type="button"
            className="rounded-full border border-white/10 p-2.5 text-slate-200 md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-white/5 px-4 py-4 md:hidden" aria-label="Mobile">
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-slate-300 hover:text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <WishlistDrawer open={wishlistOpen} onClose={() => setWishlistOpen(false)} />
    </header>
  );
}
