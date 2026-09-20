'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  panelClassName?: string;
  align?: 'center' | 'right';
}

export default function Modal({
  open,
  onClose,
  title,
  children,
  panelClassName = 'max-w-2xl',
  align = 'center',
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    triggerRef.current = document.activeElement as HTMLElement;
    panelRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    // ponytail: global scroll-lock counter, not a stack — fine since modals here nest at most 2 deep.
    const lockCount = Number(document.body.dataset.modalLock ?? '0') + 1;
    document.body.dataset.modalLock = String(lockCount);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      const remaining = Number(document.body.dataset.modalLock ?? '1') - 1;
      document.body.dataset.modalLock = String(remaining);
      if (remaining <= 0) document.body.style.overflow = '';
      triggerRef.current?.focus?.();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div
          className={`fixed inset-0 z-50 flex ${align === 'right' ? 'justify-end' : 'items-center justify-center p-4'}`}
        >
          <motion.div
            className="absolute inset-0 bg-obsidian-950/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            tabIndex={-1}
            className={`glass-panel relative z-10 max-h-[90vh] w-full overflow-y-auto p-6 shadow-2xl outline-none sm:p-8 ${
              align === 'right' ? 'h-full max-h-none rounded-none rounded-l-2xl' : ''
            } ${panelClassName}`}
            initial={align === 'right' ? { x: '100%' } : { opacity: 0, scale: 0.96, y: 12 }}
            animate={align === 'right' ? { x: 0 } : { opacity: 1, scale: 1, y: 0 }}
            exit={align === 'right' ? { x: '100%' } : { opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 className="font-display text-xl font-semibold text-white">{title}</h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="rounded-full p-2 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
