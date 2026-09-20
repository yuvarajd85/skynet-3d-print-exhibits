import { Layers, Palette, Ruler } from 'lucide-react';

const POINTS = [
  {
    icon: Layers,
    title: 'Full custom capability',
    body: 'Send your own CAD file (STL/STEP/OBJ) or a reference image — every model here started as a real print request.',
  },
  {
    icon: Palette,
    title: 'Material & finish choice',
    body: 'PLA, PETG, or resin, in the infill and color that fits your project — art piece, prototype, or wearable.',
  },
  {
    icon: Ruler,
    title: 'Direct, personal service',
    body: 'No storefront middleman — you work directly with Dharani from quote to shipping.',
  },
];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="mb-12 max-w-2xl">
        <h2 className="section-heading">About the Studio</h2>
        <p className="mt-4 text-slate-400">
          Dharani Natarajan runs a hands-on 3D printing studio for makers, designers, and
          collectors — printing from a curated physical gallery or fully custom to your
          specification.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        {POINTS.map((point) => {
          const Icon = point.icon;
          return (
            <div key={point.title} className="glass-panel p-6">
              <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-glow-violet/10 text-glow-violet">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="font-display text-lg font-semibold text-white">{point.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{point.body}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
