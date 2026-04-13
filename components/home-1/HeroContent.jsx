'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import FadeUpAnimation from '../animations/FadeUpAnimation';
import VideoModal from '../common/VideoModal';
import ShortVideoModal from '../common/ShortVideoModal';
import './HeroContent.css';

const avatars = [
  { src: '/images/testimonial/avatar1.png', alt: 'Customer 1' },
  { src: '/images/testimonial/avatar2.png', alt: 'Customer 2' },
  { src: '/images/testimonial/avatar3.png', alt: 'Customer 3' },
  { src: '/images/testimonial/avatar4.png', alt: 'Customer 4' },
];

const reelItems = [
  { img: '/images/elearnning.jpg', label: 'Store' },
  { img: '/images/travel.jpg', label: 'Booking' },
  { img: '/images/inventory.jpg', label: 'ERP' },
  { img: '/images/mobile.jpg', label: 'App' },
  { img: '/images/service-bg.png', label: 'Service' },
];

const NetworkGlobe = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    // Scale canvas for high DPI
    const size = 56;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const points = [];
    const numPoints = 80; // More points for a complete globe
    const radius = 22;

    // Fibonacci sphere lattice for even distribution
    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < numPoints; i++) {
      const y = 1 - (i / (numPoints - 1)) * 2; // y goes from 1 to -1
      const r = Math.sqrt(1 - y * y); // radius at y
      const theta = phi * i;

      let color = '255, 255, 255'; // Default white
      if (y > 0.33) color = '255, 153, 51'; // Saffron (Top)
      else if (y < -0.33) color = '19, 136, 8'; // Green (Bottom)

      points.push({
        x: Math.cos(theta) * r * radius,
        y: y * radius,
        z: Math.sin(theta) * r * radius,
        rgb: color
      });
    }

    let angle = 0;
    let animationId;

    const animate = () => {
      ctx.clearRect(0, 0, size, size);
      angle += 0.012;

      const cos = Math.cos(angle);
      const sin = Math.sin(angle);

      const projectedPoints = points.map(p => {
        // Rotate around Y axis
        const x1 = p.x * cos - p.z * sin;
        const z1 = p.x * sin + p.z * cos;
        // Projection (simple orthographic)
        return {
          px: x1 + size / 2,
          py: p.y + size / 2,
          pz: z1,
          rgb: p.rgb
        };
      });

      // Draw connections
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'; // Soft white connections
      ctx.lineWidth = 0.5;

      for (let i = 0; i < projectedPoints.length; i++) {
        for (let j = i + 1; j < projectedPoints.length; j++) {
          const p1 = projectedPoints[i];
          const p2 = projectedPoints[j];
          const dist = Math.sqrt((p1.px - p2.px) ** 2 + (p1.py - p2.py) ** 2 + (p1.pz - p2.pz) ** 2);

          if (dist < 12) { // Shorter connection distance for denser points
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
          }
        }
      }
      ctx.stroke();

      // Draw points (Full globe with depth fading)
      projectedPoints.forEach(p => {
        // Map depth to opacity (back is faded, front is bright)
        const normalizedZ = (p.pz + radius) / (radius * 2);
        const opacity = 0.15 + (normalizedZ * 0.85);

        ctx.beginPath();
        ctx.arc(p.px, p.py, 1.2, 0, Math.PI * 2); // Make dots slightly bigger again to emphasize colors
        ctx.fillStyle = `rgba(${p.rgb}, ${opacity})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return <canvas ref={canvasRef} style={{ width: '56px', height: '56px' }} />;
};

const HeroContent = () => {
  const HERO_TYPE = 'TYPE3'; // 'TYPE1' for Projects, 'TYPE2' for Dotsell.ai, 'TYPE3' for Training Center
  const sceneRef = useRef(null);
  const trackRef = useRef(null);
  const [isDraggingState, setIsDraggingState] = useState(false); // Only for cursor styling
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [isShortsModalOpen, setIsShortsModalOpen] = useState(false);

  // High-performance animation refs
  const xPosRef = useRef(0);
  const isPausedRef = useRef(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const xStartRef = useRef(0);
  const lastTimestampRef = useRef(0);

  /* ── Subtle mouse-follow 3-D tilt ── */
  const handleMouseMoveScene = (e) => {
    const el = sceneRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    el.style.transform = `rotateY(${-18 + dx * 5}deg) rotateX(${8 - dy * 3}deg)`;
  };

  const handleMouseLeaveScene = () => {
    if (sceneRef.current)
      sceneRef.current.style.transform = 'rotateY(-18deg) rotateX(8deg)';
  };

  /* ── Deep Smoothness Translate Engine ── */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let animationId;
    const speed = 42; // Constant pixels per second

    const step = (timestamp) => {
      if (!lastTimestampRef.current) lastTimestampRef.current = timestamp;
      const deltaTime = (timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;

      if (!isPausedRef.current && !isDraggingRef.current) {
        // Move position independently using high-precision floats
        xPosRef.current -= speed * deltaTime;

        // Infinite loop reset (using 2 sets of items for a seamless cycle)
        const halfWidth = track.scrollWidth / 2;
        if (xPosRef.current <= -halfWidth) {
          xPosRef.current += halfWidth;
        }

        // Apply via transform (GPU accelerated - zero jitter)
        track.style.transform = `translate3d(${xPosRef.current}px, 0, 0)`;
      }

      animationId = requestAnimationFrame(step);
    };

    animationId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationId);
  }, []);

  /* ── Enhanced Drag to Move Logic (Mapped to Translation) ── */
  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    setIsDraggingState(true);
    startXRef.current = e.pageX;
    xStartRef.current = xPosRef.current;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    setIsDraggingState(false);
  };

  const handleMouseMoveScroll = (e) => {
    if (!isDraggingRef.current || !trackRef.current) return;
    e.preventDefault();
    const xDist = (e.pageX - startXRef.current) * 1.6;
    xPosRef.current = xStartRef.current + xDist;

    // Bounds check for seamless drag loop
    const halfWidth = trackRef.current.scrollWidth / 2;
    if (xPosRef.current <= -halfWidth) xPosRef.current += halfWidth;
    if (xPosRef.current > 0) xPosRef.current -= halfWidth;

    trackRef.current.style.transform = `translate3d(${xPosRef.current}px, 0, 0)`;
  };

  return (
    <>
      <FadeUpAnimation className="relative z-10 grid grid-cols-12 items-center gap-y-12 lg:gap-y-0 pb-10 lg:pb-0">

        {/* ══════════ LEFT COLUMN ══════════ */}
        <div className="col-span-12 lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
          <p className="mb-4 text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary">
            🇮🇳 Trusted by Indian Local Businesses
          </p>

          <h1 className="mb-6 text-[clamp(1.75rem,5vw,3.3rem)] font-bold leading-tight px-2 sm:px-0">
            Grow your{' '}
            <span className="inline-block rounded-[88px] border-2 border-paragraph bg-transparent px-4 py-1 sm:px-5 sm:pb-2.5 sm:pt-0.5 font-playfair italic leading-none dark:border-[#F0F3EA]">
              Business
            </span>{' '}
            with Smart&nbsp;&amp;&nbsp;AI Solutions.
          </h1>

          <p className="mb-10 max-w-[530px] text-sm sm:text-base leading-relaxed text-paragraph dark:text-[#A1A49D] px-4 sm:px-0">
            We build powerful digital platforms — from e-commerce stores to
            booking systems — that help local Indian businesses thrive online
            with the latest AI technologies.
          </p>

          {/* Dual CTA */}
          <div className="mb-12 flex flex-col sm:flex-row items-center gap-5 sm:gap-4 w-full sm:w-auto px-4 sm:px-0">
            <Link
              href="/portfolio"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-primary/90 w-full sm:w-auto px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/40"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
                Explore Portfolio
              </span>
              <span className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-500 group-hover:translate-x-0" />
            </Link>

            <button
              type="button"
              onClick={() => setActiveVideoId('ZK-rNEhJIDs')}
              className="group relative inline-flex items-center justify-center gap-3 rounded-full border-2 border-primary w-full sm:w-auto px-8 py-4 font-semibold text-primary transition-all duration-300 hover:bg-primary hover:text-white dark:border-primary dark:text-primary dark:hover:text-white"
            >
              <span className="relative flex h-5 w-5 items-center justify-center">
                <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-primary" />
              </span>
              Video Intro
            </button>
          </div>

          {/* Social proof */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 px-4 sm:px-0">
            <div className="flex items-center">
              {avatars.map((av, i) => (
                <div
                  key={av.alt}
                  className="relative rounded-full border-2 border-white shadow-md dark:border-dark"
                  style={{ marginLeft: i === 0 ? 0 : '-12px', zIndex: avatars.length - i }}
                >
                  <Image src={av.src} alt={av.alt} width={40} height={40} className="h-10 w-10 sm:h-11 sm:w-11 rounded-full object-cover" />
                </div>
              ))}
            </div>
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="mb-1 flex items-center gap-1 justify-center sm:justify-start">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-3.5 w-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-xs sm:text-sm font-semibold text-dark dark:text-white line-clamp-1">100+ Business Owners Satisfied</p>
              <p className="text-[10px] sm:text-xs text-paragraph dark:text-[#A1A49D]">Built their brand online with our digital growth</p>
            </div>
          </div>

          {/* ── LIVE BUSINESS STORIES (INTERACTIVE SLIDER) ── */}
          <div className="mt-8 w-full max-w-[460px] px-4 sm:px-0">
            <div className="mb-3 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-600" />
              </span>
              <p className="text-[10px] font-bold uppercase tracking-[2px] text-dark/70 dark:text-white/60">
                Live Business Stories
              </p>
            </div>

            <div
              className="relative overflow-hidden rounded-2xl bg-white/[0.03] p-2 backdrop-blur-md border border-white/10 dark:bg-dark-200/40 shadow-inner group/slider"
              onMouseEnter={() => { isPausedRef.current = true; }}
              onMouseLeave={() => { isPausedRef.current = false; isDraggingRef.current = false; setIsDraggingState(false); }}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMoveScroll}
            >
              <div
                ref={trackRef}
                className={`reels-track cursor-grab active:cursor-grabbing select-none`}
              >
                {/* 2 Sets of items for a seamless, hardware-accelerated infinite loop cycle */}
                {[...reelItems, ...reelItems].map((reel, idx) => (
                  <div
                    key={idx}
                    className="group relative h-[110px] w-[80px] flex-shrink-0 overflow-hidden rounded-xl border border-white/20 shadow-lg transition-all duration-300 hover:scale-[1.08] hover:-translate-y-1 hover:shadow-primary/30 hover:border-primary/50"
                  >
                    <Image src={reel.img} alt={reel.label} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity group-hover:opacity-60" />

                    <div className="absolute bottom-1.5 left-2 right-2">
                      <p className="text-[9px] font-bold text-white uppercase tracking-wider truncate mb-0.5">
                        {reel.label}
                      </p>
                      <div className="flex gap-0.5">
                        <div className="h-[2px] w-full bg-white/20 rounded-full overflow-hidden">
                          <div className="h-full w-1/3 bg-primary animate-pulse" />
                        </div>
                      </div>
                    </div>

                    {/* Play icon overlay */}
                    <button 
                      type="button"
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsShortsModalOpen(true); }}
                      className="absolute inset-0 flex w-full h-full cursor-pointer items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-50 group-hover:scale-100 z-20"
                    >
                      <div className="h-7 w-7 rounded-full bg-primary/90 flex items-center justify-center shadow-lg backdrop-blur-sm">
                        <svg className="h-3.5 w-3.5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ══════════ RIGHT COLUMN — 3-D GALLERY / PRODUCT ══════════ */}
        <div className="col-span-12 lg:col-span-7 hidden lg:flex flex-col items-center justify-center">

          {HERO_TYPE === 'TYPE1' && (
            <>
              {/* 🌐 PREMIUM GLOBAL NETWORK BADGE */}
              <div className="mb-6 flex animate-fade-in items-center gap-4 rounded-3xl border border-white/10 bg-white/5 px-6 py-3 shadow-2xl backdrop-blur-xl dark:bg-dark-200/40 transform hover:scale-[1.02] transition-transform duration-300">
                <div className="relative h-14 w-14 overflow-hidden rounded-2xl bg-white/5 p-1 shadow-inner ring-1 ring-white/10 flex items-center justify-center">
                  <NetworkGlobe />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold tracking-tight text-white/50 uppercase">Global Reach</span>
                  <h3 className="text-sm font-bold text-white sm:text-base leading-tight">हर Business के लिए Digital Solutions</h3>
                  <p className="text-[10px] font-semibold text-primary/80 uppercase tracking-widest mt-0.5">Dexterdigi Vision</p>
                </div>
              </div>

              <div
                className="scene-3d-wrap scale-[0.6] xl:scale-95 transition-transform duration-500 origin-center"
                style={{
                  width: '640px',
                  height: '680px',
                  margin: '0 auto',
                  position: 'relative'
                }}
                onMouseMove={handleMouseMoveScene}
                onMouseLeave={handleMouseLeaveScene}
              >
                <div
                  ref={sceneRef}
                  className="scene-3d relative"
                  style={{ width: '100%', height: '100%', position: 'relative' }}
                >

                  {/* CARD 1 — E-Commerce */}
                  <div
                    className="c3d fa glow-violet"
                    style={{
                      width: '54%', height: '300px',
                      left: '0', top: '50px',
                      transform: 'translateZ(0px)',
                    }}
                  >
                    <Image src="/images/elearnning.jpg" alt="E-Commerce" fill className="object-cover" />
                    <div className="c3d-grad" />
                    <span className="shimmer-badge absolute right-3 top-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-lg">
                      AI Driven
                    </span>
                    <div className="chip3d absolute bottom-4 left-3 right-3 flex items-center gap-2.5 px-4 py-3">
                      <span className="text-xl">🛒</span>
                      <div>
                        <p className="text-[13px] font-bold text-white">E-Commerce Store</p>
                        <p className="text-[11px] text-white/65">AI-powered storefronts</p>
                      </div>
                    </div>
                  </div>

                  {/* CARD 2 — Booking */}
                  <div
                    className="c3d fb glow-sky"
                    style={{
                      width: '44%', height: '210px',
                      right: '0', top: '20px',
                      transform: 'translateZ(40px)',
                    }}
                  >
                    <Image src="/images/travel.jpg" alt="Booking" fill className="object-cover" />
                    <div className="c3d-grad" />
                    <span className="absolute right-3 top-3 rounded-full bg-sky-500 px-2.5 py-0.5 text-[10px] font-bold uppercase text-white shadow-md">
                      Real-time
                    </span>
                    <div className="chip3d absolute bottom-3 left-3 right-3 flex items-center gap-2 px-3 py-2.5">
                      <span className="text-lg">📅</span>
                      <div>
                        <p className="text-[12px] font-bold text-white">Booking System</p>
                        <p className="text-[10px] text-white/65">Auto scheduling</p>
                      </div>
                    </div>
                  </div>

                  {/* CARD 3 — Management */}
                  <div
                    className="c3d fc glow-emerald"
                    style={{
                      width: '42%', height: '170px',
                      left: '2%', top: '400px',
                      transform: 'translateZ(20px)',
                    }}
                  >
                    <Image src="/images/inventory.jpg" alt="Management" fill className="object-cover" />
                    <div className="c3d-grad" />
                    <span className="absolute right-3 top-3 rounded-full bg-emerald-500 px-2.5 py-0.5 text-[10px] font-bold uppercase text-white shadow-md">
                      Smart ERP
                    </span>
                    <div className="chip3d absolute bottom-3 left-3 right-3 flex items-center gap-2 px-3 py-2">
                      <span className="text-base">⚙️</span>
                      <div>
                        <p className="text-[11px] font-bold text-white">Management System</p>
                        <p className="text-[10px] text-white/65">Inventory & ops</p>
                      </div>
                    </div>
                  </div>

                  {/* CARD 4 — Mobile App */}
                  <div
                    className="c3d fa glow-amber"
                    style={{
                      width: '44%', height: '190px',
                      right: '0', top: '300px',
                      transform: 'translateZ(70px)',
                    }}
                  >
                    <Image src="/images/mobile.jpg" alt="Mobile App" fill className="object-cover" />
                    <div className="c3d-grad" />
                    <span className="absolute right-3 top-3 rounded-full bg-amber-500 px-2.5 py-0.5 text-[10px] font-bold uppercase text-white shadow-md">
                      AI Solution
                    </span>
                    <div className="chip3d absolute bottom-3 left-3 right-3 flex items-center gap-2 px-3 py-2">
                      <span className="text-base">📱</span>
                      <div>
                        <p className="text-[11px] font-bold text-white">Mobile App</p>
                        <p className="text-[10px] text-white/65">iOS & Android</p>
                      </div>
                    </div>
                  </div>

                  {/* floating chip — Projects */}
                  <div
                    className="chip3d fa absolute z-30 flex items-center gap-2.5 px-4 py-2.5"
                    style={{ top: '0px', left: '50%', transform: 'translateX(-50%) translateZ(90px)' }}
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-600 shadow">
                      <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[12px] font-bold text-white">200+ Projects</p>
                      <p className="text-[10px] text-white/60">Delivered in India</p>
                    </div>
                  </div>

                  {/* floating chip — rating */}
                  <div
                    className="chip3d fb absolute z-30 flex items-center gap-2 px-3.5 py-2"
                    style={{ bottom: '20px', left: '43%', transform: 'translateZ(100px)' }}
                  >
                    <span className="text-base">⭐</span>
                    <div>
                      <p className="text-[12px] font-bold text-white">4.9 / 5.0</p>
                      <p className="text-[10px] text-white/60">Client Rating</p>
                    </div>
                  </div>

                  {/* live status badge */}
                  <div
                    className="chip3d fc absolute z-30 flex items-center gap-2 rounded-full px-4 py-2"
                    style={{ bottom: '30px', right: '0', transform: 'translateZ(80px)' }}
                  >
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    </span>
                    <span className="text-[12px] font-semibold text-white">AI-Powered</span>
                  </div>

                </div>
              </div>
            </>
          )}

          {HERO_TYPE === 'TYPE2' && (
            <div
              className="scene-3d-wrap scale-[0.6] xl:scale-95 transition-transform duration-500 origin-center"
              style={{
                width: '640px',
                height: '740px',
                margin: '0 auto',
                position: 'relative'
              }}
              onMouseMove={handleMouseMoveScene}
              onMouseLeave={handleMouseLeaveScene}
            >
              {/* 🚀 PREMIUM HEADING */}
              <div className="absolute -top-4 left-0 right-0 z-50 px-4 text-center">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[4px] text-primary/80">Growth Partner</p>
                <h2 className="text-[clamp(1.2rem,4vw,1.8rem)] font-black leading-[1.1] text-white">
                  <span className="text-primary italic">Dexterdigi:</span> Accelerate your business to <br />
                  <span className="bg-gradient-to-r from-emerald-400 via-sky-400 to-primary bg-clip-text text-transparent">Earning High-Value Customers</span>
                </h2>
                <p className="mt-2 text-xs font-semibold text-white/50">& Increase your sales like never before</p>
              </div>

              <div
                ref={sceneRef}
                className="scene-3d relative"
                style={{ width: '100%', height: '100%', position: 'relative', paddingTop: '100px' }}
              >
                {/* 🚀 MAIN PRODUCT IMAGE CONTAINER */}
                <div
                  className="c3d glow-sky transition-all duration-700"
                  style={{
                    width: '85%',
                    height: '440px',
                    left: '7.5%',
                    top: '120px',
                    transform: 'translateZ(20px)',
                    borderRadius: '32px',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    background: 'rgba(255, 255, 255, 0.03)',
                    boxShadow: '0 25px 60px -15px rgba(0,0,0,0.5), 0 0 20px rgba(14, 165, 233, 0.15)'
                  }}
                >
                  <Image
                    src="/images/dotsell-launch.png"
                    alt="Dotsell Launch"
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="c3d-grad rounded-[32px]" />

                  {/* Launching Badge */}
                  <div className="shimmer-badge absolute right-8 top-8 rounded-full px-6 py-2.5 text-[11px] font-black uppercase tracking-[2px] text-white shadow-2xl ring-1 ring-white/30">
                    Live Launch
                  </div>

                  {/* Product Logo Overlay */}
                  <div className="absolute left-8 top-8 flex items-center gap-3 rounded-full bg-black/60 px-4 py-2 backdrop-blur-xl border border-white/20">
                    <div className="relative flex h-3 w-3 items-center justify-center">
                      <span className="pulse-ring absolute h-full w-full rounded-full bg-primary" />
                      <span className="relative h-1.5 w-1.5 rounded-full bg-primary" />
                    </div>
                    <span className="text-[11px] font-black text-white uppercase tracking-[2px]">Dotsell.ai Agent</span>
                  </div>

                  {/* BOTTOM BUTTONS ON IMAGE */}
                  <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 items-center gap-6 z-20 w-max">
                    <Link
                      href="/portfolio"
                      className="group/btn relative flex items-center gap-3 overflow-hidden rounded-full bg-primary px-10 py-4 text-sm font-black text-white shadow-[0_15px_40px_-10px_rgba(177,227,70,0.4)] transition-all duration-500 hover:scale-105 hover:shadow-[0_20px_50px_-10px_rgba(177,227,70,0.5)] active:scale-95 whitespace-nowrap"
                    >
                      <span className="relative z-10 flex items-center gap-2.5">
                        Explore Now
                        <svg className="h-4 w-4 transition-transform duration-500 group-hover/btn:translate-x-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </span>
                      <div className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-700 cubic-bezier(0.23,1,0.32,1) group-hover/btn:translate-x-0" />
                    </Link>

                    <button onClick={() => setActiveVideoId('VYHqg4EfesE')} className="group/vid relative flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-10 py-4 text-sm font-black text-white backdrop-blur-[30px] transition-all duration-500 hover:bg-white/15 hover:border-white/40 hover:shadow-[0_20px_60px_-15px_rgba(255,255,255,0.15)] active:scale-95 whitespace-nowrap">
                      <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/10 group-hover/vid:bg-primary transition-all duration-500 group-hover/vid:scale-110">
                        <span className="pulse-ring absolute h-full w-full rounded-full bg-white/20" />
                        <svg className="h-4 w-4 text-white ml-0.5 transition-transform duration-300 group-hover/vid:scale-110" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                      Video Intro
                    </button>
                  </div>
                </div>

                {/* ✨ OPTIMIZED FLOATING CHIPS */}

                {/* AI Sales Engine */}
                <div
                  className="chip3d fa absolute z-30 flex items-center gap-4 px-7 py-5"
                  style={{ top: '60px', left: '-20px', transform: 'translateZ(100px)' }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-xl glow-emerald">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <div>
                    <p className="text-[15px] font-black text-white leading-tight">AI Sales Agent</p>
                    <p className="text-[11px] font-bold text-white/60 tracking-wide">Closing Leads 24/7</p>
                  </div>
                </div>

                {/* Omni-Channel CRM */}
                <div
                  className="chip3d fb absolute z-30 flex items-center gap-4 px-7 py-5"
                  style={{ top: '240px', right: '-40px', transform: 'translateZ(140px)' }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 shadow-xl glow-sky">
                    <span className="text-2xl">📊</span>
                  </div>
                  <div>
                    <p className="text-[15px] font-black text-white leading-tight">Unified CRM</p>
                    <p className="text-[11px] font-bold text-white/60 tracking-wide">Seamless Data Sync</p>
                  </div>
                </div>

                {/* Smart Automations */}
                <div
                  className="chip3d fc absolute z-30 flex items-center gap-4 px-7 py-5"
                  style={{ bottom: '20px', left: '0', transform: 'translateZ(180px)' }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-400 to-violet-600 shadow-xl glow-violet">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <div>
                    <p className="text-[15px] font-black text-white leading-tight">Auto Workflows</p>
                    <p className="text-[11px] font-bold text-white/60 tracking-wide">No-Code Logic</p>
                  </div>
                </div>

                {/* Performance Badge */}
                <div
                  className="chip3d fa absolute z-40 rounded-full bg-white/5 px-6 py-3 backdrop-blur-3xl border border-white/10"
                  style={{ bottom: '40px', right: '5%', transform: 'translateZ(220px)' }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)] text-white">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[13px] font-black text-white leading-none">High-Value Results</span>
                      <span className="text-[10px] font-bold text-emerald-400 mt-1">Certified Success</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {HERO_TYPE === 'TYPE3' && (
            <div
              className="scene-3d-wrap scale-[0.6] xl:scale-95 transition-transform duration-500 origin-center"
              style={{
                width: '640px',
                height: '740px',
                margin: '0 auto',
                position: 'relative'
              }}
              onMouseMove={handleMouseMoveScene}
              onMouseLeave={handleMouseLeaveScene}
            >
              {/* 🚨 PREMIUM INDUSTRY HEADING */}
              <div className="absolute -top-10 left-0 right-0 z-50 px-4 text-center">

                {/* 🔥 TREND BADGE */}
                <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 backdrop-blur-md">
                  <span className="text-[9px] font-black uppercase tracking-[3px] text-emerald-400">
                    🔥 Trending AI Program India
                  </span>
                </div>

                {/* 🚀 MAIN HEADING */}
                <h2 className="text-[clamp(1.5rem,4.5vw,2.2rem)] font-black leading-[1.1] text-white tracking-tight">
                  <span className="bg-gradient-to-r from-violet-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
                    AI Expert Course
                  </span>
                  <br />
                  <span className="text-white">
                    Build Real AI Products & Get Industry Ready
                  </span>
                </h2>

                {/* 💡 MICRO TRUST LINE */}
                <p className="text-[10px] text-white/60 mt-1.5 uppercase font-bold tracking-wider">
                  Designed for Indian Developers 🇮🇳 | Hindi + Practical Learning
                </p>
              </div>

              <div
                ref={sceneRef}
                className="scene-3d relative flex justify-end"
                style={{ width: '100%', height: '100%', position: 'relative', paddingTop: '120px' }}
              >

                {/* 🚀 VALUE + TRUST PANEL */}
                <div
                  className="absolute left-[-30px] top-[220px] z-30 flex flex-col gap-2.5 w-[250px]"
                  style={{ transform: 'translateZ(100px)' }}
                >
                  {/* ✅ CARD 1 */}
                  <div className="group relative overflow-hidden rounded-xl bg-black/60 p-3 backdrop-blur-xl border border-white/10 hover:border-emerald-500/50 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-emerald-500/20 flex shrink-0 items-center justify-center text-emerald-400 font-black">
                        ✓
                      </div>
                      <div>
                        <p className="text-[12px] font-black text-white leading-tight">Learn AI in Hindi</p>
                        <p className="text-[9px] text-white/50 leading-tight mt-0.5">Deep concepts explained step-by-step</p>
                      </div>
                    </div>
                  </div>

                  {/* ✅ CARD 2 */}
                  <div className="group relative overflow-hidden rounded-xl bg-black/60 p-3 backdrop-blur-xl border border-white/10 hover:border-sky-500/50 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-sky-500/20 flex shrink-0 items-center justify-center text-sky-400 font-black">
                        ⚡
                      </div>
                      <div>
                        <p className="text-[12px] font-black text-white leading-tight">Build Production AI</p>
                        <p className="text-[9px] text-white/50 leading-tight mt-0.5">Chatbots, SaaS, recommendation systems</p>
                      </div>
                    </div>
                  </div>

                  {/* ✅ CARD 3 */}
                  <div className="group relative overflow-hidden rounded-xl bg-black/60 p-3 backdrop-blur-xl border border-white/10 hover:border-violet-500/50 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-violet-500/20 flex shrink-0 items-center justify-center text-violet-400">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                      </div>
                      <div>
                        <p className="text-[12px] font-black text-white leading-tight">Top 1% Career Path</p>
                        <p className="text-[9px] text-white/50 leading-tight mt-0.5">Get industry-ready for high-paying jobs</p>
                      </div>
                    </div>
                  </div>

                  {/* 🆕 NEW ELEMENT 1: SOCIAL PROOF */}
                  <div className="rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-[10px] uppercase tracking-wide font-bold text-white/80">
                    ⭐ 1200+ Students Learning AI
                  </div>

                  {/* 🆕 NEW ELEMENT 2: OUTCOME TAGS */}
                  <div className="flex flex-wrap gap-1.5 text-[9px] font-bold tracking-wider">
                    <span className="px-2 py-1 bg-white/10 rounded-full">Real Projects</span>
                    <span className="px-2 py-1 bg-white/10 rounded-full">Live Training</span>
                    <span className="px-2 py-1 bg-white/10 rounded-full">Job Focused</span>
                  </div>
                </div>

                {/* 🚀 DASHBOARD */}
                <div className="c3d glow-violet transition-all duration-700 group right-0"
                  style={{
                    width: '75%',
                    height: '420px',
                    top: '190px',
                    transform: 'translateZ(40px)',
                    borderRadius: '24px',
                    background: 'rgba(0,0,0,0.85)',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  <Image
                    src="/images/course_launch.png"
                    alt="AI Course Dashboard"
                    fill
                    className="object-cover rounded-[24px] opacity-90 transition-transform duration-1000 group-hover:scale-105"
                  />

                  {/* 🆕 NEW ELEMENT 3: LIVE STATUS */}
                  <div className="absolute top-5 right-5 flex items-center gap-2 bg-black/60 backdrop-blur px-3 py-1.5 rounded-full border border-white/10">
                    <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,1)]"></span>
                    <span className="text-[9px] text-white/90 font-bold uppercase tracking-wider">
                      Live Premium Platform
                    </span>
                  </div>

                  {/* 🆕 NEW ELEMENT 4: FEATURE FLOAT CARD */}
                  <div className="absolute bottom-5 left-5 bg-black/70 backdrop-blur-md px-4 py-2 rounded-xl text-[10px] font-black uppercase text-white shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-white/10">
                    Build <span className="text-violet-400 inline-block mx-1">→</span> Deploy <span className="text-violet-400 inline-block mx-1">→</span> Scale AI Apps
                  </div>
                </div>

                {/* 🚀 CTA SECTION */}
                <div
                  className="absolute bottom-2 right-[20%] translate-x-1/4 flex flex-col items-center gap-2 z-40"
                  style={{ transform: 'translateZ(150px)' }}
                >
                  {/* 🆕 NEW ELEMENT 5: PSYCHOLOGY LINE */}
                  <p className="text-[10px] uppercase tracking-widest font-bold text-white/80 bg-black/60 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/10">
                    No Theory. Only Real AI Building.
                  </p>

                  <div className="flex gap-3">
                    <Link
                      href="/portfolio"
                      className="group/btn relative overflow-hidden rounded-full bg-violet-600 px-7 py-3 text-[12px] uppercase tracking-wide font-black text-white hover:scale-105 transition-all shadow-[0_10px_30px_-5px_rgba(124,58,237,0.5)] border border-violet-500/50"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Start Building AI
                        <span className="transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
                      </span>
                      <div className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-700 group-hover/btn:translate-x-0" />
                    </Link>

                    <button onClick={() => setActiveVideoId('VYHqg4EfesE')} className="rounded-full border border-white/20 px-7 py-3 text-[12px] uppercase tracking-wide font-bold text-white bg-black/40 backdrop-blur hover:bg-white/10 transition-all">
                      Watch Demo
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>

      </FadeUpAnimation>

      {/* Reusable Video Modal Instance */}
      <VideoModal isOpen={!!activeVideoId} onClose={() => setActiveVideoId(null)} videoId={activeVideoId || 'ZK-rNEhJIDs'} />
      
      {/* Vertical Snap Shorts Modal */}
      <ShortVideoModal 
        isOpen={isShortsModalOpen} 
        onClose={() => setIsShortsModalOpen(false)} 
        videos={[
          { id: 'q6DuLX9GX9E', title: 'Start Building AI - Live Story' },
          { id: 'q6DuLX9GX9E', title: 'Why Developers Need AI' },
          { id: 'q6DuLX9GX9E', title: 'Secret to High Ticket Clients' },
          { id: 'q6DuLX9GX9E', title: 'Code Faster with Agents' }
        ]}
      />
    </>
  );
};

export default HeroContent;
