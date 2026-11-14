import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ArrowUpRight, CheckCircle2, Code2, Terminal, Sparkles, Layers, ChevronDown } from 'lucide-react';
import { Button } from './ui/Button';
import { LaptopMockup } from './LaptopMockup';

gsap.registerPlugin(ScrollTrigger);

export function Hero({ onStartProjectClick, onExploreWorkClick }) {
  const heroSectionRef = useRef(null);
  const heroContentRef = useRef(null);
  const laptopWrapperRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // 1. Initial Hero Entrance Animation on Page Load
      const introTl = gsap.timeline({ defaults: { ease: "power3.out" } });

      introTl.fromTo(".hero-status-pill", 
        { opacity: 0, y: -20 }, 
        { opacity: 1, y: 0, duration: 0.6 }
      )
      .fromTo(".hero-headline", 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.8 }, 
        "-=0.3"
      )
      .fromTo(".hero-description", 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.7 }, 
        "-=0.4"
      )
      .fromTo(".hero-cta-group", 
        { opacity: 0, y: 15 }, 
        { opacity: 1, y: 0, duration: 0.6 }, 
        "-=0.4"
      )
      .fromTo(".hero-domain-strip", 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.6 }, 
        "-=0.3"
      )
      .fromTo(".laptop-mockup-root", 
        { opacity: 0, scale: 0.9, y: 40 }, 
        { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power2.out" }, 
        "-=0.5"
      );

      // 2. Responsive Scroll-Driven Transformation
      ScrollTrigger.matchMedia({
        
        // Desktop Breakpoint (Cinematic 5-Stage Transformation)
        "(min-width: 769px)": function () {
          if (prefersReducedMotion) return;

          const scrollTl = gsap.timeline({
            scrollTrigger: {
              trigger: heroSectionRef.current,
              start: "top top",
              end: "+=1600",
              pin: true,
              scrub: 0.8,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            }
          });

          // Stage 2: Interaction - Hero text floats up & fades; Laptop rotates to flat & zooms
          scrollTl.to(heroContentRef.current, {
            opacity: 0,
            y: -60,
            duration: 0.35,
            ease: "power2.inOut"
          }, 0)
          .to("#laptop-lid", {
            rotateX: 0,
            rotateY: 0,
            scale: 1.6,
            y: -20,
            duration: 0.6,
            ease: "power1.inOut"
          }, 0.05)
          
          // Stage 3: Expansion - Screen scales larger towards viewer
          .to("#laptop-lid", {
            scale: 2.45,
            y: 40,
            duration: 0.5,
            ease: "power2.inOut"
          }, 0.4)

          // Stage 4: Hardware Disappearance - Base, bezel, and glare fade away
          .to("#laptop-base", {
            opacity: 0,
            y: 50,
            duration: 0.3,
            ease: "power2.inOut"
          }, 0.45)
          .to("#laptop-bezel", {
            padding: 0,
            borderRadius: "0px",
            background: "transparent",
            duration: 0.4,
            ease: "power2.inOut"
          }, 0.5)
          .to("#laptop-lid", {
            borderRadius: "0px",
            borderWidth: "0px",
            boxShadow: "none",
            duration: 0.4,
            ease: "power2.inOut"
          }, 0.55)
          .to(".screen-glass-glare", {
            opacity: 0,
            duration: 0.3,
            ease: "power2.inOut"
          }, 0.5)
          
          // Stage 5: Website Takeover - Screen expands to occupy full frame
          .to("#laptop-screen", {
            borderRadius: "0px",
            borderWidth: "0px",
            duration: 0.4,
            ease: "power2.inOut"
          }, 0.6);
        },

        // Mobile Breakpoint (Fluid touch presentation without restrictive scroll pinning)
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
      className="relative min-h-screen flex flex-col justify-between pt-32 pb-16 sm:pt-40 sm:pb-24 border-b border-border-soft dark:border-border-dark bg-ivory-warm dark:bg-background overflow-hidden"
    >
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 bg-subtle-grid opacity-80 pointer-events-none" />

      {/* Ambient Lighting Depth */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[760px] h-[380px] bg-cobalt-muted/[0.05] dark:bg-cobalt-accent/[0.04] rounded-full blur-3xl pointer-events-none" />

      {/* Main Hero Header Content */}
      <div
        ref={heroContentRef}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20 transition-all duration-300"
      >
        {/* Studio Status Pill */}
        <div className="hero-status-pill inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border-soft dark:border-border-dark bg-surface shadow-subtle text-xs font-mono text-slate-grey dark:text-muted-foreground mb-6">
          <span className="w-2 h-2 rounded-full bg-cobalt-muted dark:bg-cobalt-accent animate-pulse" />
          <span className="font-semibold text-ink-midnight dark:text-foreground">Coderitz Engineering Studio</span>
          <span className="text-border-soft dark:text-border-dark">•</span>
          <span>Academic &amp; Practical Software</span>
        </div>

        {/* Primary Headline with Editorial Authority */}
        <h1 className="hero-headline font-display text-4xl sm:text-6xl lg:text-[4.5rem] font-extrabold tracking-tight text-ink-midnight dark:text-foreground leading-[1.06] mb-6">
          Ideas deserve to become<br />
          <span className="text-cobalt-muted dark:text-cobalt-accent">something real.</span>
        </h1>

        {/* Supporting Copy */}
        <p className="hero-description text-base sm:text-lg lg:text-xl text-slate-grey dark:text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-9">
          From academic concepts to practical software applications, Coderitz brings ideas to life through thoughtful engineering, structured development and technical collaboration.
        </p>

        {/* Action Buttons */}
        <div className="hero-cta-group flex flex-wrap items-center justify-center gap-3.5 mb-10">
          <Button
            size="lg"
            variant="primary"
            onClick={onStartProjectClick}
            className="w-full sm:w-auto gap-2 shadow-sm text-sm sm:text-base px-7 py-3.5"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4" />
          </Button>

          <Button
            size="lg"
            variant="secondary"
            onClick={onExploreWorkClick}
            className="w-full sm:w-auto text-sm sm:text-base px-7 py-3.5"
          >
            Explore Our Work
          </Button>
        </div>

        {/* Supporting Technical Domain Strip */}
        <div className="hero-domain-strip inline-block border-t border-border-soft dark:border-border-dark pt-5">
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
        ref={laptopWrapperRef}
        className="w-full max-w-5xl mx-auto px-4 sm:px-6 relative z-10 mt-8 sm:mt-12 perspective-container"
      >
        <LaptopMockup
          onStartProjectClick={onStartProjectClick}
          onExploreWorkClick={onExploreWorkClick}
        />

        {/* Scroll Instruction Hint for Desktop */}
        <div className="hidden md:flex items-center justify-center gap-2 mt-6 text-xs font-mono text-slate-grey/70 dark:text-muted-foreground/60 select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-cobalt-muted dark:bg-cobalt-accent animate-bounce" />
          <span>Scroll down to expand studio preview</span>
          <ChevronDown className="w-3.5 h-3.5 text-cobalt-muted dark:text-cobalt-accent animate-bounce" />
        </div>
      </div>

    </section>
  );
}
