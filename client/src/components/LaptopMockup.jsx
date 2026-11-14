import React, { forwardRef, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
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

  // Mouse tilt interaction before scroll
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let isScrollingDown = false;

    // Listen to scroll to disable tilt once scrolling starts
    const handleScroll = () => {
      isScrollingDown = window.scrollY > 40;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleMouseMove = (e) => {
      if (isScrollingDown || window.innerWidth < 768) return;

      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      // Mouse position relative to center of device
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
      const deltaY = (e.clientY - centerY) / (window.innerHeight / 2);

      // Subtle, restrained luxury tilt angles
      const rotY = deltaX * 7;
      const rotX = 16 - deltaY * 5;

      if (lidRef.current) {
        gsap.to(lidRef.current, {
          rotateY: rotY,
          rotateX: rotX,
          duration: 0.8,
          ease: "power2.out",
          overwrite: "auto"
        });
      }

      if (glareRef.current) {
        gsap.to(glareRef.current, {
          x: deltaX * 40,
          y: deltaY * 30,
          opacity: 0.8 + deltaX * 0.2,
          duration: 0.8,
          ease: "power2.out",
          overwrite: "auto"
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Subtle gentle floating/breathing animation
    const floatAnim = gsap.to(containerRef.current, {
      y: "-=8px",
      duration: 3.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      floatAnim.kill();
    };
  }, []);

  return (
    <div
      ref={(el) => {
        containerRef.current = el;
        if (typeof ref === 'function') ref(el);
        else if (ref) ref.current = el;
      }}
      className={`laptop-mockup-root relative w-full max-w-[880px] mx-auto select-none ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div
        className="laptop-perspective-group relative w-full flex flex-col items-center"
        style={{ transformStyle: 'preserve-3d' }}
      >
        
        {/* LAPTOP LID / DISPLAY UNIT */}
        <div
          ref={lidRef}
          id="laptop-lid"
          className="laptop-lid relative w-full aspect-[16/10] max-h-[530px] rounded-[18px] sm:rounded-[22px] p-[10px] sm:p-[12px] bg-[#1E2128] dark:bg-[#252830] border border-white/20 dark:border-white/10 shadow-laptop dark:shadow-laptop-dark transition-colors"
          style={{
            transformOrigin: 'bottom center',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
            transform: 'perspective(1400px) rotateX(16deg)'
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
              className="laptop-screen relative w-full h-full rounded-[8px] overflow-hidden bg-ivory-warm dark:bg-background border border-black/30"
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
