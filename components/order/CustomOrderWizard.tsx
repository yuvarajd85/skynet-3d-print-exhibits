'use client';

import { useState } from 'react';
import { CheckCircle2, FileUp, Mail, PackageCheck, Wrench } from 'lucide-react';
import { buildContactMailto } from '@/lib/mailto';

const STEPS = [
  {
    icon: FileUp,
    title: 'Share your specs or CAD file',
    body: 'Email your STL/STEP/OBJ file, or describe what you need — dimensions, reference photos, intended use.',
  },
  {
    icon: Wrench,
    title: 'Get a material & finish plan',
    body: 'Dharani reviews feasibility and recommends material, infill, and finish based on strength, detail, and budget.',
  },
  {
    icon: PackageCheck,
    title: 'Print & quality check',
    body: 'Your model is printed, inspected, and cleaned up — supports removed, surfaces finished as needed.',
  },
  {
    icon: CheckCircle2,
    title: 'Ship to your door',
    body: 'Packed carefully and shipped with tracking to the address you provide.',
  },
];

export default function CustomOrderWizard() {
  const [openStep, setOpenStep] = useState(0);

  const mailtoHref = buildContactMailto(
    'Custom Print Request',
    'Hi Dharani,\n\nI would like a custom 3D print. Details below:\n\nDescription:\nDimensions:\nMaterial preference:\nReference files: (attached)\nShipping address:\n'
  );

  return (
    <section id="custom-orders" className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h2 className="section-heading">Custom Order Engine</h2>
        <p className="mx-auto mt-3 max-w-2xl text-slate-400">
          Full custom printing based on your own specs or CAD uploads — here&apos;s how it works.
        </p>
      </div>

      <ol className="space-y-4">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          const open = openStep === i;
          return (
            <li key={step.title} className="glass-panel overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenStep(open ? -1 : i)}
                aria-expanded={open}
                className="flex w-full items-center gap-4 p-5 text-left"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-glow-cyan/10 text-glow-cyan">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="flex-1">
                  <span className="block text-xs font-medium uppercase tracking-wide text-slate-500">
                    Step {i + 1}
                  </span>
                  <span className="font-display text-lg font-semibold text-white">{step.title}</span>
                </span>
              </button>
              {open && <p className="px-5 pb-5 pl-[4.5rem] text-slate-400">{step.body}</p>}
            </li>
          );
        })}
      </ol>

      <div className="mt-10 text-center">
        <a href={mailtoHref} className="btn-primary">
          <Mail className="h-4 w-4" aria-hidden />
          Start Your Custom Order
        </a>
      </div>
    </section>
  );
}
