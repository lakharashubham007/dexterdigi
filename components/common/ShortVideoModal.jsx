'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ShortVideoModal({ isOpen, onClose, videos = [] }) {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef(null);
  const videoRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setActiveIndex(0); // reset to first video on open
    } else {
      document.body.style.overflow = 'auto';
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Smart IntersectionObserver to Play/Pause when scrolling
  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setActiveIndex(index);
          }
        });
      },
      {
        root: containerRef.current,
        threshold: 0.6, // Fire when 60% of the video block is visible
      }
    );

    const childNodes = containerRef.current.children;
    for (let i = 0; i < childNodes.length; i++) {
      observer.observe(childNodes[i]);
    }

    return () => observer.disconnect();
  }, [isOpen, videos]);

  // Command iFrames to Play/Pause based on activeIndex
  useEffect(() => {
    videoRefs.current.forEach((iframe, index) => {
      if (!iframe) return;
      if (index === activeIndex) {
        iframe.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      } else {
        iframe.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
      }
    });
  }, [activeIndex]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-0 sm:p-4 overflow-hidden bg-black/90 sm:bg-transparent">
          
          {/* Universal Cross Button (Moved outside scaling container to guarantee mobile touch priority!) */}
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={onClose}
            className="fixed top-16 right-5 sm:top-8 sm:right-8 z-[99999] flex items-center justify-center w-12 h-12 rounded-full bg-black/80 sm:bg-[#131410]/80 border border-white/20 text-white backdrop-blur-3xl transition-all duration-300 hover:scale-110 shadow-[0_0_30px_rgba(0,0,0,0.8)] cursor-pointer touch-none"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>

          {/* Blur Backdrop (Desktop) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer hidden sm:block"
          />

          {/* Vertical Scroller Wrapper (Reels format: responsive 9:16) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full h-[100dvh] sm:h-[85vh] sm:max-h-[850px] max-w-[420px] aspect-auto sm:aspect-[9/16] rounded-none sm:rounded-[32px] overflow-hidden sm:shadow-[0_0_80px_rgba(183,237,22,0.15)] sm:border border-white/10 z-10 bg-black"
          >

          {/* Glowing Accent Ring (Subtle Desktop Only) */}
          <div className="hidden sm:block absolute inset-0 rounded-[32px] pointer-events-none border border-[#b7ed16]/20 z-20 mix-blend-screen" />

          {/* Snap Scrolling Container */}
          <div ref={containerRef} className="w-full h-full overflow-y-auto snap-y snap-mandatory hide-scrollbar relative z-10 bg-black">
            {videos.map((vid, index) => (
              <div key={`${vid.id}-${index}`} data-index={index} className="w-full h-full flex-shrink-0 snap-center snap-always relative bg-black flex items-center justify-center overflow-hidden">
                
                {/* Overlay gradient so titles and edges fade elegantly */}
                <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                {/* Scale up to hide potential black bars in vertical videos if aspect ratio slightly off */}
                <iframe
                  ref={(el) => (videoRefs.current[index] = el)}
                  className="w-full h-full object-cover scale-[1.05]"
                  src={`https://www.youtube.com/embed/${vid.id}?enablejsapi=1&autoplay=${index === 0 ? 1 : 0}&loop=1&playlist=${vid.id}&rel=0&modestbranding=1&showinfo=0&controls=0`}
                  title={`YouTube shorts player ${index}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />

                {/* Title Overlay */}
                <div className="absolute bottom-6 left-6 right-16 z-20 pointer-events-none">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                    <p className="text-[10px] font-bold text-white uppercase tracking-widest">Live Story</p>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white leading-tight drop-shadow-md">
                    {vid.title}
                  </h3>
                </div>

              </div>
            ))}
          </div>

          <style>{`
            .hide-scrollbar::-webkit-scrollbar { display: none; }
            .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          `}</style>
        </motion.div>
      </div>
      )}
    </AnimatePresence>
  );
}
