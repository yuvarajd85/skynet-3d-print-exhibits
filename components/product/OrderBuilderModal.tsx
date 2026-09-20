'use client';

import { useState } from 'react';
import { Mail } from 'lucide-react';
import type { Product } from '@/data/types';
import { buildOrderMailto } from '@/lib/mailto';
import Modal from '@/components/ui/Modal';

const COLORS = ['Black', 'White', 'Gray', 'Red', 'Blue', 'Green', 'Natural'];

export default function OrderBuilderModal({
  product,
  open,
  onClose,
}: {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}) {
  const [material, setMaterial] = useState(product?.materials[0] ?? 'PLA');
  const [infill, setInfill] = useState(20);
  const [color, setColor] = useState('Black');

  if (!product) return null;

  const mailtoHref = buildOrderMailto({
    modelId: product.id,
    modelName: product.name,
    material,
    infill,
    color,
  });

  return (
    <Modal open={open} onClose={onClose} title={`Order: ${product.name}`}>
      <p className="mb-6 text-sm text-slate-400">
        Configure your print, then send the request by email — attach reference images and your
        shipping address there.
      </p>

      <div className="space-y-6">
        <fieldset>
          <legend className="mb-2 text-sm font-medium text-white">Material</legend>
          <div className="flex flex-wrap gap-2">
            {product.materials.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMaterial(m)}
                aria-pressed={material === m}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  material === m
                    ? 'border-glow-cyan bg-glow-cyan/10 text-glow-cyan'
                    : 'border-white/15 text-slate-300 hover:bg-white/5'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </fieldset>

        <div>
          <label htmlFor="infill" className="mb-2 block text-sm font-medium text-white">
            Infill: {infill}%
          </label>
          <input
            id="infill"
            type="range"
            min={10}
            max={100}
            step={5}
            value={infill}
            onChange={(e) => setInfill(Number(e.target.value))}
            className="w-full accent-glow-cyan"
          />
        </div>

        <div>
          <label htmlFor="color" className="mb-2 block text-sm font-medium text-white">
            Color
          </label>
          <select
            id="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full rounded-lg border border-white/15 bg-obsidian-900 px-4 py-2.5 text-sm text-white outline-none focus:border-glow-cyan"
          >
            {COLORS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <a href={mailtoHref} className="btn-primary w-full">
          <Mail className="h-4 w-4" aria-hidden />
          Request This Order by Email
        </a>
      </div>
    </Modal>
  );
}
