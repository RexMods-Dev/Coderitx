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
      // 1. Initial Hero Entrance Animation on Page Load (Smooth, Luxurious Easing)
      const introTl = gsap.timeline({ defaults: { ease: "power3.out" } });

      introTl.fromTo(".hero-status-pill", 
        { opacity: 0, y: -24 }, 
        { opacity: 1, y: 0, duration: 0.8 }
      )
      .fromTo(".hero-headline", 
        { opacity: 0, y: 35 }, 
        { opacity: 1, y: 0, duration: 1.0 }, 
        "-=0.4"
      )
      .fromTo(".hero-description", 
        { opacity: 0, y: 25 }, 
        { opacity: 1, y: 0, duration: 0.9 }, 
        "-=0.5"
      )
      .fromTo(".hero-cta-group", 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.8 }, 
        "-=0.5"
      )
      .fromTo(".hero-domain-strip", 
        { opacity: 0, y: 15 }, 
        { opacity: 1, y: 0, duration: 0.8 }, 
        "-=0.4"
      )
      .fromTo(".laptop-mockup-root", 
        { opacity: 0, scale: 0.92, y: 50 }, 
        { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "power3.out" }, 
        "-=0.6"
      )
      .fromTo(".satellite-card",
        { opacity: 0, scale: 0.75, y: 30 },
        { opacity: 1, scale: 1, y: 0, stagger: 0.12, duration: 0.9, ease: "back.out(1.5)" },
        "-=0.6"
      );

      // 2. Responsive Scroll-Driven Parallax with gsap.matchMedia()
      const mm = gsap.matchMedia();

      // Desktop Breakpoint: Deep Multi-Layer 3D Scroll Parallax
      mm.add("(min-width: 769px)", () => {
        if (prefersReducedMotion) return;

        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
            invalidateOnRefresh: true,
          }
        });

        // Hero Text glides upward and softens into the background
        scrollTl.to(heroContentRef.current, {
          y: -90,
          opacity: 0.1,
          ease: "none"
        }, 0)

        // Laptop Lid gently un-tilts and glides with physical weight
        .to("#laptop-lid", {
          rotateX: 0,
          y: 75,
          scale: 1.05,
          ease: "none"
        }, 0)

        // Laptop Base accompanies lid to preserve physical device unity
        .to("#laptop-base", {
          y: 65,
          scale: 1.03,
          ease: "none"
        }, 0)

        // Ambient Background Aura drifts at different depth
        .to(".laptop-aura-glow", {
          y: 45,
          scale: 1.15,
          opacity: 0.8,
          ease: "none"
        }, 0)

        // Orbiting Satellite Cards disperse with individual spatial velocities
        .to("#satellite-card-1", {
          y: -110,
          x: -35,
          rotateZ: -5,
          ease: "none"
        }, 0)
        .to("#satellite-card-2", {
          y: -130,
          x: 35,
          rotateZ: 6,
          ease: "none"
        }, 0)
        .to("#satellite-card-3", {
          y: 85,
          x: -40,
          rotateZ: -4,
          ease: "none"
        }, 0)
        .to("#satellite-card-4", {
          y: 105,
          x: 45,
          rotateZ: 5,
          ease: "none"
        }, 0);
      });

      // Mobile Breakpoint: Smooth Touch Parallax without overflow
      mm.add("(max-width: 768px)", () => {
        if (prefersReducedMotion) return;

        const mobileScrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.0,
            invalidateOnRefresh: true,
          }
        });

        mobileScrollTl.to(heroContentRef.current, {
          y: -40,
          opacity: 0.25,
          ease: "none"
        }, 0)
        .to("#laptop-lid", {
          rotateX: 4,
          y: 35,
          scale: 1.02,
          ease: "none"
        }, 0)
        .to("#laptop-base", {
          y: 30,
          ease: "none"
        }, 0);
      });

    }, heroSectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroSectionRef}
      id="home"
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-14 sm:pt-36 sm:pb-20 md:pt-40 md:pb-24 border-b border-border-soft dark:border-border-dark bg-ivory-warm dark:bg-background overflow-hidden"
    >
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 bg-subtle-grid opacity-80 pointer-events-none" />

      {/* Radiant Glowing Glassmorphism Ambient Mesh */}
      <div className="laptop-aura-glow absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] sm:w-[860px] h-[380px] sm:h-[460px] bg-gradient-to-r from-cobalt-muted/15 via-purple-500/10 to-indigo-500/15 dark:from-cobalt-accent/15 dark:via-purple-500/10 dark:to-indigo-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />

      {/* Main Hero Header Content */}
      <div
        ref={heroContentRef}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20 transition-all duration-300"
      >
        {/* Studio Status Pill with Glassmorphism */}
        <div className="hero-status-pill inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-border-soft/80 dark:border-border-dark/80 glass-pill shadow-subtle text-[11px] sm:text-xs font-mono text-slate-grey dark:text-muted-foreground mb-5 sm:mb-6">
          <span className="w-2 h-2 rounded-full bg-cobalt-muted dark:bg-cobalt-accent animate-pulse shadow-[0_0_8px_rgba(82,103,216,0.8)]" />
          <span className="font-semibold text-ink-midnight dark:text-foreground">Coderitz Engineering Studio</span>
          <span className="text-border-soft dark:text-border-dark hidden xs:inline">•</span>
          <span className="hidden xs:inline">Academic &amp; Practical Software</span>
        </div>

        {/* Primary Headline with Authority & Mobile Balance */}
        <h1 className="hero-headline font-display text-3xl xs:text-4xl sm:text-5xl lg:text-[4.2rem] font-extrabold tracking-tight text-ink-midnight dark:text-foreground leading-[1.12] mb-5 sm:mb-6">
          Ideas deserve to become<br />
          <span className="text-cobalt-muted dark:text-cobalt-accent">something real.</span>
        </h1>

        {/* Supporting Copy */}
        <p className="hero-description text-sm sm:text-base lg:text-lg text-slate-grey dark:text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-7 sm:mb-9 px-2">
          From academic concepts to practical software applications, Coderitz brings ideas to life through thoughtful engineering, structured development and technical collaboration.
        </p>

        {/* Action Buttons (Mobile Full-Width, Desktop Inline) */}
        <div className="hero-cta-group flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-3.5 mb-8 sm:mb-10 w-full max-w-md sm:max-w-none mx-auto">
          <Button
            size="lg"
            variant="primary"
            onClick={onStartProjectClick}
            className="w-full sm:w-auto gap-2 shadow-sm text-sm sm:text-base px-7 py-3.5 h-12 justify-center"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4" />
          </Button>

          <Button
            size="lg"
            variant="secondary"
            onClick={onExploreWorkClick}
            className="w-full sm:w-auto text-sm sm:text-base px-7 py-3.5 h-12 justify-center"
          >
            Explore Our Work
          </Button>
        </div>

        {/* Supporting Technical Domain Strip */}
        <div className="hero-domain-strip inline-block border-t border-border-soft dark:border-border-dark pt-4 sm:pt-5 w-full">
          <p className="text-[11px] sm:text-xs md:text-sm font-mono text-slate-grey dark:text-muted-foreground font-medium flex items-center justify-center flex-wrap gap-x-2 gap-y-1">
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

      {/* Cinematic Laptop Mockup Stage with 3D Holographic Satellites */}
      <div
        ref={laptopWrapperRef}
        className="w-full max-w-5xl mx-auto px-3 sm:px-6 relative z-10 mt-6 sm:mt-10 md:mt-12 perspective-container"
      >
        <LaptopMockup
          onStartProjectClick={onStartProjectClick}
          onExploreWorkClick={onExploreWorkClick}
        />

        {/* Scroll Instruction Hint for Desktop */}
        <div className="hidden md:flex items-center justify-center gap-2 mt-7 text-xs font-mono text-slate-grey/70 dark:text-muted-foreground/60 select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-cobalt-muted dark:bg-cobalt-accent animate-bounce" />
          <span>Interactive 3D Stage • Scroll down for smooth spatial parallax</span>
          <ChevronDown className="w-3.5 h-3.5 text-cobalt-muted dark:text-cobalt-accent animate-bounce" />
        </div>
      </div>

    </section>
  );
}
