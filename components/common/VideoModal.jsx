'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function VideoModal({ isOpen, onClose, videoId = 'dYv6yYpxRDM' }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 lg:p-12 overflow-hidden">
          {/* Blur Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
          />

          {/* Video Container centered & floating */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-6xl aspect-video rounded-2xl md:rounded-[32px] overflow-hidden shadow-[0_0_80px_rgba(183,237,22,0.15)] border border-white/10 z-10 bg-[#050505]"
          >
            {/* Elegant Cross Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-50 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/50 hover:bg-white/10 border border-white/10 text-white backdrop-blur-xl transition-all duration-300 hover:scale-110 shadow-lg"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Glowing Accent Ring (Subtle) */}
            <div className="absolute inset-0 rounded-2xl md:rounded-[32px] pointer-events-none border border-[#b7ed16]/10" />

            {/* Default YouTube Embedded Frame */}
            <iframe
              className="w-full h-full relative z-20 pointer-events-auto"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
