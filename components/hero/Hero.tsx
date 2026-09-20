'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';

const HeroScene = dynamic(() => import('@/components/hero/HeroScene'), { ssr: false });

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[90vh] items-center overflow-hidden">
      <div className="absolute inset-0" aria-hidden>
        <HeroScene />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-obsidian-950/40 to-obsidian-950" />

      <div className="relative mx-auto max-w-4xl px-4 py-32 text-center sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-glow-cyan"
        >
          Custom 3D Printing, On Demand
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-4xl font-bold tracking-tight text-white sm:text-6xl"
        >
          Prints that go from
          <span className="bg-gradient-to-r from-glow-cyan to-glow-violet bg-clip-text text-transparent">
            {' '}
            screen to shelf
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-slate-300"
        >
          Browse a curated gallery of art, prototypes, wearables, and miniatures — every piece
          printed by hand and ready to customize in your material and color.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a href="#gallery" className="btn-primary">
            Explore the Gallery
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
          <a href="#contact" className="btn-ghost">
            <Mail className="h-4 w-4" aria-hidden />
            Talk to Dharani
          </a>
        </motion.div>
      </div>
    </section>
  );
}
