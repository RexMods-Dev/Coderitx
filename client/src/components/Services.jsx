import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  GraduationCap,
  Layout,
  BrainCircuit,
  Smartphone,
  Cpu,
  Terminal,
  ArrowRight,
  Sliders,
  Check,
  RotateCcw
} from 'lucide-react';
import { servicesData } from '../data/services';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  GraduationCap,
  Layout,
  BrainCircuit,
  Smartphone,
  Cpu,
  Terminal
};

export function Services({ onSelectServiceForEnquiry }) {
  const [selectedDomain, setSelectedDomain] = useState('all');
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  // Stately header reveal on scroll
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(".services-header-anim", 
        { opacity: 0, y: 35 }, 
        {
          opacity: 1, 
          y: 0, 
          duration: 0.95, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Smooth filter transition whenever selectedDomain changes
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !gridRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(".service-dossier-card", 
        { opacity: 0, y: 25, scale: 0.98 }, 
        {
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.65, 
          stagger: 0.08, 
          ease: "power3.out"
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, [selectedDomain]);

  const filteredServices = selectedDomain === 'all'
    ? servicesData
    : servicesData.filter((s) => s.id === selectedDomain);

  return (
    <section ref={sectionRef} id="services" className="py-20 sm:py-28 md:py-36 border-b border-border-soft dark:border-border-dark bg-ivory-warm dark:bg-background relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="services-header-anim grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-12 sm:mb-16">
          
          {/* Left Column: Scope Overview */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-cobalt-muted dark:text-cobalt-accent font-semibold mb-3">
              <span>01 / What We Build</span>
            </div>
            
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold tracking-tight text-ink-midnight dark:text-foreground leading-tight mb-5">
              Comprehensive technical guidance &amp; implementation.
            </h2>
            
            <p className="text-sm sm:text-base text-slate-grey dark:text-muted-foreground leading-relaxed mb-6">
              We work with students across Computer Science and Information Technology, shaping each project from initial concept through systems architecture, coding, and defense preparation.
            </p>

            {/* Flexible Offering Statement Box */}
            <div className="p-4 sm:p-5 rounded-xl border border-border-soft dark:border-border-dark bg-surface dark:bg-[#1B1E26] shadow-subtle space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-ink-midnight dark:text-foreground uppercase tracking-tight">
                <Sliders className="w-3.5 h-3.5 text-cobalt-muted dark:text-cobalt-accent" />
                <span>Flexible Engagement Model</span>
              </div>
              <p className="text-xs text-slate-grey dark:text-muted-foreground leading-relaxed">
                No rigid packages. We adapt scope, architecture, and technology to fit your college guidelines, timeline, or prototype needs.
              </p>
            </div>
          </div>

          {/* Right Column: Filter Pills & Custom Stack Note */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full pt-1 sm:pt-2">
            <div className="space-y-3.5 sm:space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-grey dark:text-muted-foreground font-semibold">
                  Domain Categories
                </div>

                {selectedDomain !== 'all' && (
                  <button
                    type="button"
                    onClick={() => setSelectedDomain('all')}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-cobalt-muted dark:text-cobalt-accent hover:underline cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Show All (6)</span>
                  </button>
                )}
              </div>

              {/* Filter Pills with Smooth Responsive Scrolling on Mobile */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap no-scrollbar">
                <button
                  type="button"
                  onClick={() => setSelectedDomain('all')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex-shrink-0 ${
                    selectedDomain === 'all'
                      ? 'bg-ink-midnight text-white dark:bg-foreground dark:text-ink-midnight shadow-sm'
                      : 'bg-surface dark:bg-[#1B1E26] border border-border-soft dark:border-border-dark text-slate-grey dark:text-muted-foreground hover:text-ink-midnight dark:hover:text-foreground'
                  }`}
                >
                  All 6 Domains
                </button>
                {servicesData.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedDomain(s.id)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex-shrink-0 ${
                      selectedDomain === s.id
                        ? 'bg-cobalt-muted text-white dark:bg-cobalt-accent dark:text-ink-midnight shadow-sm'
                        : 'bg-surface dark:bg-[#1B1E26] border border-border-soft dark:border-border-dark text-slate-grey dark:text-muted-foreground hover:text-ink-midnight dark:hover:text-foreground'
                    }`}
                  >
                    {s.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 sm:mt-8 p-4 rounded-xl bg-surface dark:bg-[#1B1E26] border border-border-soft/80 dark:border-border-dark/80 text-xs text-slate-grey dark:text-muted-foreground flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-subtle">
              <span>Have a custom syllabus requirement or hybrid stack?</span>
              <button
                type="button"
                onClick={() => onSelectServiceForEnquiry('Custom Architecture Requirement')}
                className="text-cobalt-muted dark:text-cobalt-accent font-semibold hover:underline inline-flex items-center gap-1 self-start sm:self-auto cursor-pointer"
              >
                <span>Discuss with team</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Filter State Status Pill */}
        {selectedDomain !== 'all' && (
          <div className="mb-6 flex items-center justify-between px-4 py-2.5 rounded-xl bg-cobalt-muted/10 dark:bg-cobalt-accent/10 border border-cobalt-muted/20 dark:border-cobalt-accent/20 text-xs font-mono text-ink-midnight dark:text-foreground">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cobalt-muted dark:bg-cobalt-accent animate-pulse" />
              <span>Filtering by: <strong className="font-semibold">{servicesData.find(s => s.id === selectedDomain)?.title}</strong></span>
            </span>
            <button
              type="button"
              onClick={() => setSelectedDomain('all')}
              className="text-cobalt-muted dark:text-cobalt-accent font-semibold hover:underline cursor-pointer"
            >
              Reset to all 6
            </button>
          </div>
        )}

        {/* Distinctive Service Dossiers Grid (Dynamically filtered by selectedDomain) */}
        <div
          ref={gridRef}
          className={`services-grid-container grid gap-6 lg:gap-8 ${
            filteredServices.length === 1
              ? 'grid-cols-1 max-w-2xl mx-auto'
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {filteredServices.map((service) => {
            const Icon = iconMap[service.icon] || GraduationCap;
            return (
              <div
                key={service.id}
                className="service-dossier-card group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl border border-border-soft dark:border-border-dark bg-surface dark:bg-[#1B1E26] hover:border-cobalt-muted/40 dark:hover:border-cobalt-accent/40 shadow-subtle hover:shadow-surface hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-ivory-warm dark:bg-[#222631] border border-border-soft dark:border-border-dark flex items-center justify-center text-ink-midnight dark:text-foreground group-hover:bg-cobalt-muted group-hover:text-white dark:group-hover:bg-cobalt-accent dark:group-hover:text-ink-midnight transition-colors shadow-subtle">
                      <Icon className="w-5 h-5 stroke-[1.9]" />
                    </div>
                    <Badge variant={service.badgeVariant || "cobalt"} className="font-mono text-[11px]">
                      {service.badge}
                    </Badge>
                  </div>

                  <h3 className="font-display text-xl font-bold tracking-tight text-ink-midnight dark:text-foreground mb-2">
                    {service.title}
                  </h3>
                  
                  <p className="text-xs text-slate-grey dark:text-muted-foreground leading-relaxed mb-5">
                    {service.description}
                  </p>

                  {/* Evaluation / Architecture Spec Box */}
                  <div className="p-3.5 rounded-xl bg-ivory-warm/80 dark:bg-[#15171F] border border-border-soft dark:border-border-dark font-mono text-[11px] space-y-1.5 mb-5">
                    <div className="text-[10px] uppercase text-cobalt-muted dark:text-cobalt-accent font-semibold">
                      {service.specTitle}
                    </div>
                    {service.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-1.5 text-ink-midnight dark:text-foreground">
                        <Check className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border-soft dark:border-border-dark">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {service.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-ivory-warm dark:bg-[#222631] text-slate-grey dark:text-muted-foreground border border-border-soft/60 dark:border-border-dark/60"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => onSelectServiceForEnquiry(service.title)}
                    className="text-xs font-semibold text-cobalt-muted dark:text-cobalt-accent hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>{service.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
