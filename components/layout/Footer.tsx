import { Instagram, Mail, Sparkles } from 'lucide-react';
import { OWNER_EMAIL, OWNER_NAME } from '@/lib/mailto';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-obsidian-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div>
            <div className="flex items-center gap-2 font-display text-lg font-semibold text-white">
              <Sparkles className="h-5 w-5 text-glow-cyan" aria-hidden />
              Skynet Exhibits
            </div>
            <p className="mt-2 max-w-sm text-sm text-slate-500">
              Custom 3D printing by {OWNER_NAME}. Every model in the gallery is a real print,
              ready to be made in your material and color.
            </p>
          </div>

          <div className="flex flex-col gap-2 text-sm text-slate-400">
            <a href={`mailto:${OWNER_EMAIL}`} className="flex items-center gap-2 hover:text-white">
              <Mail className="h-4 w-4" aria-hidden /> {OWNER_EMAIL}
            </a>
            <span className="flex items-center gap-2 text-slate-500" title="Add your Instagram link here">
              <Instagram className="h-4 w-4" aria-hidden /> Social links coming soon
            </span>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/5 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {OWNER_NAME}. All rights reserved.</p>
          <p>PLA · PETG · Resin — printed, inspected, and shipped with care.</p>
        </div>
      </div>
    </footer>
  );
}
