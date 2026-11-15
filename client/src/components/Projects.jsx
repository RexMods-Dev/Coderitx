import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Code, Server, Terminal, Layers, Cpu, Radio, Sparkles, Activity, Shield, MapPin, Database } from 'lucide-react';
import { projectsData, projectCategories } from '../data/projects';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { ProjectModal } from './ProjectModal';

gsap.registerPlugin(ScrollTrigger);

export function Projects({ onDiscussProject }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(".projects-header-anim", 
        { opacity: 0, y: 35 }, 
        {
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      // Flagship cards reveal
      gsap.fromTo(".flagship-card-anim", 
        { opacity: 0, y: 40 }, 
        {
          opacity: 1, 
          y: 0, 
          duration: 0.85, 
          stagger: 0.18, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".flagship-container",
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );

      // Catalog cards stagger
      gsap.fromTo(".catalog-card-anim", 
        { opacity: 0, y: 35 }, 
        {
          opacity: 1, 
          y: 0, 
          duration: 0.7, 
          stagger: 0.08, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".catalog-grid-container",
            start: "top 90%",
            toggleActions: "play none none none"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory]);

  const filteredProjects = activeCategory === 'all'
    ? projectsData
    : projectsData.filter((p) => p.categoryKey === activeCategory);

  return (
    <section ref={sectionRef} id="work" className="py-24 md:py-36 border-b border-border-soft dark:border-border-dark bg-surface dark:bg-background relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="projects-header-anim flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-cobalt-muted dark:text-cobalt-accent font-semibold mb-3">
              <span>02 / Selected Work</span>
            </div>
            
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold tracking-tight text-ink-midnight dark:text-foreground mb-4">
              Built with code. Driven by ideas.
            </h2>
            
            <p className="text-base text-slate-grey dark:text-muted-foreground leading-relaxed">
              A curated portfolio of software systems engineered by our team, spanning real-time distributed platforms, embedded IoT hardware, mobile telemetry, and computer vision.
            </p>
          </div>

          <div className="font-mono text-xs text-slate-grey dark:text-muted-foreground bg-ivory-warm dark:bg-[#1B1E26] px-3 py-1.5 rounded-lg border border-border-soft dark:border-border-dark">
            <span className="font-semibold text-ink-midnight dark:text-foreground">{projectsData.length}</span> Verified System Architectures
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 no-scrollbar border-b border-border-soft/60 dark:border-border-dark/60">
          {projectCategories.map((cat) => {
            const count = cat.key === 'all'
              ? projectsData.length
              : projectsData.filter((p) => p.categoryKey === cat.key).length;

            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 flex items-center gap-1.5 ${
                  activeCategory === cat.key
                    ? 'bg-ink-midnight text-white dark:bg-foreground dark:text-ink-midnight shadow-sm'
                    : 'bg-ivory-warm dark:bg-[#1B1E26] border border-border-soft dark:border-border-dark text-slate-grey dark:text-muted-foreground hover:text-ink-midnight dark:hover:text-foreground'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeCategory === cat.key
                    ? 'bg-white/20 dark:bg-ink-midnight/20 text-white dark:text-ink-midnight'
                    : 'bg-surface dark:bg-[#222631] text-slate-grey dark:text-muted-foreground'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* FEATURED CASE STUDY 1: Auction Hub (Wide Flagship Dossier) */}
        <div className="flagship-container">
          {(activeCategory === 'all' || activeCategory === 'realtime') && (
            <div className="flagship-card-anim mb-10 p-8 sm:p-10 rounded-2xl border border-border-soft dark:border-border-dark bg-surface dark:bg-[#1B1E26] shadow-subtle hover:shadow-surface hover:border-cobalt-muted/40 dark:hover:border-cobalt-accent/40 transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="cobalt" className="font-mono text-xs">Real-time Platform</Badge>
                    <span className="text-xs font-mono text-slate-grey dark:text-muted-foreground uppercase">Flagship 01</span>
                  </div>
                  
                  <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-ink-midnight dark:text-foreground">
                    Auction Hub
                  </h3>
                  <p className="text-xs font-mono text-cobalt-muted dark:text-cobalt-accent font-medium">
                    Real-time bidding platform with background worker queues
                  </p>
                  <p className="text-sm text-slate-grey dark:text-muted-foreground leading-relaxed">
                    Real-time bidding logic with Celery background task processing, multi-user auction sessions, OTP verification and automated notification workflows. Built to handle time-sensitive auction closings and state synchronization across active bidders.
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {["Django", "Celery", "Redis", "PostgreSQL"].map((tech) => (
                      <span key={tech} className="px-2.5 py-0.5 rounded text-xs font-mono bg-ivory-warm dark:bg-[#222631] text-ink-midnight dark:text-foreground border border-border-soft dark:border-border-dark font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => setSelectedProject(projectsData[0])}
                      className="gap-1.5"
                    >
                      <span>Inspect System Architecture</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>

                {/* Architectural Schematic Visual */}
                <div className="lg:col-span-5 p-5 rounded-xl border border-border-soft dark:border-border-dark bg-ivory-warm/80 dark:bg-[#15171F] font-mono text-xs space-y-3 shadow-subtle">
                  <div className="flex items-center justify-between text-[11px] text-slate-grey dark:text-muted-foreground border-b border-border-soft dark:border-border-dark pb-2">
                    <span className="flex items-center gap-1.5 font-semibold text-ink-midnight dark:text-foreground">
                      <Activity className="w-3.5 h-3.5 text-cobalt-muted dark:text-cobalt-accent" />
                      Bidding Pipeline Spec
                    </span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">Sub-second Sync</span>
                  </div>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex justify-between py-1 border-b border-border-soft/60 dark:border-border-dark/60">
                      <span className="text-slate-grey dark:text-muted-foreground">Worker Engine:</span>
                      <span className="text-ink-midnight dark:text-foreground font-semibold">Celery + Redis Broker</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-border-soft/60 dark:border-border-dark/60">
                      <span className="text-slate-grey dark:text-muted-foreground">Bid Locking:</span>
                      <span className="text-ink-midnight dark:text-foreground font-semibold">ACID PostgreSQL atomic</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-border-soft/60 dark:border-border-dark/60">
                      <span className="text-slate-grey dark:text-muted-foreground">Auth Security:</span>
                      <span className="text-ink-midnight dark:text-foreground font-semibold">Two-step OTP Phone Flow</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-grey dark:text-muted-foreground">Notification:</span>
                      <span className="text-ink-midnight dark:text-foreground font-semibold">Async Email / SMS Dispatch</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FEATURED CASE STUDY 2: Smart RFID Hospital System (Hardware / IoT Flagship) */}
          {(activeCategory === 'all' || activeCategory === 'iot') && (
            <div className="flagship-card-anim mb-12 p-8 sm:p-10 rounded-2xl border border-border-soft dark:border-border-dark bg-surface dark:bg-[#1B1E26] shadow-subtle hover:shadow-surface hover:border-cobalt-muted/40 dark:hover:border-cobalt-accent/40 transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Hardware Telemetry Blueprint */}
                <div className="lg:col-span-5 order-2 lg:order-1 p-5 rounded-xl border border-border-soft dark:border-border-dark bg-ivory-warm/80 dark:bg-[#15171F] font-mono text-xs space-y-3 shadow-subtle">
                  <div className="flex items-center justify-between text-[11px] text-slate-grey dark:text-muted-foreground border-b border-border-soft dark:border-border-dark pb-2">
                    <span className="flex items-center gap-1.5 font-semibold text-ink-midnight dark:text-foreground">
                      <Cpu className="w-3.5 h-3.5 text-cobalt-muted dark:text-cobalt-accent" />
                      Embedded-to-Cloud Sync
                    </span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">&lt; 250ms Scan</span>
                  </div>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex justify-between py-1 border-b border-border-soft/60 dark:border-border-dark/60">
                      <span className="text-slate-grey dark:text-muted-foreground">Microcontroller:</span>
                      <span className="text-ink-midnight dark:text-foreground font-semibold">ESP32 Dual-Core</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-border-soft/60 dark:border-border-dark/60">
                      <span className="text-slate-grey dark:text-muted-foreground">Sensor Interface:</span>
                      <span className="text-ink-midnight dark:text-foreground font-semibold">RC522 13.56MHz RFID</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-border-soft/60 dark:border-border-dark/60">
                      <span className="text-slate-grey dark:text-muted-foreground">API Gateway:</span>
                      <span className="text-ink-midnight dark:text-foreground font-semibold">Django REST (JWT Auth)</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-grey dark:text-muted-foreground">Data Layer:</span>
                      <span className="text-ink-midnight dark:text-foreground font-semibold">Supabase Real-time</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 order-1 lg:order-2 space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="cobalt" className="font-mono text-xs">Healthcare / IoT</Badge>
                    <span className="text-xs font-mono text-slate-grey dark:text-muted-foreground uppercase">Flagship 02</span>
                  </div>
                  
                  <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-ink-midnight dark:text-foreground">
                    Smart RFID Hospital System
                  </h3>
                  <p className="text-xs font-mono text-cobalt-muted dark:text-cobalt-accent font-medium">
                    Embedded hardware integrated with healthcare management API
                  </p>
                  <p className="text-sm text-slate-grey dark:text-muted-foreground leading-relaxed">
                    A full-stack hospital management system integrating web technologies with embedded hardware for faster patient identification. RFID smart cards communicate through microcontrollers with a Django REST API connected to Supabase for instant chart retrieval.
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {["Django", "ESP32", "Supabase", "RFID"].map((tech) => (
                      <span key={tech} className="px-2.5 py-0.5 rounded text-xs font-mono bg-ivory-warm dark:bg-[#222631] text-ink-midnight dark:text-foreground border border-border-soft dark:border-border-dark font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => setSelectedProject(projectsData[1])}
                      className="gap-1.5"
                    >
                      <span>Inspect Hardware &amp; API Spec</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* REST OF CATALOG PROJECTS (Curated Asymmetric Grid) */}
        <div className="space-y-4">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-grey dark:text-muted-foreground flex items-center gap-2 pt-2">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-grey/60" />
            <span>Curated Software Systems Catalog</span>
          </div>

          <div className="catalog-grid-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects
              .filter((p) => p.id !== 'auction-hub' && p.id !== 'smart-rfid-hospital')
              .map((project) => (
                <div
                  key={project.id}
                  className="catalog-card-anim group flex flex-col justify-between p-6 sm:p-7 rounded-2xl border border-border-soft dark:border-border-dark bg-surface dark:bg-[#1B1E26] hover:border-cobalt-muted/40 dark:hover:border-cobalt-accent/40 shadow-subtle hover:shadow-surface hover:-translate-y-1 transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="outline" className="font-mono text-[11px]">
                        {project.category}
                      </Badge>

                      <button
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        className="p-1 rounded text-slate-grey hover:text-ink-midnight dark:text-muted-foreground dark:hover:text-foreground transition-colors"
                        title="Inspect Architecture"
                      >
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </button>
                    </div>

                    <h3 className="font-display text-xl font-bold tracking-tight text-ink-midnight dark:text-foreground mb-1.5">
                      {project.title}
                    </h3>

                    <p className="text-[11px] font-mono text-cobalt-muted dark:text-cobalt-accent mb-3 font-medium">
                      {project.tagline}
                    </p>

                    <p className="text-xs text-slate-grey dark:text-muted-foreground leading-relaxed mb-6">
                      {project.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border-soft dark:border-border-dark">
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded text-[11px] font-mono bg-ivory-warm dark:bg-[#222631] text-slate-grey dark:text-muted-foreground border border-border-soft/60 dark:border-border-dark/60"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <button
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        className="text-xs font-semibold text-cobalt-muted dark:text-cobalt-accent hover:underline flex items-center gap-1"
                      >
                        <span>Inspect architecture</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>

                      <span className="text-[11px] font-mono text-slate-grey/60 dark:text-muted-foreground/60">
                        Walkthrough ready
                      </span>
                    </div>
                  </div>

                </div>
            ))}
          </div>
        </div>

        {/* Ethical Transparency Banner */}
        <div className="mt-14 p-6 rounded-2xl border border-border-soft dark:border-border-dark bg-surface dark:bg-[#15171F] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-grey dark:text-muted-foreground">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-cobalt-muted dark:bg-cobalt-accent flex-shrink-0" />
            <span>All project architectures reflect genuine codebases engineered and maintained by Coderitz team members.</span>
          </div>
          <span className="font-mono text-[11px] text-ink-midnight dark:text-foreground font-semibold">
            Complete source code walkthroughs provided during project handover.
          </span>
        </div>

      </div>

      {/* Detail Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
        onDiscussProject={onDiscussProject}
      />
    </section>
  );
}
