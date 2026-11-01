import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Minus, Square, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Props {
  title: string;
  children: React.ReactNode;
  fullScreen?: boolean;
  onBack?: () => void;
}

/** Modal paper window. Esc and backdrop close it; focus is trapped while open. */
export const Window: React.FC<Props> = ({ title, children, fullScreen, onBack }) => {
  const nav = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const [max, setMax] = useState(false);
  const full = fullScreen || max;
  const close = () => nav('/');

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    ref.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'Tab' && ref.current) {
        const f = ref.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])');
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      prev?.focus?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 bottom-0 z-40 flex items-center justify-center bg-[#1F2430]/30 p-0 md:bottom-14 md:p-8" onMouseDown={(e) => e.target === e.currentTarget && close()}>
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
        className={`flex flex-col overflow-hidden border-2 border-[#1F2430] bg-[#FFFBF4] outline-none paper-shadow ${
          full ? 'h-full w-full' : 'hand-box h-[min(78vh,640px)] w-[min(940px,100%)]'
        }`}
      >
        <div className="flex items-center gap-2 border-b-2 border-[#1F2430] bg-[#F6E3C8] pl-3">
          <span className="h-3 w-3 rounded-sm border-2 border-[#1F2430] bg-[#F4A27B]" aria-hidden />
          {onBack && (
            <button onClick={onBack} className="rounded-md border-2 border-[#1F2430] bg-[#FFFBF4] px-2 text-xs font-semibold">
              Back
            </button>
          )}
          <p className="truncate py-1.5 font-hand text-xl leading-none text-[#1F2430]">{title}</p>
          <div className="ml-auto flex self-stretch">
            <button onClick={close} aria-label="Minimise window" className="grid w-11 place-items-center hover:bg-[#1F2430]/10">
              <Minus size={14} />
            </button>
            <button onClick={() => setMax((m) => !m)} aria-label={full ? 'Restore window' : 'Maximise window'} className="hidden w-11 place-items-center hover:bg-[#1F2430]/10 md:grid">
              <Square size={12} />
            </button>
            <button onClick={close} aria-label="Close window" className="grid w-11 place-items-center hover:bg-[#E8552F] hover:text-white">
              <X size={15} />
            </button>
          </div>
        </div>
        <div className="min-h-0 flex-1">{children}</div>
      </motion.div>
    </div>
  );
};
