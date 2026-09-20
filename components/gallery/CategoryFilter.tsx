'use client';

import { CATEGORIES, type Category } from '@/data/types';

export default function CategoryFilter({
  active,
  onChange,
}: {
  active: Category | 'All';
  onChange: (category: Category | 'All') => void;
}) {
  const options: (Category | 'All')[] = ['All', ...CATEGORIES];

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          aria-pressed={active === option}
          className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
            active === option
              ? 'border-glow-cyan bg-glow-cyan/10 text-glow-cyan'
              : 'border-white/10 text-slate-300 hover:bg-white/5'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
