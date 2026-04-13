'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const caseStudies = [
    {
        id: 'vs-mart',
        name: 'VS Mart',
        category: 'E-commerce Application',
        impact: 'Increased revenue by 3x in 6 months',
        metrics: [
            { label: 'Revenue Growth', value: '+310%' },
            { label: 'Active Users', value: '1.2M' },
            { label: 'Conversion Rate', value: '4.8%' }
        ],
        tech: ['React', 'Node.js', 'MongoDB', 'AWS'],
        features: [
            'Smart AI inventory prediction system',
            'Real-time order tracking & routing',
            'Frictionless checkout experience'
        ],
        image: '/images/portfolio/vsmart.png',
        link: '/case-study/vs-mart'
    },
    {
        id: 'syncro-crm',
        name: 'Syncro CRM',
        category: 'SaaS Platform',
        impact: 'Reduced operational friction by 60%',
        metrics: [
            { label: 'Time Saved', value: '25hrs/wk' },
            { label: 'Client Retention', value: '98%' },
            { label: 'Data Accuracy', value: '99.9%' }
        ],
        tech: ['Next.js', 'PostgreSQL', 'Redis', 'Docker'],
        features: [
            'Automated pipeline management',
            'Advanced predictive analytics',
            'Role-based access control'
        ],
        image: '/images/portfolio/syncro.png',
        link: '/case-study/syncro'
    },
    {
        id: 'logisttrack',
        name: 'LogistTrack',
        category: 'Fleet Management System',
        impact: 'Optimized delivery routes across 3 states',
        metrics: [
            { label: 'Fuel Saved', value: '18%' },
            { label: 'Fleet Active', value: '1,842' },
            { label: 'On-time Delivery', value: '96.5%' }
        ],
        tech: ['React Native', 'Go', 'Kubernetes', 'GCP'],
        features: [
            'Live GPS fleet tracking map',
            'AI-driven route optimization',
            'Instant critical alert system'
        ],
        image: '/images/portfolio/logisttrack.png',
        link: '/case-study/logistics'
    },
    {
        id: 'cut2cut',
        name: 'Cut2Cut.live',
        category: 'Media & News Application',
        impact: 'Scaled to 250k daily active readers',
        metrics: [
            { label: 'Daily Users', value: '250K+' },
            { label: 'Session Time', value: '12m' },
            { label: 'Server Uptime', value: '99.99%' }
        ],
        tech: ['React Native', 'Node.js', 'Socket.io', 'AWS Mux'],
        features: [
            'Sub-second live video streaming',
            'Real-time breaking news tickers',
            'Personalized AI news feed'
        ],
        image: '/images/portfolio/cut2cut.png',
        link: '/case-study/cut2cut'
    },
    {
        id: 'rsstudio',
        name: 'RSStudio',
        category: 'Video Editor Portfolio',
        impact: 'Generated $500k in inbound client leads',
        metrics: [
            { label: 'Client Inquiries', value: '+450%' },
            { label: 'Bounce Rate', value: '< 15%' },
            { label: 'Video Plays', value: '1.2M' }
        ],
        tech: ['Next.js', 'Framer Motion', 'TailwindCSS', 'Vimeo API'],
        features: [
            'Cinematic 4K background grids',
            'High-performance scroll animations',
            'Automated lead capture flow'
        ],
        image: '/images/portfolio/rsstudio.png',
        link: '/case-study/rsstudio'
    }
];

const AnimatedWaveBackground = () => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#131410]">
            {/* ── Soft Lighting Blend ── */}
            <motion.div
                animate={{ opacity: [0.1, 0.15, 0.1] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-[-10%] right-[-10%] w-[50%] h-[60%] rounded-full bg-[#b7ed16] blur-[220px]"
            />
            <motion.div
                animate={{ opacity: [0.05, 0.1, 0.05], scale: [1, 1.1, 1] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[70%] rounded-full bg-[#b7ed16] blur-[200px]"
            />

            {/* ── Industrial Dot Waves Pattern ── */}
            <div
                className="absolute inset-0 opacity-50 mix-blend-screen pointer-events-none"
                style={{
                    // Using the target lighting color for dots
                    backgroundImage: `radial-gradient(rgba(183, 237, 22, 0.25) 2px, transparent 2px)`,
                    backgroundSize: '40px 40px',
                    animation: 'dotWave 10s ease-in-out infinite alternate',
                    maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)'
                }}
            />

            {/* Smooth Dark Gradient Overlays to frame the cards securely */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#131410] via-transparent to-[#131410] opacity-90 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#131410] to-transparent pointer-events-none" />
        </div>
    );
};

const CaseStudyCard = ({ project, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: index * 0.15, ease: [0.23, 1, 0.32, 1] }}
            className="group relative flex-shrink-0 w-[90vw] md:w-[75vw] lg:w-[850px] snap-center rounded-[32px] bg-white/[0.02] border border-white/5 backdrop-blur-2xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] transition-all duration-500 hover:bg-white/[0.04] hover:border-white/10"
        >
            {/* Border Glow Effect */}
            <div className="absolute inset-0 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none before:absolute before:inset-[-2px] before:rounded-[34px] before:bg-gradient-to-r before:from-violet-500/20 before:via-sky-500/20 before:to-emerald-500/20 before:-z-10" />

            <div className="flex flex-col lg:flex-row h-full relative z-10">

                {/* Giant Netflix-style Rank Number */}
                <div
                    className="pointer-events-none absolute -left-2 md:-left-6 lg:-left-12 -top-6 md:-top-12 lg:-top-16 z-0 text-[120px] md:text-[180px] lg:text-[250px] font-black leading-none opacity-30 select-none"
                    style={{
                        WebkitTextStroke: '3px rgba(183, 237, 22, 1)',
                        color: 'transparent'
                    }}
                >
                    {index + 1}
                </div>

                {/* Left: Image / Visual */}
                <div className="w-full lg:w-[45%] p-4 md:p-6 flex flex-col justify-center relative z-10">
                    <div className="relative w-full aspect-video lg:aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                        <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/10 to-transparent z-10 pointer-events-none mix-blend-overlay" />
                        <Image
                            src={project.image}
                            alt={project.name}
                            fill
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                        />
                        {/* Top Badge */}
                        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-white">Results Driven</span>
                        </div>
                    </div>
                </div>

                {/* Right: Content */}
                <div className="w-full lg:w-[55%] p-5 md:p-6 lg:pl-2 flex flex-col justify-between">

                    <div>
                        {/* Header */}
                        <div className="mb-4 lg:mb-5">
                            <p className="text-sky-400 font-bold text-[9px] lg:text-[10px] tracking-widest uppercase mb-1.5 lg:mb-2">{project.category}</p>
                            <h3 className="text-2xl lg:text-3xl font-black text-white mb-2 leading-tight">{project.name}</h3>
                            <p className="text-[13px] lg:text-[15px] text-white/70 font-medium border-l-[3px] border-violet-500 pl-3 lg:pl-4 py-1 bg-gradient-to-r from-violet-500/10 to-transparent rounded-r-lg">{project.impact}</p>
                        </div>

                        {/* Micro Metrics */}
                        <div className="grid grid-cols-3 gap-2 lg:gap-3 mb-5 lg:mb-6 p-3 lg:p-4 rounded-2xl bg-black/40 border border-white/5 shadow-inner">
                            {project.metrics.map((m, i) => (
                                <div key={i} className="flex flex-col">
                                    <span className="text-base md:text-lg lg:text-xl font-black bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">{m.value}</span>
                                    <span className="text-[8px] lg:text-[9px] font-bold uppercase tracking-widest text-white/40 mt-1">{m.label}</span>
                                </div>
                            ))}
                        </div>

                        {/* Features List */}
                        <ul className="mb-5 lg:mb-6 space-y-2 lg:space-y-2.5">
                            {project.features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-2.5 lg:gap-3 text-[11px] lg:text-[13px] font-medium text-white/80">
                                    <span className="mt-0.5 flex items-center justify-center w-3.5 h-3.5 lg:w-4 lg:h-4 rounded-full bg-emerald-500/20 text-emerald-400 shrink-0">
                                        <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </span>
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-1.5 lg:gap-2 mb-6 lg:mb-8">
                            {project.tech.map((tech, i) => (
                                <span key={i} className="px-2.5 lg:px-3 py-1 rounded-full text-[9px] lg:text-[10px] font-bold tracking-wide text-white/70 bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div>
                        <Link
                            href={project.link}
                            className="group inline-flex items-center justify-center gap-2 w-full lg:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-violet-600 to-sky-500 text-white font-black text-[13px] uppercase tracking-wide hover:scale-[1.02] hover:brightness-110 transition-all duration-300 shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_40px_rgba(14,165,233,0.5)]"
                        >
                            Explore Case Study
                            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>

                </div>
            </div>
        </motion.div>
    );
};

const OurWork = () => {
    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    // Left/Right Nav Handlers
    const scrollNav = (direction) => {
        if (scrollRef.current) {
            const cardWidth = scrollRef.current.children[0]?.offsetWidth || 850;
            const gap = window.innerWidth >= 1024 ? 32 : 24;
            const scrollAmount = direction === 'left' ? -(cardWidth + gap) : (cardWidth + gap);
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    // Drag-to-scroll handlers
    const handleMouseDown = (e) => {
        setIsDragging(true);
        startX.current = e.pageX - scrollRef.current.offsetLeft;
        scrollLeft.current = scrollRef.current.scrollLeft;
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX.current) * 1.5; // Drag speed multiplier
        scrollRef.current.scrollLeft = scrollLeft.current - walk;
    };

    return (
        <section className="relative py-24 lg:py-32 bg-[#131410] overflow-hidden">
            <AnimatedWaveBackground />
            {/* Huge Background Watermark Text */}
            <motion.div 
                animate={{ scale: [1, 1.06, 1], opacity: [0.02, 0.06, 0.02] }}
                transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none z-0 select-none flex justify-center origin-center"
            >
                <h1 className="text-[3.2vw] md:text-[3.5vw] lg:text-[3vw] xl:text-[2.8vw] font-black text-white whitespace-nowrap uppercase tracking-widest mt-12 px-4 flex items-center justify-center w-full">
                    DEXTERDIGI - BUSINESS DEVELOPMENT COMPANY
                </h1>
            </motion.div>

            {/* Header Content */}
            <div className="relative z-10 container mx-auto px-4 mb-16 max-w-4xl text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
                        <span className="text-[10px] font-black uppercase tracking-[3px] text-violet-400">Our Work</span>
                    </div>

                    <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-black text-white leading-[1.1] mb-6 tracking-tight">
                        Transforming businesses into digital brands <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-sky-400 to-emerald-400">scale & earn more.</span>
                    </h2>

                    <p className="text-sm md:text-lg text-white/50 font-bold uppercase tracking-widest max-w-2xl mx-auto">
                        👉Real Solutions. Real Growth. DexterDigi
                    </p>
                </motion.div>
            </div>

            {/* Horizontal Snap Scroll Container */}
            <div className="relative z-10 w-full group/carousel">

                {/* Stylish Left/Right Nav Buttons */}
                <button
                    onClick={() => scrollNav('left')}
                    className="absolute left-2 lg:left-[4vw] top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-[#131410]/80 border border-[#b7ed16]/50 text-[#b7ed16] backdrop-blur-md opacity-0 group-hover/carousel:opacity-100 hover:bg-[#b7ed16] hover:text-[#131410] hover:scale-110 transition-all duration-300 shadow-[0_0_20px_rgba(183,237,22,0.2)] hover:shadow-[0_0_40px_rgba(183,237,22,0.8)]"
                >
                    <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <button
                    onClick={() => scrollNav('right')}
                    className="absolute right-2 lg:right-[4vw] top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-[#131410]/80 border border-[#b7ed16]/50 text-[#b7ed16] backdrop-blur-md opacity-0 group-hover/carousel:opacity-100 hover:bg-[#b7ed16] hover:text-[#131410] hover:scale-110 transition-all duration-300 shadow-[0_0_20px_rgba(183,237,22,0.2)] hover:shadow-[0_0_40px_rgba(183,237,22,0.8)]"
                >
                    <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                <div
                    ref={scrollRef}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseUp}
                    className={`flex gap-6 lg:gap-8 px-[5vw] md:px-[12.5vw] overflow-x-auto hide-scrollbar pb-16 pt-8 relative z-20 ${isDragging ? 'snap-none cursor-grabbing select-none' : 'snap-x snap-mandatory cursor-grab'}`}
                >
                    {caseStudies.map((project, index) => (
                        <div key={project.id} className="snap-center shrink-0">
                            <CaseStudyCard project={project} index={index} />
                        </div>
                    ))}

                    {/* End cap spacing to allow last card to center perfectly */}
                    <div className="snap-center shrink-0 w-[1px] md:w-[12.5vw]" />
                </div>

                {/* Scroll Indicators / Fade Edges */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-[5vw] md:w-[10vw] bg-gradient-to-r from-[#131410] to-transparent z-20" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-[5vw] md:w-[10vw] bg-gradient-to-l from-[#131410] to-transparent z-20" />

                {/* Subtle Scroll Hint */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-4 text-white/30 text-[10px] font-black uppercase tracking-[3px] pointer-events-none opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300">
                    <span className="animate-bounce-x">←</span>
                    Scroll to explore
                    <span className="animate-bounce-x-reverse">→</span>
                </div>
            </div>

            <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        @keyframes bounce-x {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-6px); }
        }
        @keyframes bounce-x-reverse {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(6px); }
        }
        .animate-bounce-x { animation: bounce-x 1.5s infinite ease-in-out; }
        .animate-bounce-x-reverse { animation: bounce-x-reverse 1.5s infinite ease-in-out; }

        @keyframes dotWave {
          0% { background-position: 0px 0px; opacity: 0.2; }
          50% { opacity: 0.6; }
          100% { background-position: 40px 100px; opacity: 0.2; }
        }
      `}</style>
        </section>
    );
};

export default OurWork;
