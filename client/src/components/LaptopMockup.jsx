import React, { forwardRef, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Database, Cpu, BrainCircuit, ShieldCheck, Activity, Radio, Sparkles, Terminal } from 'lucide-react';
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
  const shadowRef = useRef(null);

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
      isScrollingDown = window.scrollY > 80;
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

      // 1. Laptop 3D Tilt with smooth, luxurious dampening
      const rotY = deltaX * 12;
      const rotX = 14 - deltaY * 9;

      if (lidRef.current) {
        gsap.to(lidRef.current, {
          rotateY: rotY,
          rotateX: rotX,
          duration: 1.0,
          ease: "power3.out",
          overwrite: "auto"
        });
      }

      // 2. Glare reflection shift
      if (glareRef.current) {
        gsap.to(glareRef.current, {
          x: deltaX * 70,
          y: deltaY * 50,
          opacity: 0.6 + deltaX * 0.25,
          duration: 1.0,
          ease: "power3.out",
          overwrite: "auto"
        });
      }

      // 3. Ambient Shadow offset
      if (shadowRef.current) {
        gsap.to(shadowRef.current, {
          x: -deltaX * 20,
          scaleX: 1 - Math.abs(deltaX) * 0.06,
          duration: 1.0,
          ease: "power3.out",
          overwrite: "auto"
        });
      }

      // 4. Independent 3D Parallax on Floating Glass Cards
      if (sat1Ref.current) {
        gsap.to(sat1Ref.current, {
          x: -deltaX * 45,
          y: -deltaY * 35,
          rotateZ: -deltaX * 4.5,
          duration: 1.1,
          ease: "power3.out",
          overwrite: "auto"
        });
      }

      if (sat2Ref.current) {
        gsap.to(sat2Ref.current, {
          x: deltaX * 42,
          y: -deltaY * 38,
          rotateZ: deltaX * 4,
          duration: 1.1,
          ease: "power3.out",
          overwrite: "auto"
        });
      }

      if (sat3Ref.current) {
        gsap.to(sat3Ref.current, {
          x: -deltaX * 36,
          y: deltaY * 30,
          rotateZ: -deltaX * 3,
          duration: 1.15,
          ease: "power3.out",
          overwrite: "auto"
        });
      }

      if (sat4Ref.current) {
        gsap.to(sat4Ref.current, {
          x: deltaX * 44,
          y: deltaY * 36,
          rotateZ: deltaX * 3.5,
          duration: 1.15,
          ease: "power3.out",
          overwrite: "auto"
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Continuous breathing float animation on laptop
    const floatAnim = gsap.to(containerRef.current, {
      y: "-=14px",
      duration: 4.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Independent hovering on satellite cards with phase offsets
    const s1Anim = gsap.to(sat1Ref.current, { y: "+=12px", duration: 3.4, repeat: -1, yoyo: true, ease: "sine.inOut" });
    const s2Anim = gsap.to(sat2Ref.current, { y: "-=14px", duration: 3.8, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.5 });
    const s3Anim = gsap.to(sat3Ref.current, { y: "-=10px", duration: 3.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.9 });
    const s4Anim = gsap.to(sat4Ref.current, { y: "+=13px", duration: 4.0, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.3 });

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
      className={`laptop-mockup-root relative w-full max-w-[960px] mx-auto select-none ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      
      {/* Radiant Glowing Background Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] h-[85%] bg-gradient-to-tr from-cobalt-muted/20 via-indigo-500/15 to-purple-500/20 dark:from-cobalt-accent/25 dark:via-indigo-500/20 dark:to-purple-500/15 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse-glow" />

      {/* ============================================================== */}
      {/* 3D FLOATING SATELLITE GLASSMORPHISM CARDS (DESKTOP)             */}
      {/* ============================================================== */}
      
      {/* SATELLITE 1: Top-Left (PostgreSQL Database Pool) */}
      <div
        ref={sat1Ref}
        id="satellite-card-1"
        className="satellite-card hidden md:flex absolute -top-10 -left-10 lg:-left-16 z-30 items-center gap-3 p-3.5 rounded-2xl glass-surface dark:bg-[#1A1D26]/95 border border-white/70 dark:border-white/15 shadow-[0_12px_36px_rgba(23,25,31,0.1)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.5)] transition-all pointer-events-auto hover:scale-105"
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cobalt-muted/20 to-cobalt-muted/5 dark:from-cobalt-accent/25 dark:to-cobalt-accent/5 border border-cobalt-muted/30 dark:border-cobalt-accent/30 flex items-center justify-center text-cobalt-muted dark:text-cobalt-accent shadow-inner">
          <Database className="w-5 h-5 stroke-[2]" />
        </div>
        <div className="text-left font-mono">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-ink-midnight dark:text-white">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            <span>PostgreSQL Pool</span>
          </div>
          <div className="text-[10px] text-slate-grey dark:text-slate-300 flex items-center gap-1">
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">14ms latency</span>
            <span>• ACID Safe</span>
          </div>
        </div>
      </div>

      {/* SATELLITE 2: Top-Right (ESP32 IoT Hardware Telemetry) */}
      <div
        ref={sat2Ref}
        id="satellite-card-2"
        className="satellite-card hidden md:flex absolute -top-8 -right-8 lg:-right-14 z-30 items-center gap-3 p-3.5 rounded-2xl glass-surface dark:bg-[#1A1D26]/95 border border-white/70 dark:border-white/15 shadow-[0_12px_36px_rgba(23,25,31,0.1)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.5)] transition-all pointer-events-auto hover:scale-105"
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-500/5 dark:from-amber-400/25 dark:to-amber-400/5 border border-amber-500/30 flex items-center justify-center text-amber-500 dark:text-amber-400 shadow-inner">
          <Cpu className="w-5 h-5 stroke-[2]" />
        </div>
        <div className="text-left font-mono">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-ink-midnight dark:text-white">
            <Radio className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span>ESP32 Telemetry</span>
          </div>
          <div className="text-[10px] text-slate-grey dark:text-slate-300">
            RC522 RFID 13.56MHz Active
          </div>
        </div>
      </div>

      {/* SATELLITE 3: Bottom-Left (AI YOLOv8 Model Weights) */}
      <div
        ref={sat3Ref}
        id="satellite-card-3"
        className="satellite-card hidden md:flex absolute -bottom-8 -left-8 lg:-left-12 z-30 items-center gap-3 p-3.5 rounded-2xl glass-surface dark:bg-[#1A1D26]/95 border border-white/70 dark:border-white/15 shadow-[0_12px_36px_rgba(23,25,31,0.1)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.5)] transition-all pointer-events-auto hover:scale-105"
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 dark:from-purple-400/25 dark:to-purple-400/5 border border-purple-500/30 flex items-center justify-center text-purple-500 dark:text-purple-400 shadow-inner">
          <BrainCircuit className="w-5 h-5 stroke-[2]" />
        </div>
        <div className="text-left font-mono">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-ink-midnight dark:text-white">
            <Sparkles className="w-3.5 h-3.5 text-purple-500" />
            <span>YOLOv8 Vision AI</span>
          </div>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
            <span>98.4% mAP</span>
            <span className="text-slate-grey dark:text-slate-300 font-normal">• 32 FPS GPU</span>
          </div>
        </div>
      </div>

      {/* SATELLITE 4: Bottom-Right (Viva Walkthrough Guarantee) */}
      <div
        ref={sat4Ref}
        id="satellite-card-4"
        className="satellite-card hidden md:flex absolute -bottom-10 -right-6 lg:-right-12 z-30 items-center gap-3 p-3.5 rounded-2xl glass-surface dark:bg-[#1A1D26]/95 border border-white/70 dark:border-white/15 shadow-[0_12px_36px_rgba(23,25,31,0.1)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.5)] transition-all pointer-events-auto hover:scale-105"
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 dark:from-emerald-400/25 dark:to-emerald-400/5 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-inner">
          <ShieldCheck className="w-5 h-5 stroke-[2]" />
        </div>
        <div className="text-left font-mono">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-ink-midnight dark:text-white">
            <span>1-on-1 Viva Defense</span>
          </div>
          <div className="text-[10px] text-slate-grey dark:text-slate-300">
            Full Code Walkthrough Included
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
          className="laptop-lid relative w-full aspect-[16/11] sm:aspect-[16/10] min-h-[290px] sm:min-h-[420px] max-h-[540px] rounded-[16px] sm:rounded-[24px] p-[8px] sm:p-[12px] bg-gradient-to-b from-[#252830] via-[#1E2027] to-[#16181F] dark:from-[#2C2F3A] dark:via-[#22252F] dark:to-[#181A22] border border-white/25 dark:border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.1)_inset] dark:shadow-[0_30px_70px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.08)_inset] transition-colors"
          style={{
            transformOrigin: 'bottom center',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
            transform: 'perspective(1400px) rotateX(14deg)'
          }}
        >
          {/* Outer Chamfer Rim Highlight */}
          <div className="absolute inset-0 rounded-[16px] sm:rounded-[24px] border border-white/10 pointer-events-none" />

          {/* Inner Display Bezel (MacBook Pro Ultra-Slim Bezel) */}
          <div
            id="laptop-bezel"
            className="laptop-bezel relative w-full h-full rounded-[10px] sm:rounded-[16px] bg-[#0A0B0E] p-[4px] sm:p-[7px] flex flex-col overflow-hidden"
          >
            {/* Top Camera Housing Notch & Mic Sensor */}
            <div className="absolute top-0.5 sm:top-1 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-30 pointer-events-none px-2.5 sm:px-3 py-0.5 rounded-b-md bg-[#0A0B0E]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#181A20] border border-white/15 flex items-center justify-center">
                <div className="w-0.5 h-0.5 rounded-full bg-cobalt-accent/90 shadow-[0_0_4px_rgba(129,144,240,0.8)]" />
              </div>
              <div className="w-0.5 h-0.5 rounded-full bg-emerald-400/90 shadow-[0_0_4px_rgba(52,211,153,0.9)] animate-pulse" />
            </div>

            {/* Live Screen Glass Surface */}
            <div
              id="laptop-screen"
              className="laptop-screen relative w-full h-full rounded-[7px] sm:rounded-[10px] overflow-hidden bg-[#0A0C12] border border-black/40 flex flex-col"
            >
              {/* Dynamic Glare Reflection Overlay */}
              <div
                ref={glareRef}
                className="screen-glass-glare absolute inset-0 pointer-events-none z-20 transition-opacity"
              />

              {/* Website / IDE Preview Content */}
              <div id="laptop-screen-content" className="w-full h-full flex flex-col">
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
          className="laptop-base relative w-[104%] -mt-[2px] flex flex-col items-center z-10"
        >
          {/* Keyboard backlight hinge breathing glow */}
          <div className="w-[90%] h-[5px] bg-[#101217] dark:bg-[#13151D] rounded-t-sm border-t border-white/20 dark:border-white/10 relative overflow-hidden animate-keyboard-breathe">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cobalt-muted/50 dark:via-cobalt-accent/50 to-transparent" />
          </div>

          {/* Precision CNC front chassis edge */}
          <div className="w-full h-[15px] sm:h-[18px] bg-gradient-to-b from-[#323642] via-[#242732] to-[#151720] dark:from-[#353946] dark:via-[#262936] dark:to-[#171922] rounded-b-[16px] sm:rounded-b-[20px] border-b border-white/10 shadow-lg relative flex items-start justify-center pt-[1px]">
            {/* Thumb opening recess notch */}
            <div className="w-16 sm:w-20 h-[3px] sm:h-[4px] rounded-full bg-[#0B0C10] dark:bg-[#08090C] border-t border-black/60 shadow-inner" />
          </div>

          {/* Realistic Dynamic Ambient Occlusion Shadow */}
          <div
            ref={shadowRef}
            className="w-[94%] h-[28px] sm:h-[38px] -mt-[6px] bg-ink-midnight/40 dark:bg-black/90 blur-2xl rounded-full pointer-events-none -z-10 transition-transform"
          />
        </div>

      </div>

      {/* ============================================================== */}
      {/* MOBILE TELEMETRY STRIP (Visible only on < md screens)          */}
      {/* ============================================================== */}
      <div className="mt-5 grid grid-cols-2 gap-2 md:hidden">
        <div className="p-2.5 rounded-xl glass-surface dark:bg-[#1A1D26]/90 border border-border-soft dark:border-border-dark flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-cobalt-muted/15 text-cobalt-muted dark:text-cobalt-accent flex items-center justify-center flex-shrink-0">
            <Database className="w-3.5 h-3.5" />
          </div>
          <div className="font-mono text-[10px] leading-tight truncate">
            <div className="font-bold text-ink-midnight dark:text-white flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>PostgreSQL</span>
            </div>
            <div className="text-slate-grey dark:text-slate-400 text-[9px]">14ms ACID Pool</div>
          </div>
        </div>

        <div className="p-2.5 rounded-xl glass-surface dark:bg-[#1A1D26]/90 border border-border-soft dark:border-border-dark flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-500/15 text-amber-500 flex items-center justify-center flex-shrink-0">
            <Cpu className="w-3.5 h-3.5" />
          </div>
          <div className="font-mono text-[10px] leading-tight truncate">
            <div className="font-bold text-ink-midnight dark:text-white flex items-center gap-1">
              <Radio className="w-2.5 h-2.5 text-amber-500" />
              <span>ESP32</span>
            </div>
            <div className="text-slate-grey dark:text-slate-400 text-[9px]">RFID Telemetry</div>
          </div>
        </div>

        <div className="p-2.5 rounded-xl glass-surface dark:bg-[#1A1D26]/90 border border-border-soft dark:border-border-dark flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-purple-500/15 text-purple-500 flex items-center justify-center flex-shrink-0">
            <BrainCircuit className="w-3.5 h-3.5" />
          </div>
          <div className="font-mono text-[10px] leading-tight truncate">
            <div className="font-bold text-ink-midnight dark:text-white flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-purple-500" />
              <span>YOLOv8 AI</span>
            </div>
            <div className="text-emerald-600 dark:text-emerald-400 text-[9px] font-semibold">98.4% mAP</div>
          </div>
        </div>

        <div className="p-2.5 rounded-xl glass-surface dark:bg-[#1A1D26]/90 border border-border-soft dark:border-border-dark flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
          <div className="font-mono text-[10px] leading-tight truncate">
            <div className="font-bold text-ink-midnight dark:text-white">
              <span>Viva Defense</span>
            </div>
            <div className="text-slate-grey dark:text-slate-400 text-[9px]">1-on-1 Walkthrough</div>
          </div>
        </div>
      </div>

    </div>
  );
});

LaptopMockup.displayName = 'LaptopMockup';
