import React, { forwardRef, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Database, Cpu, BrainCircuit, ShieldCheck, Activity, Radio, Sparkles } from 'lucide-react';
import { LaptopScreenContent } from './LaptopScreenContent';

export const LaptopMockup = forwardRef(({
  onStartProjectClick,
  onExploreWorkClick,
  className = ""
}, ref) => {
  const containerRef = useRef(null);
  const lidRef = useRef(null);
  const baseRef = useRef(null);
  const glareRef = useRef(null);
  
  // Satellite glass card refs for 3D parallax
  const sat1Ref = useRef(null);
  const sat2Ref = useRef(null);
  const sat3Ref = useRef(null);
  const sat4Ref = useRef(null);

  // Mouse tilt & multi-layer 3D parallax interaction
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let isScrollingDown = false;

    const handleScroll = () => {
      isScrollingDown = window.scrollY > 50;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleMouseMove = (e) => {
      if (isScrollingDown || window.innerWidth < 768) return;

      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
      const deltaY = (e.clientY - centerY) / (window.innerHeight / 2);

      // 1. Laptop 3D Tilt
      const rotY = deltaX * 9;
      const rotX = 15 - deltaY * 7;

      if (lidRef.current) {
        gsap.to(lidRef.current, {
          rotateY: rotY,
          rotateX: rotX,
          duration: 0.7,
          ease: "power2.out",
          overwrite: "auto"
        });
      }

      // 2. Glare reflection shift
      if (glareRef.current) {
        gsap.to(glareRef.current, {
          x: deltaX * 50,
          y: deltaY * 35,
          opacity: 0.7 + deltaX * 0.25,
          duration: 0.7,
          ease: "power2.out",
          overwrite: "auto"
        });
      }

      // 3. Independent 3D Parallax on Floating Glass Cards
      if (sat1Ref.current) {
        gsap.to(sat1Ref.current, {
          x: -deltaX * 35,
          y: -deltaY * 25,
          rotateZ: -deltaX * 3,
          duration: 0.8,
          ease: "power2.out",
          overwrite: "auto"
        });
      }

      if (sat2Ref.current) {
        gsap.to(sat2Ref.current, {
          x: deltaX * 30,
          y: -deltaY * 30,
          rotateZ: deltaX * 3,
          duration: 0.8,
          ease: "power2.out",
          overwrite: "auto"
        });
      }

      if (sat3Ref.current) {
        gsap.to(sat3Ref.current, {
          x: -deltaX * 25,
          y: deltaY * 20,
          rotateZ: -deltaX * 2,
          duration: 0.85,
          ease: "power2.out",
          overwrite: "auto"
        });
      }

      if (sat4Ref.current) {
        gsap.to(sat4Ref.current, {
          x: deltaX * 32,
          y: deltaY * 25,
          rotateZ: deltaX * 2.5,
          duration: 0.85,
          ease: "power2.out",
          overwrite: "auto"
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Floating animation on laptop
    const floatAnim = gsap.to(containerRef.current, {
      y: "-=10px",
      duration: 3.4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Independent hovering on satellite cards
    const s1Anim = gsap.to(sat1Ref.current, { y: "+=8px", duration: 2.8, repeat: -1, yoyo: true, ease: "sine.inOut" });
    const s2Anim = gsap.to(sat2Ref.current, { y: "-=10px", duration: 3.2, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.4 });
    const s3Anim = gsap.to(sat3Ref.current, { y: "-=7px", duration: 2.9, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.8 });
    const s4Anim = gsap.to(sat4Ref.current, { y: "+=9px", duration: 3.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.2 });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      floatAnim.kill();
      s1Anim.kill();
      s2Anim.kill();
      s3Anim.kill();
      s4Anim.kill();
    };
  }, []);

  return (
    <div
      ref={(el) => {
        containerRef.current = el;
        if (typeof ref === 'function') ref(el);
        else if (ref) ref.current = el;
      }}
      className={`laptop-mockup-root relative w-full max-w-[940px] mx-auto select-none ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      
      {/* ============================================================== */}
      {/* 3D FLOATING SATELLITE GLASSMORPHISM CARDS (ORBITING LAPTOP)    */}
      {/* ============================================================== */}
      
      {/* SATELLITE 1: Top-Left (PostgreSQL Database Pool) */}
      <div
        ref={sat1Ref}
        id="satellite-card-1"
        className="satellite-card hidden md:flex absolute -top-8 -left-12 lg:-left-16 z-30 items-center gap-3 p-3.5 rounded-2xl glass-surface border border-white/60 dark:border-white/10 shadow-elevated transition-transform pointer-events-none"
      >
        <div className="w-10 h-10 rounded-xl bg-cobalt-muted/15 dark:bg-cobalt-accent/20 border border-cobalt-muted/30 dark:border-cobalt-accent/30 flex items-center justify-center text-cobalt-muted dark:text-cobalt-accent shadow-xs">
          <Database className="w-5 h-5 stroke-[2]" />
        </div>
        <div className="text-left font-mono">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-ink-midnight dark:text-foreground">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>PostgreSQL Pool</span>
          </div>
          <div className="text-[10px] text-slate-grey dark:text-muted-foreground">
            14ms • ACID Transactions
          </div>
        </div>
      </div>

      {/* SATELLITE 2: Top-Right (ESP32 IoT Hardware Telemetry) */}
      <div
        ref={sat2Ref}
        id="satellite-card-2"
        className="satellite-card hidden md:flex absolute -top-6 -right-10 lg:-right-14 z-30 items-center gap-3 p-3.5 rounded-2xl glass-surface border border-white/60 dark:border-white/10 shadow-elevated transition-transform pointer-events-none"
      >
        <div className="w-10 h-10 rounded-xl bg-amber-500/15 dark:bg-amber-400/20 border border-amber-500/30 flex items-center justify-center text-amber-500 dark:text-amber-400 shadow-xs">
          <Cpu className="w-5 h-5 stroke-[2]" />
        </div>
        <div className="text-left font-mono">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-ink-midnight dark:text-foreground">
            <Radio className="w-3 h-3 text-amber-500 animate-pulse" />
            <span>ESP32 Telemetry</span>
          </div>
          <div className="text-[10px] text-slate-grey dark:text-muted-foreground">
            RC522 RFID 13.56MHz Active
          </div>
        </div>
      </div>

      {/* SATELLITE 3: Bottom-Left (AI YOLOv8 Model Weights) */}
      <div
        ref={sat3Ref}
        id="satellite-card-3"
        className="satellite-card hidden md:flex absolute -bottom-6 -left-10 lg:-left-12 z-30 items-center gap-3 p-3.5 rounded-2xl glass-surface border border-white/60 dark:border-white/10 shadow-elevated transition-transform pointer-events-none"
      >
        <div className="w-10 h-10 rounded-xl bg-purple-500/15 dark:bg-purple-400/20 border border-purple-500/30 flex items-center justify-center text-purple-500 dark:text-purple-400 shadow-xs">
          <BrainCircuit className="w-5 h-5 stroke-[2]" />
        </div>
        <div className="text-left font-mono">
          <div className="text-[11px] font-bold text-ink-midnight dark:text-foreground">
            YOLOv8 Detection
          </div>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
            98.4% mAP Precision
          </div>
        </div>
      </div>

      {/* SATELLITE 4: Bottom-Right (Viva Walkthrough Guarantee) */}
      <div
        ref={sat4Ref}
        id="satellite-card-4"
        className="satellite-card hidden md:flex absolute -bottom-8 -right-8 lg:-right-12 z-30 items-center gap-3 p-3.5 rounded-2xl glass-surface border border-white/60 dark:border-white/10 shadow-elevated transition-transform pointer-events-none"
      >
        <div className="w-10 h-10 rounded-xl bg-emerald-500/15 dark:bg-emerald-400/20 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-xs">
          <ShieldCheck className="w-5 h-5 stroke-[2]" />
        </div>
        <div className="text-left font-mono">
          <div className="text-[11px] font-bold text-ink-midnight dark:text-foreground">
            1-on-1 Viva Prep
          </div>
          <div className="text-[10px] text-slate-grey dark:text-muted-foreground">
            Function Walkthrough Included
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3D MACBOOK PRO HARDWARE CONTAINER                              */}
      {/* ============================================================== */}
      <div
        className="laptop-perspective-group relative w-full flex flex-col items-center"
        style={{ transformStyle: 'preserve-3d' }}
      >
        
        {/* LAPTOP LID / SCREEN UNIT */}
        <div
          ref={lidRef}
          id="laptop-lid"
          className="laptop-lid relative w-full aspect-[16/10] max-h-[530px] rounded-[18px] sm:rounded-[22px] p-[10px] sm:p-[12px] bg-[#1C1F26] dark:bg-[#252830] border border-white/20 dark:border-white/10 shadow-laptop dark:shadow-laptop-dark transition-colors"
          style={{
            transformOrigin: 'bottom center',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
            transform: 'perspective(1400px) rotateX(15deg)'
          }}
        >
          {/* Inner Display Bezel */}
          <div
            id="laptop-bezel"
            className="laptop-bezel relative w-full h-full rounded-[12px] sm:rounded-[14px] bg-[#0A0B0D] p-[6px] sm:p-[8px] flex flex-col overflow-hidden"
          >
            {/* Top Camera Sensor & Mic Indicator */}
            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-30 pointer-events-none">
              <div className="w-1.5 h-1.5 rounded-full bg-[#1C1F26] border border-white/10 flex items-center justify-center">
                <div className="w-0.5 h-0.5 rounded-full bg-cobalt-muted/80" />
              </div>
              <div className="w-0.5 h-0.5 rounded-full bg-emerald-500/60" />
            </div>

            {/* Live Screen Glass Surface */}
            <div
              id="laptop-screen"
              className="laptop-screen relative w-full h-full rounded-[8px] overflow-hidden bg-[#0D0F15] border border-black/30"
            >
              {/* Dynamic Glare Reflection Overlay */}
              <div
                ref={glareRef}
                className="screen-glass-glare absolute inset-0 pointer-events-none z-20 transition-opacity"
              />

              {/* Website Preview Composition inside screen */}
              <div id="laptop-screen-content" className="w-full h-full">
                <LaptopScreenContent
                  onStartProjectClick={onStartProjectClick}
                  onExploreWorkClick={onExploreWorkClick}
                />
              </div>
            </div>
          </div>
        </div>

        {/* LAPTOP LOWER CHASSIS & KEYBOARD DECK BASE */}
        <div
          ref={baseRef}
          id="laptop-base"
          className="laptop-base relative w-[103%] -mt-[2px] flex flex-col items-center z-10"
        >
          {/* Hinge slot */}
          <div className="w-[88%] h-[5px] bg-[#121418] dark:bg-[#16181F] rounded-t-sm border-t border-white/15 dark:border-white/10" />

          {/* Precision-milled front chassis edge */}
          <div className="w-full h-[15px] sm:h-[18px] bg-gradient-to-b from-[#2C2F37] via-[#20222A] to-[#14151B] dark:from-[#2E313A] dark:via-[#22252D] dark:to-[#171920] rounded-b-[16px] sm:rounded-b-[20px] border-b border-white/10 shadow-lg relative flex items-start justify-center pt-[1px]">
            {/* Thumb opening recess notch */}
            <div className="w-16 sm:w-20 h-[3px] sm:h-[4px] rounded-full bg-[#0D0E12] dark:bg-[#0A0B0E] border-t border-black/50" />
          </div>

          {/* Deep Ambient Occlusion Shadow */}
          <div className="w-[94%] h-[28px] sm:h-[36px] -mt-[6px] bg-ink-midnight/25 dark:bg-black/75 blur-xl rounded-full pointer-events-none -z-10" />
        </div>

      </div>
    </div>
  );
});

LaptopMockup.displayName = 'LaptopMockup';
