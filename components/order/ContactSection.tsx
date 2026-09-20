'use client';

import { useState } from 'react';
import { Mail, MapPin, User } from 'lucide-react';
import { buildContactMailto, OWNER_EMAIL, OWNER_NAME } from '@/lib/mailto';

export default function ContactSection() {
  const [message, setMessage] = useState('');

  const mailtoHref = buildContactMailto('3D Print Inquiry', message);

  return (
    <section id="contact" className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="section-heading">Get in Touch</h2>
          <p className="mt-4 text-slate-400">
            Every order goes through email — send a model reference, your desired specs, and a
            shipping address, and you&apos;ll get a reply with pricing and timeline.
          </p>

          <dl className="mt-8 space-y-4 text-sm">
            <div className="flex items-center gap-3 text-slate-300">
              <User className="h-4 w-4 text-glow-cyan" aria-hidden />
              <dt className="sr-only">Name</dt>
              <dd>{OWNER_NAME}</dd>
            </div>
            <div className="flex items-center gap-3 text-slate-300">
              <Mail className="h-4 w-4 text-glow-cyan" aria-hidden />
              <dt className="sr-only">Email</dt>
              <dd>
                <a href={`mailto:${OWNER_EMAIL}`} className="hover:text-white">
                  {OWNER_EMAIL}
                </a>
              </dd>
            </div>
            <div className="flex items-center gap-3 text-slate-300">
              <MapPin className="h-4 w-4 text-glow-cyan" aria-hidden />
              <dt className="sr-only">Note</dt>
              <dd>Attach reference images and your shipping address to speed up your quote.</dd>
            </div>
          </dl>
        </div>

        <form
          className="glass-panel space-y-4 p-6"
          onSubmit={(e) => {
            e.preventDefault();
            window.location.href = mailtoHref;
          }}
        >
          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-medium text-white">
              Your message
            </label>
            <textarea
              id="message"
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us about the print you're after, materials, timeline..."
              className="w-full rounded-lg border border-white/15 bg-obsidian-900 px-4 py-3 text-sm text-white outline-none focus:border-glow-cyan"
            />
          </div>
          <button type="submit" className="btn-primary w-full">
            <Mail className="h-4 w-4" aria-hidden />
            Open in Email
          </button>
        </form>
      </div>
    </section>
  );
}
