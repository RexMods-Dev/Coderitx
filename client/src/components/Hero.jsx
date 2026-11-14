import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ArrowUpRight, CheckCircle2, Code2, Terminal, Sparkles, Layers } from 'lucide-react';
import { Button } from './ui/Button';
import { LaptopMockup } from './LaptopMockup';

gsap.registerPlugin(ScrollTrigger);

export function Hero({ onStartProjectClick, onExploreWorkClick }) {
  const heroSectionRef = useRef(null);
  const heroContentRef = useRef(null);
  const laptopPinRef = useRef(null);
  const laptopRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // Setup desktop cinematic scroll trigger
      ScrollTrigger.matchMedia({
        // Desktop breakpoint: Cinematic pinned perspective-to-fullscreen animation
        "(min-width: 769px)": function () {
          if (prefersReducedMotion) return;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: heroSectionRef.current,
              start: "top top",
              end: "+=1400",
              pin: true,
              scrub: 0.8,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            }
          });

          // 1. Initial subtle device setup
          gsap.set("#laptop-lid", {
            transformPerspective: 1200,
            rotateX: 18,
            rotateY: -1.5,
            scale: 0.94,
            transformOrigin: "center center"
          });

          // 2. Timeline steps:
          tl.to(heroContentRef.current, {
            opacity: 0,
            y: -40,
            duration: 0.35,
            ease: "power2.inOut"
          }, 0)
          .to("#laptop-lid", {
            rotateX: 0,
            rotateY: 0,
            scale: 2.35,
            y: 30,
            duration: 1,
            ease: "power1.inOut"
          }, 0.1)
          .to("#laptop-base", {
            opacity: 0,
            y: 40,
            duration: 0.5,
            ease: "power2.inOut"
          }, 0.3)
          .to("#laptop-bezel", {
            padding: 0,
            borderRadius: "0px",
            background: "transparent",
            duration: 0.6,
            ease: "power2.inOut"
          }, 0.4)
          .to("#laptop-lid", {
            borderRadius: "0px",
            borderWidth: "0px",
            boxShadow: "none",
            duration: 0.5,
            ease: "power2.inOut"
          }, 0.5)
          .to("#laptop-screen", {
            borderRadius: "0px",
            duration: 0.5,
            ease: "power2.inOut"
          }, 0.5)
          .to(".screen-glass-glare", {
            opacity: 0,
            duration: 0.4,
            ease: "power2.inOut"
          }, 0.4);
        },

        // Mobile breakpoint: Clean direct reveal without intrusive pinning
        "(max-width: 768px)": function () {
          gsap.set(heroContentRef.current, { opacity: 1, y: 0 });
          gsap.set("#laptop-lid", {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            y: 0
          });
        }
      });
    }, heroSectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroSectionRef}
      id="home"
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-16 md:pt-36 md:pb-24 border-b border-border-soft dark:border-border-dark bg-ivory-warm dark:bg-background overflow-hidden"
    >
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 bg-subtle-grid opacity-75 pointer-events-none" />

      {/* Ambient Lighting Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[360px] bg-cobalt-muted/[0.05] dark:bg-cobalt-accent/[0.04] rounded-full blur-3xl pointer-events-none" />

      {/* Main Hero Header Content */}
      <div
        ref={heroContentRef}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20 transition-all duration-300"
      >
        {/* Studio Status Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border-soft dark:border-border-dark bg-surface shadow-subtle text-xs font-mono text-slate-grey dark:text-muted-foreground mb-6">
          <span className="w-2 h-2 rounded-full bg-cobalt-muted dark:bg-cobalt-accent animate-pulse" />
          <span className="font-semibold text-ink-midnight dark:text-foreground">Coderitz Engineering Studio</span>
          <span className="text-border-soft dark:text-border-dark">•</span>
          <span>Academic &amp; Practical Software</span>
        </div>

        {/* Primary Headline */}
        <h1 className="font-display text-4xl sm:text-6xl lg:text-[4.25rem] font-extrabold tracking-tight text-ink-midnight dark:text-foreground leading-[1.08] mb-6">
          Ideas deserve to become<br />
          <span className="text-cobalt-muted dark:text-cobalt-accent">something real.</span>
        </h1>

        {/* Supporting Copy */}
        <p className="text-base sm:text-lg text-slate-grey dark:text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-9">
          From academic concepts to practical software applications, Coderitz brings ideas to life through thoughtful engineering, structured development and technical collaboration.
        </p>

        {/* Primary and Secondary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-10">
          <Button
            size="lg"
            variant="primary"
            onClick={onStartProjectClick}
            className="w-full sm:w-auto gap-2 shadow-sm text-sm sm:text-base px-6 py-3"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4" />
          </Button>

          <Button
            size="lg"
            variant="secondary"
            onClick={onExploreWorkClick}
            className="w-full sm:w-auto text-sm sm:text-base px-6 py-3"
          >
            Explore Our Work
          </Button>
        </div>

        {/* Supporting Technical Domain Strip */}
        <div className="inline-block border-t border-border-soft dark:border-border-dark pt-5">
          <p className="text-xs sm:text-sm font-mono text-slate-grey dark:text-muted-foreground font-medium flex items-center justify-center flex-wrap gap-x-2 gap-y-1">
            <span>Web Development</span>
            <span className="text-cobalt-muted dark:text-cobalt-accent">•</span>
            <span>AI &amp; ML</span>
            <span className="text-cobalt-muted dark:text-cobalt-accent">•</span>
            <span>Mobile Applications</span>
            <span className="text-cobalt-muted dark:text-cobalt-accent">•</span>
            <span>IoT</span>
            <span className="text-cobalt-muted dark:text-cobalt-accent">•</span>
            <span>Software Engineering</span>
          </p>
        </div>
      </div>

      {/* Cinematic Laptop Mockup Stage */}
      <div
        ref={laptopPinRef}
        className="w-full max-w-5xl mx-auto px-4 sm:px-6 relative z-10 mt-6 sm:mt-10 perspective-container"
      >
        <LaptopMockup
          ref={laptopRef}
          onStartProjectClick={onStartProjectClick}
          onExploreWorkClick={onExploreWorkClick}
        />

        {/* Scroll Instruction Hint for Desktop */}
        <div className="hidden md:flex items-center justify-center gap-2 mt-6 text-xs font-mono text-slate-grey/70 dark:text-muted-foreground/60 select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-cobalt-muted dark:bg-cobalt-accent animate-bounce" />
          <span>Scroll to explore full studio showcase</span>
        </div>
      </div>

    </section>
  );
}
