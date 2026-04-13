'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const roadmapSteps = [
  {
    id: 'start',
    label: 'The Spark',
    title: 'Idea Phase',
    icon: '💡',
    sideDetail: '🧑‍💻',
    desc: 'Every global giant started with a local spark. We take your raw vision and validate its global potential.',
    diplomacy: 'We respect the Indian hustle. Your idea belongs to you—we just give it the wings it deserves.',
    color: '#FF9933' // Saffron
  },
  {
    id: 'tech',
    label: 'The Forge',
    title: 'Build Fast',
    icon: '⚡',
    sideDetail: '⚙️',
    desc: 'Build international-grade technology at local prices. We use rapid AI-driven development to ship fast.',
    diplomacy: 'High tech doesn\'t mean high price. We optimize every line of code to sit within an Indian budget.',
    color: '#E0E0E0' // White/Silver
  },
  {
    id: 'strategy',
    label: 'The Pivot',
    title: 'Growth Strategy',
    icon: '📊',
    sideDetail: '📈',
    desc: 'A great app needs a great strategy. We map out your digital expansion and revenue models.',
    diplomacy: 'We don\'t just deploy code; we deploy business solutions that actually make money.',
    color: '#128807' // Green
  },
  {
    id: 'team',
    label: 'The League',
    title: 'Scale Team',
    icon: '🤝',
    sideDetail: '🚀',
    desc: 'Scale your operations by building a tech-centric team. We help automate the humans-in-the-loop.',
    diplomacy: 'Scaling a team is hard. Our automation layers make 1 person feel like a 10-person department.',
    color: '#000080' // Blue
  },
  {
    id: 'success',
    label: 'The Pinnacle',
    title: 'Global Brand',
    icon: '🌍',
    sideDetail: '🇮🇳',
    desc: 'From a local business to a global brand. We help you export Indian innovation to the world.',
    diplomacy: 'Our goal for 2030 is to see 10,000+ Indian youths leading global brands through our tech.',
    color: '#b7ed16' // Theme Color
  }
];

export default function IntroSection() {
  const [activeStep, setActiveStep] = useState(roadmapSteps[0]);
  const [isMobile, setIsMobile] = useState(false);

  // HANDLE RESPONSIVENESS
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // AUTO-CYCLE LOGIC (5-second hold)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => {
        const currentIndex = roadmapSteps.findIndex(s => s.id === prev.id);
        const nextIndex = (currentIndex + 1) % roadmapSteps.length;
        return roadmapSteps[nextIndex];
      });
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // SHARED NODE COMPONENT logic
  const renderNode = (step, index) => {
    const isActive = activeStep.id === step.id;
    // REFINED OFFSETS to match the exact SVG wave curves
    const horizontalYOffsets = [0, -110, 80, 35, 0]; // Mathematically matched to SVG curves
    const mobileXOffsets = [0, 0, 0, 0, 0]; // Straight Line on Mobile
    
    return (
      <motion.div
        key={step.id}
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.1 }}
        style={!isMobile ? { translateY: horizontalYOffsets[index] } : { translateX: mobileXOffsets[index] }}
        className="flex flex-col items-center group cursor-pointer"
        onClick={() => setActiveStep(step)}
      >
        <div className={`relative w-14 h-14 md:w-20 md:h-20 rounded-2xl overflow-hidden p-[1.5px] transition-all duration-500 ${isActive ? 'scale-110' : ''}`}>
           <div className={`absolute inset-0 bg-[conic-gradient(from_0deg,#b7ed16,#0ea5e9,#7c3aed,#b7ed16)] animate-[spin_4s_linear_infinite] transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-20'}`} />
           <div className={`relative w-full h-full rounded-2xl flex items-center justify-center text-xl md:text-3xl transition-all duration-500 ${
             isActive ? 'bg-black text-white' : 'bg-black/80 text-white/30 backdrop-blur-xl group-hover:text-white/60'
           }`}>
              <span className="relative z-10">{step.icon}</span>
              {step.id === 'start' && <span className="absolute -top-10 lg:-top-12 text-2xl lg:text-3xl opacity-20 filter grayscale group-hover:opacity-100 transition-opacity">🧑‍💻</span>}
              {step.id === 'success' && <span className="absolute -top-10 lg:-top-12 text-2xl lg:text-3xl opacity-20 filter grayscale group-hover:opacity-100 transition-opacity">🇮🇳</span>}
              <div className={`absolute inset-0 rounded-2xl blur-xl transition-opacity duration-500 ${isActive ? 'opacity-20' : 'opacity-0'}`} style={{ backgroundColor: step.color }} />
           </div>
        </div>
        <span className={`mt-3 text-[8px] lg:text-[9px] font-black uppercase tracking-[2px] lg:tracking-[3px] transition-colors ${isActive ? 'text-white' : 'text-white/20'}`}>
          {step.label}
        </span>
      </motion.div>
    );
  };

  return (
    <section className="relative py-16 lg:py-24 bg-[#050505] overflow-hidden">
      
      {/* TOP BACKGROUND AMBIENCE */}
      <div className="absolute top-[10%] left-[5%] w-[300px] h-[300px] bg-orange-500/[0.03] blur-[150px] rounded-full" />
      <div className="absolute top-[10%] right-[5%] w-[300px] h-[300px] bg-green-500/[0.03] blur-[150px] rounded-full" />

      <div className="absolute top-[52%] left-0 w-full text-center pointer-events-none select-none opacity-[0.03] overflow-hidden whitespace-nowrap">
         <h3 className="text-2xl lg:text-5xl font-black uppercase tracking-[8px] lg:tracking-[15px] inline-block animate-[scroll_40s_linear_infinite]">
            MAKE MONEY FASTER • SCALE GLOBALLY • MISSION 2030 • MAKE MONEY FASTER • SCALE GLOBALLY • MISSION 2030 •
         </h3>
      </div>

      <div className="container relative z-10 mx-auto px-4 max-w-7xl">
        
        {/* HEADER AREA - Responsive Alignment */}
        <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-8 mb-16 lg:mb-20 text-center lg:text-left">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 lg:mx-0 mx-auto">
               <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
               <span className="text-[9px] font-black uppercase tracking-[3px] text-white/60 ml-2">Mission 2030</span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
               The Success Wave<br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-white to-green-500 opacity-90">Local Idea to Global Brand.</span>
            </h2>
          </div>
          <p className="text-white/40 font-medium italic lg:text-right max-w-[300px] text-xs md:text-sm lg:text-base lg:border-r-2 border-[#b7ed16] lg:pr-6">
            "Supporting Indian Youth to conquer global markets with international-grade tech."
          </p>
        </div>

        {/* ROADMAP AREA - Morphing between Wave (Desktop) and Tower (Mobile) */}
        <div className={`relative w-full ${isMobile ? 'h-[600px] py-10' : 'h-[350px] mb-16'} flex items-center justify-center px-4 lg:px-10 overflow-visible`}>
          
          {/* THE WINDING PATH SVG - Responsive Paths */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20 overflow-visible" 
               viewBox={isMobile ? "0 0 320 600" : "0 0 1200 350"}>
            <motion.path
              d={isMobile 
                ? "M160,0 L160,600" // STRAIGHT LINE FOR MOBILE
                : "M0,175 C150,175 250,25 400,105 C550,185 650,325 800,245 C950,165 1050,175 1200,175" // REFINED HORIZONTAL WAVE
              }
              fill="none"
              stroke="white"
              strokeWidth="1.5"
              strokeDasharray="8 8"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            
            {/* Active Indicator Pulse (Linked to Active Mode) */}
            <motion.circle
              r="6"
              fill="#b7ed16"
              className="filter blur-[4px]"
              animate={{ 
                offsetDistance: `${(roadmapSteps.findIndex(s => s.id === activeStep.id) / (roadmapSteps.length - 1)) * 100}%`
              }}
              transition={{ duration: 1, ease: "easeInOut" }}
              style={{ offsetPath: `path('${isMobile ? "M160,0 L160,600" : "M0,175 C150,175 250,25 400,105 C550,185 650,325 800,245 C950,165 1050,175 1200,175"}')` }}
            />
          </svg>

          {/* ROADMAP NODES - Swapping between Flex-Row and Flex-Col */}
          <div className={`relative w-full h-full flex ${isMobile ? 'flex-col justify-between py-10' : 'flex-row justify-between items-center'} z-10 overflow-visible`}>
             {roadmapSteps.map((step, index) => renderNode(step, index))}
          </div>
        </div>

        {/* NARRATIVE CONSOLE - Responsive Padding & Layout */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="relative p-6 lg:p-12 rounded-[32px] lg:rounded-[40px] bg-white/[0.015] border border-white/5 backdrop-blur-3xl overflow-hidden mt-10 md:mt-20 lg:mt-0"
          >
            <div className="absolute top-0 right-0 w-1 lg:w-2 h-full bg-gradient-to-b from-orange-400 via-white to-green-500 opacity-20" />
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-16 items-start lg:items-center">
               <div className="w-full lg:w-1/3 border-b lg:border-b-0 lg:border-r border-white/10 pb-4 lg:pb-0 lg:pr-10">
                  <span className="text-[#b7ed16] font-black text-[9px] lg:text-[10px] uppercase tracking-[4px] mb-1 block">Phase 0{roadmapSteps.findIndex(s => s.id === activeStep.id) + 1}</span>
                  <h3 className="text-2xl lg:text-4xl font-black text-white leading-none uppercase tracking-tighter">
                    {activeStep.title}
                  </h3>
               </div>
               <div className="w-full lg:w-2/3">
                  <p className="text-lg lg:text-2xl font-bold text-white mb-4 lg:mb-6 leading-tight">
                    {activeStep.desc}
                  </p>
                  <div className="flex items-center gap-4 py-3 lg:py-4 px-4 lg:px-6 rounded-xl lg:rounded-2xl bg-white/[0.03] border border-white/5">
                    <span className="text-base lg:text-lg">🎙️</span>
                    <p className="text-white/50 text-[10px] lg:text-[11px] font-medium leading-relaxed italic">
                      {activeStep.diplomacy}
                    </p>
                  </div>
               </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 lg:mt-12 text-center">
            <span className="text-white/20 font-black text-[9px] uppercase tracking-[8px]">DexterDigi Pledge for 2030</span>
        </div>

      </div>
    </section>
  );
}
