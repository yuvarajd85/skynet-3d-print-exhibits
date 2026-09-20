import manifest from '@/data/manifest.generated.json';
import { products as productMeta } from '@/data/products';
import { mergeProducts } from '@/lib/getProducts';
import { ProductsProvider } from '@/lib/products-context';
import Header from '@/components/layout/Header';
import Hero from '@/components/hero/Hero';
import TrustBadges from '@/components/layout/TrustBadges';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import About from '@/components/layout/About';
import CustomOrderWizard from '@/components/order/CustomOrderWizard';
import ContactSection from '@/components/order/ContactSection';
import Footer from '@/components/layout/Footer';
import type { ManifestEntry } from '@/data/types';

export default function Home() {
  const products = mergeProducts(manifest as ManifestEntry[], productMeta);

  return (
    <ProductsProvider products={products}>
      <Header />
      <main>
        <Hero />
        <TrustBadges />
        <GalleryGrid products={products} />
        <About />
        <CustomOrderWizard />
        <ContactSection />
      </main>
      <Footer />
    </ProductsProvider>
  );
}
