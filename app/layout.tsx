import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { WishlistProvider } from '@/lib/wishlist';
import './globals.css';

const bodyFont = Inter({ subsets: ['latin'], variable: '--font-body' });
const displayFont = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
  title: 'Skynet 3D Print Exhibits — Custom 3D Printing by Dharani Natarajan',
  description:
    'Browse a curated gallery of custom 3D prints and commission your own — art, prototypes, wearables, and miniatures printed on demand.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${displayFont.variable} dark`}>
      <body className="font-sans">
        <WishlistProvider>{children}</WishlistProvider>
      </body>
    </html>
  );
}
