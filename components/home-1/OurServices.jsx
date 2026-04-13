'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import VideoModal from '../common/VideoModal';

// --- SERVICE DATA ---
const services = [
  {
    id: 'ai-ml',
    name: 'AI / ML Solutions',
    impact: 'Automate Decisions',
    details: 'Custom models for predictive analytics, personalized customer AI, and vision-based automation.',
    chips: ['Predictive', 'LLM Tuning'],
    video: 'VYHqg4EfesE',
    icon: '🧠',
    cta: 'Build AI'
  },
  {
    id: 'software',
    name: 'Custom Software',
    impact: 'Scalable Systems',
    details: 'High-performance Web and Mobile applications designed to capture markets.',
    chips: ['iOS/Android', 'SaaS'],
    video: 'q6DuLX9GX9E',
    icon: '📱',
    cta: 'Launch App'
  },
  {
    id: 'automation',
    name: 'Workflow Automation',
    impact: '24/7 Hands-free',
    details: 'Eliminate manual tasks, sync leads, and automate your entire operational flow.',
    chips: ['Auto Leads', 'Ops Sync'],
    video: 'q6DuLX9GX9E',
    icon: '⚡',
    cta: 'Automate Now'
  },
  {
    id: 'integration',
    name: 'AI Integration',
    impact: 'Upgrade Tech',
    details: 'Inject intelligence into your current systems via CRM upgrades and tool co-pilots.',
    chips: ['CRM AI', 'Smart Bots'],
    video: 'ZK-rNEhJIDs',
    icon: '🔌',
    cta: 'Sync AI'
  },
  {
    id: 'products',
    name: 'Develop AI Products',
    impact: 'Innovate Niche',
    details: 'Build proprietary AI software specialized for your business vertical.',
    chips: ['MVP Fast', 'Proprietary'],
    video: 'ZK-rNEhJIDs',
    icon: '🚀',
    cta: 'Build Product'
  },
  {
    id: 'data-science',
    name: 'Data Consultancy',
    impact: 'Actionable ROI',
    details: 'Translate raw numbers into growth maps using real-time visual dashboards.',
    chips: ['ROI Analysis', 'Strategy'],
    video: 'VYHqg4EfesE',
    icon: '📊',
    cta: 'Consult Data'
  },
  {
    id: 'growth',
    name: 'Tech-Driven Growth',
    impact: 'Multiply Revenue',
    details: 'Strategic tech implementation to scale business horizontally and capture value.',
    chips: ['Market Dominance', 'Scaling'],
    video: 'VYHqg4EfesE',
    icon: '📈',
    cta: 'Scale Today'
  }
];

// --- MODAL COMPONENT ---
const ServiceDetailModal = ({ isOpen, onClose, service }) => {
  if (!service) return null;
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} className="absolute inset-0 bg-black/95 backdrop-blur-xl"
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl p-8 lg:p-12 z-10"
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors">
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-4xl">{service.icon}</span>
              <h3 className="text-3xl font-black text-white">{service.name}</h3>
            </div>
            <div className="space-y-6">
               <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                  <p className="text-[#b7ed16] font-black uppercase text-[10px] tracking-widest mb-2">Primary Goal</p>
                  <p className="text-xl text-white font-bold">{service.impact}</p>
               </div>
               <div>
                  <p className="text-white/40 font-bold uppercase text-[10px] tracking-widest mb-3">Service Deep-Dive</p>
                  <p className="text-lg text-white/70 leading-relaxed font-medium">{service.details}</p>
               </div>
               <button onClick={onClose} className="w-full py-4 rounded-2xl bg-[#b7ed16] text-black font-black uppercase text-xs tracking-widest hover:scale-[1.02] transition-all">Close</button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// --- WATER DROP & RIPPLE ANIMATIONS ---
const WaterEffects = () => {
  const bgIcons = [
    { icon: '📈', label: 'Growth' }, { icon: '🏆', label: 'Success' }, { icon: '💰', label: 'Earn' },
    { icon: '💸', label: 'Revenue' }, { icon: '🛒', label: 'Ecom' }, { icon: '📅', label: 'Booking' },
    { icon: '🤖', label: 'Robot' }, { icon: '🌐', label: 'Social' }
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Decorative Floating Background Icons */}
      {bgIcons.map((item, i) => (
        <motion.div
          key={`bg-icon-${i}`}
          initial={{ 
            opacity: 0, 
            x: `${Math.random() * 100}%`, 
            y: `${Math.random() * 100}%`,
            scale: 0.5
          }}
          animate={{ 
            opacity: [0, 0.05, 0],
            y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
            scale: [0.5, 0.8, 0.5],
            rotate: [0, 45, 0]
          }}
          transition={{ 
            duration: 15 + Math.random() * 10, 
            repeat: Infinity, 
            delay: i * 2,
            ease: "linear" 
          }}
          className="absolute flex flex-col items-center gap-1 group"
        >
          <span className="text-xl filter grayscale opacity-40">{item.icon}</span>
          <span className="text-[7px] font-black uppercase tracking-[2px] text-white/20">{item.label}</span>
        </motion.div>
      ))}

      {/* Falling Droplets from Top */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`drop-${i}`}
          initial={{ y: -100, x: `${Math.random() * 100}%`, opacity: 0 }}
          animate={{ 
            y: ['0vh', '100vh'],
            opacity: [0, 0.3, 0]
          }}
          transition={{ 
            duration: 2 + Math.random() * 3, 
            repeat: Infinity, 
            delay: i * 1.5,
            ease: "linear" 
          }}
          className="absolute w-[1px] h-20 bg-gradient-to-b from-transparent via-sky-400/50 to-transparent"
        />
      ))}

      {/* Circular Ripples at Bottom */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`ripple-${i}`}
          initial={{ scale: 0, opacity: 0, x: '-50%', y: '50%' }}
          animate={{ 
            scale: [0, 3],
            opacity: [0.3, 0]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            delay: i * 2,
            ease: "easeOut" 
          }}
          className="absolute bottom-[-10%] left-1/2 w-[500px] h-[500px] border border-sky-500/10 rounded-full"
        />
      ))}

      {/* Background Liquid Ambiance */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0e0a] via-sky-950/5 to-[#0d0e0a]" />
    </div>
  );
};

// --- ORBITING CARD COMPONENT ---
const OrbitCard = ({ service, angle, onOpenDetails, onOpenVideo }) => {
  // Widened radii to prevent cards from 'collapsing' into each other
  const x = Math.cos(angle * (Math.PI / 180)) * 400; // Large Radius X
  const y = Math.sin(angle * (Math.PI / 180)) * 220; // Large Radius Y
  
  const z = Math.sin(angle * (Math.PI / 180));
  const scale = 0.9 + (z + 1) * 0.05; // Tight scale range (0.9 to 1.0)
  const opacity = 0.7 + (z + 1) * 0.15; 
  const zIndex = Math.round((z + 1) * 100);

  return (
    <motion.div
      animate={{ x, y, scale, opacity, zIndex }}
      transition={{ type: 'tween', ease: 'linear', duration: 0.1 }} // Smooth linear tracking
      className="absolute group"
      style={{ width: 300 }}
      onClick={() => onOpenDetails(service)}
    >
      <div className="relative p-[1px] rounded-[24px] overflow-hidden bg-[#050505] border border-white/10 shadow-2xl backdrop-blur-xl group-hover:bg-[#0a0a0a] transition-all duration-300">
        
        {/* Subtle internal shimmer */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

        <div className="relative bg-[#050505]/60 rounded-[23px] p-5 lg:p-6 z-10">
           {/* Dots pattern */}
           <div className="absolute inset-0 opacity-[0.1] bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
           
           <div className="relative z-10">
             <div className="flex items-center justify-between mb-3">
                <span className="text-xl">{service.icon}</span>
                <motion.button 
                  onClick={(e) => { e.stopPropagation(); onOpenVideo(service.video); }}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  className="relative group/vid p-[1px] rounded-full overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.08)]"
                >
                  {/* Rotating Gradient Border - Highly Visible Initial State */}
                  <div className="absolute inset-0 bg-[conic-gradient(from_0deg,#b7ed16,#0ea5e9,#b7ed16)] animate-[spin_3s_linear_infinite] opacity-70 group-hover/vid:opacity-100 transition-opacity" />
                  
                  {/* Button Core */}
                  <div className="relative w-12 h-12 bg-[#050505] rounded-full flex items-center justify-center text-white/80 group-hover/vid:text-[#b7ed16] transition-all">
                    <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                </motion.button>
             </div>
             <h4 className="text-[15px] font-black text-white mb-0.5">{service.name}</h4>
             <p className="text-[9px] text-[#b7ed16] font-black uppercase tracking-widest mb-3">{service.impact}</p>
             
             <button className="w-full py-2.5 rounded-xl bg-white/10 group-hover:bg-[#b7ed16] border border-white/20 group-hover:border-[#b7ed16] text-white group-hover:text-black font-black uppercase text-[10px] tracking-[1.5px] transition-all duration-300 shadow-lg">
                {service.cta} →
             </button>
           </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function OurServices() {
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [angleOffset, setAngleOffset] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const requestRef = useRef();

  // Smoothing rotation logic
  const animate = () => {
    if (!isPaused) {
      setAngleOffset(prev => (prev + 0.3) % 360); // 0.3 is the speed
    }
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [isPaused]);

  return (
    <section className="relative py-24 lg:py-32 bg-[#0d0e0a] overflow-hidden min-h-[900px]">
      
      {/* Background Ambience */}
      <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] bg-[#b7ed16]/5 blur-[250px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[60%] h-[60%] bg-violet-600/5 blur-[250px] rounded-full pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-16 min-h-[600px]">
          
          {/* --- LEFT SIDE: NARRATIVE --- */}
          <div className="w-full lg:w-5/12 z-20">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8">
                 <span className="w-1.5 h-1.5 rounded-full bg-[#b7ed16] animate-pulse" />
                 <span className="text-[10px] font-black uppercase tracking-[3px] text-white/60">Service Universe</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white leading-[1.1] mb-8">
                Services That<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-[#b7ed16]">Revolutionize.</span>
              </h2>
              <p className="text-lg text-white/50 font-medium leading-relaxed mb-10">
                A 360° circular ecosystem of technology designed to propel Indian businesses into the future. Discover your growth path.
              </p>

              {/* Trust Timeline */}
              <div className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5 backdrop-blur-xl mb-10">
                 <div className="space-y-6">
                    {['Select Your Service', 'Audit Tech Strategy', 'Earn 3X Faster'].map((t, i) => (
                      <div key={i} className="flex gap-4 items-center">
                         <div className="w-1.5 h-1.5 rounded-full bg-[#b7ed16]" />
                         <p className="text-white text-sm font-black uppercase tracking-wider">{t}</p>
                      </div>
                    ))}
                 </div>
              </div>

              <button className="px-10 py-4 rounded-full bg-white text-black font-black uppercase text-xs tracking-[2px] transition-all hover:bg-[#b7ed16] hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                 Start Your Journey
              </button>
            </motion.div>
          </div>

          {/* --- RIGHT SIDE: THE ORBITING GALAXY --- */}
          <div 
            className="w-full lg:w-7/12 relative h-[500px] flex items-center justify-center"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Neural Center Core */}
            <div className="relative w-32 h-32 flex items-center justify-center animate-pulse">
               <div className="absolute inset-0 bg-violet-600/30 blur-3xl rounded-full" />
               <div className="absolute inset-4 bg-[#b7ed16] blur-xl rounded-full opacity-40" />
               <div className="relative z-10 w-24 h-24 bg-white/10 border border-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                  <span className="text-white font-black text-[10px] tracking-widest uppercase px-2 text-center">DEXTERDIGI</span>
               </div>
               {/* Orbital Rings Decorations */}
               <div className="absolute w-[400px] h-[400px] border border-white/5 rounded-full pointer-events-none" />
               <div className="absolute w-[600px] h-[200px] border border-white/5 rounded-full rotate-12 pointer-events-none" />
            </div>

            {/* Orbiting Cards */}
            {services.map((service, index) => {
              const currentAngle = (angleOffset + (index * (360 / services.length))) % 360;
              return (
                <OrbitCard 
                  key={service.id}
                  service={service}
                  angle={currentAngle}
                  onOpenDetails={setSelectedService}
                  onOpenVideo={setActiveVideoId}
                />
              );
            })}
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* MODALS */}
      <ServiceDetailModal isOpen={!!selectedService} onClose={() => setSelectedService(null)} service={selectedService} />
      <VideoModal isOpen={!!activeVideoId} onClose={() => setActiveVideoId(null)} videoId={activeVideoId || 'ZK-rNEhJIDs'} />
    </section>
  );
}
