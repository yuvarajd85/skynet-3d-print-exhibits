import { BadgeCheck, ShieldCheck, Timer, Truck } from 'lucide-react';

const BADGES = [
  { icon: ShieldCheck, label: 'Quality checked before shipping' },
  { icon: Timer, label: '5-7 day typical turnaround' },
  { icon: BadgeCheck, label: 'PLA · PETG · Resin available' },
  { icon: Truck, label: 'Tracked shipping included' },
];

export default function TrustBadges() {
  return (
    <div className="border-y border-white/5 bg-white/[0.02]">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-8 sm:grid-cols-4 sm:px-6 lg:px-8">
        {BADGES.map((badge) => {
          const Icon = badge.icon;
          return (
            <div key={badge.label} className="flex items-center gap-2.5 text-sm text-slate-300">
              <Icon className="h-4 w-4 shrink-0 text-glow-cyan" aria-hidden />
              {badge.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}
