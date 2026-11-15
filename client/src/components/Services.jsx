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
  Code2,
  Layers,
  Database,
  Radio,
  Sparkles
} from 'lucide-react';
import { servicesData } from '../data/services';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';

gsap.registerPlugin(ScrollTrigger);

export function Services({ onSelectServiceForEnquiry }) {
  const [selectedDomain, setSelectedDomain] = useState('all');
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Header reveal (smooth & stately)
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

      // Dossier cards stagger reveal (smooth cadence)
      gsap.fromTo(".service-dossier-card", 
        { opacity: 0, y: 45 }, 
        {
          opacity: 1, 
          y: 0, 
          duration: 0.9, 
          stagger: 0.1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".services-grid-container",
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [selectedDomain]);

  const filteredServices = selectedDomain === 'all'
    ? servicesData
    : servicesData.filter((s) => s.id === selectedDomain);

  return (
    <section ref={sectionRef} id="services" className="py-24 md:py-36 border-b border-border-soft dark:border-border-dark bg-ivory-warm dark:bg-background relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="services-header-anim grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-16">
          
          {/* Left Column: Scope Overview */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-cobalt-muted dark:text-cobalt-accent font-semibold mb-3">
              <span>01 / What We Build</span>
            </div>
            
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold tracking-tight text-ink-midnight dark:text-foreground leading-tight mb-5">
              Comprehensive technical guidance &amp; implementation.
            </h2>
            
            <p className="text-base text-slate-grey dark:text-muted-foreground leading-relaxed mb-6">
              We work with students across Computer Science and Information Technology, shaping each project from initial concept through systems architecture, coding, and defense preparation.
            </p>

            {/* Flexible Offering Statement Box */}
            <div className="p-5 rounded-xl border border-border-soft dark:border-border-dark bg-surface dark:bg-[#1B1E26] shadow-subtle space-y-2">
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
          <div className="lg:col-span-7 flex flex-col justify-between h-full pt-2">
            <div className="space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-grey dark:text-muted-foreground font-semibold">
                Domain Categories
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedDomain('all')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
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
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
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

            <div className="mt-8 p-4 rounded-xl bg-surface dark:bg-[#1B1E26] border border-border-soft/80 dark:border-border-dark/80 text-xs text-slate-grey dark:text-muted-foreground flex items-center justify-between shadow-subtle">
              <span>Have a custom syllabus requirement or hybrid stack?</span>
              <button
                type="button"
                onClick={() => onSelectServiceForEnquiry('Custom Architecture Requirement')}
                className="text-cobalt-muted dark:text-cobalt-accent font-semibold hover:underline inline-flex items-center gap-1"
              >
                <span>Discuss with team</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Distinctive Service Dossiers Grid */}
        <div className="services-grid-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Service 1: Academic & CSE Projects */}
          <div className="service-dossier-card group relative flex flex-col justify-between p-7 rounded-2xl border border-border-soft dark:border-border-dark bg-surface dark:bg-[#1B1E26] hover:border-cobalt-muted/40 dark:hover:border-cobalt-accent/40 shadow-subtle hover:shadow-surface hover:-translate-y-1 transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-11 h-11 rounded-xl bg-ivory-warm dark:bg-[#222631] border border-border-soft dark:border-border-dark flex items-center justify-center text-ink-midnight dark:text-foreground group-hover:bg-cobalt-muted group-hover:text-white dark:group-hover:bg-cobalt-accent dark:group-hover:text-ink-midnight transition-colors shadow-subtle">
                  <GraduationCap className="w-5 h-5 stroke-[1.9]" />
                </div>
                <Badge variant="cobalt" className="font-mono text-[11px]">Academic Standard</Badge>
              </div>

              <h3 className="font-display text-xl font-bold tracking-tight text-ink-midnight dark:text-foreground mb-2">
                CSE &amp; Academic Projects
              </h3>
              <p className="text-xs text-slate-grey dark:text-muted-foreground leading-relaxed mb-5">
                Project planning, development assistance, implementation and technical guidance tailored for college submission standards and viva defense.
              </p>

              {/* Evaluation Blueprint Spec */}
              <div className="p-3.5 rounded-xl bg-ivory-warm/80 dark:bg-[#15171F] border border-border-soft dark:border-border-dark font-mono text-[11px] space-y-1.5 mb-5">
                <div className="text-[10px] uppercase text-cobalt-muted dark:text-cobalt-accent font-semibold">Evaluation Blueprint:</div>
                <div className="flex items-center gap-1.5 text-ink-midnight dark:text-foreground">
                  <Check className="w-3 h-3 text-emerald-500" />
                  <span>Documented schemas &amp; ER diagrams</span>
                </div>
                <div className="flex items-center gap-1.5 text-ink-midnight dark:text-foreground">
                  <Check className="w-3 h-3 text-emerald-500" />
                  <span>Function-by-function code walkthrough</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border-soft dark:border-border-dark">
              <div className="flex flex-wrap gap-1.5 mb-4">
                {["Python", "Java", "Django", "FastAPI", "C++"].map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded text-[11px] font-mono bg-ivory-warm dark:bg-[#222631] text-slate-grey dark:text-muted-foreground border border-border-soft/60 dark:border-border-dark/60">{t}</span>
                ))}
              </div>
              <button
                type="button"
                onClick={() => onSelectServiceForEnquiry('CSE & Academic Projects')}
                className="text-xs font-semibold text-cobalt-muted dark:text-cobalt-accent hover:underline flex items-center gap-1"
              >
                <span>Request academic consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Service 2: Web Applications */}
          <div className="service-dossier-card group relative flex flex-col justify-between p-7 rounded-2xl border border-border-soft dark:border-border-dark bg-surface dark:bg-[#1B1E26] hover:border-cobalt-muted/40 dark:hover:border-cobalt-accent/40 shadow-subtle hover:shadow-surface hover:-translate-y-1 transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-11 h-11 rounded-xl bg-ivory-warm dark:bg-[#222631] border border-border-soft dark:border-border-dark flex items-center justify-center text-ink-midnight dark:text-foreground group-hover:bg-cobalt-muted group-hover:text-white dark:group-hover:bg-cobalt-accent dark:group-hover:text-ink-midnight transition-colors shadow-subtle">
                  <Layout className="w-5 h-5 stroke-[1.9]" />
                </div>
                <Badge variant="subtle" className="font-mono text-[11px]">Full-Stack Systems</Badge>
              </div>

              <h3 className="font-display text-xl font-bold tracking-tight text-ink-midnight dark:text-foreground mb-2">
                Web Applications
              </h3>
              <p className="text-xs text-slate-grey dark:text-muted-foreground leading-relaxed mb-5">
                Full-stack websites, dashboards, management systems and REST APIs built with modern frontend frameworks and robust backend architectures.
              </p>

              {/* Endpoint & Database Spec */}
              <div className="p-3.5 rounded-xl bg-ivory-warm/80 dark:bg-[#15171F] border border-border-soft dark:border-border-dark font-mono text-[11px] space-y-1.5 mb-5">
                <div className="text-[10px] uppercase text-cobalt-muted dark:text-cobalt-accent font-semibold">Architecture Spec:</div>
                <div className="text-ink-midnight dark:text-foreground font-medium">RESTful &amp; GraphQL Endpoint Design</div>
                <div className="text-slate-grey dark:text-muted-foreground text-[10px]">PostgreSQL with Connection Pooling</div>
              </div>
            </div>

            <div className="pt-4 border-t border-border-soft dark:border-border-dark">
              <div className="flex flex-wrap gap-1.5 mb-4">
                {["React", "Node.js", "Express", "PostgreSQL", "Tailwind"].map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded text-[11px] font-mono bg-ivory-warm dark:bg-[#222631] text-slate-grey dark:text-muted-foreground border border-border-soft/60 dark:border-border-dark/60">{t}</span>
                ))}
              </div>
              <button
                type="button"
                onClick={() => onSelectServiceForEnquiry('Web Applications')}
                className="text-xs font-semibold text-cobalt-muted dark:text-cobalt-accent hover:underline flex items-center gap-1"
              >
                <span>Request web architecture</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Service 3: AI & Machine Learning */}
          <div className="service-dossier-card group relative flex flex-col justify-between p-7 rounded-2xl border border-border-soft dark:border-border-dark bg-surface dark:bg-[#1B1E26] hover:border-cobalt-muted/40 dark:hover:border-cobalt-accent/40 shadow-subtle hover:shadow-surface hover:-translate-y-1 transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-11 h-11 rounded-xl bg-ivory-warm dark:bg-[#222631] border border-border-soft dark:border-border-dark flex items-center justify-center text-ink-midnight dark:text-foreground group-hover:bg-cobalt-muted group-hover:text-white dark:group-hover:bg-cobalt-accent dark:group-hover:text-ink-midnight transition-colors shadow-subtle">
                  <BrainCircuit className="w-5 h-5 stroke-[1.9]" />
                </div>
                <Badge variant="cobalt" className="font-mono text-[11px]">Intelligent Systems</Badge>
              </div>

              <h3 className="font-display text-xl font-bold tracking-tight text-ink-midnight dark:text-foreground mb-2">
                AI &amp; Machine Learning
              </h3>
              <p className="text-xs text-slate-grey dark:text-muted-foreground leading-relaxed mb-5">
                Object detection, predictive models, data analysis and intelligent applications trained on targeted datasets with clear inference pipelines.
              </p>

              {/* Model Training Pipeline */}
              <div className="p-3.5 rounded-xl bg-ivory-warm/80 dark:bg-[#15171F] border border-border-soft dark:border-border-dark font-mono text-[11px] space-y-1.5 mb-5">
                <div className="text-[10px] uppercase text-cobalt-muted dark:text-cobalt-accent font-semibold">Model Pipeline:</div>
                <div className="text-ink-midnight dark:text-foreground font-medium">Ultralytics YOLOv8 + PyTorch</div>
                <div className="text-emerald-600 dark:text-emerald-400 text-[10px]">Real-time Edge Inference &amp; Validation</div>
              </div>
            </div>

            <div className="pt-4 border-t border-border-soft dark:border-border-dark">
              <div className="flex flex-wrap gap-1.5 mb-4">
                {["Python", "PyTorch", "YOLOv8", "OpenCV", "Scikit-Learn"].map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded text-[11px] font-mono bg-ivory-warm dark:bg-[#222631] text-slate-grey dark:text-muted-foreground border border-border-soft/60 dark:border-border-dark/60">{t}</span>
                ))}
              </div>
              <button
                type="button"
                onClick={() => onSelectServiceForEnquiry('AI & Machine Learning')}
                className="text-xs font-semibold text-cobalt-muted dark:text-cobalt-accent hover:underline flex items-center gap-1"
              >
                <span>Request ML pipeline</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Service 4: Mobile Applications */}
          <div className="service-dossier-card group relative flex flex-col justify-between p-7 rounded-2xl border border-border-soft dark:border-border-dark bg-surface dark:bg-[#1B1E26] hover:border-cobalt-muted/40 dark:hover:border-cobalt-accent/40 shadow-subtle hover:shadow-surface hover:-translate-y-1 transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-11 h-11 rounded-xl bg-ivory-warm dark:bg-[#222631] border border-border-soft dark:border-border-dark flex items-center justify-center text-ink-midnight dark:text-foreground group-hover:bg-cobalt-muted group-hover:text-white dark:group-hover:bg-cobalt-accent dark:group-hover:text-ink-midnight transition-colors shadow-subtle">
                  <Smartphone className="w-5 h-5 stroke-[1.9]" />
                </div>
                <Badge variant="subtle" className="font-mono text-[11px]">Cross-Platform</Badge>
              </div>

              <h3 className="font-display text-xl font-bold tracking-tight text-ink-midnight dark:text-foreground mb-2">
                Mobile Applications
              </h3>
              <p className="text-xs text-slate-grey dark:text-muted-foreground leading-relaxed mb-5">
                Android and cross-platform application development with clean interfaces, state management, and seamless backend API synchronization.
              </p>

              {/* Mobile State & Telemetry */}
              <div className="p-3.5 rounded-xl bg-ivory-warm/80 dark:bg-[#15171F] border border-border-soft dark:border-border-dark font-mono text-[11px] space-y-1.5 mb-5">
                <div className="text-[10px] uppercase text-cobalt-muted dark:text-cobalt-accent font-semibold">Mobile Layer:</div>
                <div className="text-ink-midnight dark:text-foreground font-medium">React Native &amp; Expo Workflow</div>
                <div className="text-slate-grey dark:text-muted-foreground text-[10px]">Real-time Geolocation &amp; Telemetry</div>
              </div>
            </div>

            <div className="pt-4 border-t border-border-soft dark:border-border-dark">
              <div className="flex flex-wrap gap-1.5 mb-4">
                {["React Native", "Expo", "Redux", "Firebase", "REST"].map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded text-[11px] font-mono bg-ivory-warm dark:bg-[#222631] text-slate-grey dark:text-muted-foreground border border-border-soft/60 dark:border-border-dark/60">{t}</span>
                ))}
              </div>
              <button
                type="button"
                onClick={() => onSelectServiceForEnquiry('Mobile Applications')}
                className="text-xs font-semibold text-cobalt-muted dark:text-cobalt-accent hover:underline flex items-center gap-1"
              >
                <span>Request mobile architecture</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Service 5: IoT & Embedded Systems */}
          <div className="service-dossier-card group relative flex flex-col justify-between p-7 rounded-2xl border border-border-soft dark:border-border-dark bg-surface dark:bg-[#1B1E26] hover:border-cobalt-muted/40 dark:hover:border-cobalt-accent/40 shadow-subtle hover:shadow-surface hover:-translate-y-1 transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-11 h-11 rounded-xl bg-ivory-warm dark:bg-[#222631] border border-border-soft dark:border-border-dark flex items-center justify-center text-ink-midnight dark:text-foreground group-hover:bg-cobalt-muted group-hover:text-white dark:group-hover:bg-cobalt-accent dark:group-hover:text-ink-midnight transition-colors shadow-subtle">
                  <Cpu className="w-5 h-5 stroke-[1.9]" />
                </div>
                <Badge variant="cobalt" className="font-mono text-[11px]">Hardware &amp; Cloud</Badge>
              </div>

              <h3 className="font-display text-xl font-bold tracking-tight text-ink-midnight dark:text-foreground mb-2">
                IoT &amp; Embedded Systems
              </h3>
              <p className="text-xs text-slate-grey dark:text-muted-foreground leading-relaxed mb-5">
                ESP32, RFID, microcontrollers and hardware-integrated applications communicating reliably with web dashboards and cloud APIs.
              </p>

              {/* Hardware Protocol Spec */}
              <div className="p-3.5 rounded-xl bg-ivory-warm/80 dark:bg-[#15171F] border border-border-soft dark:border-border-dark font-mono text-[11px] space-y-1.5 mb-5">
                <div className="text-[10px] uppercase text-cobalt-muted dark:text-cobalt-accent font-semibold">Embedded Pipeline:</div>
                <div className="text-ink-midnight dark:text-foreground font-medium">ESP32 Firmware + RC522 RFID</div>
                <div className="text-emerald-600 dark:text-emerald-400 text-[10px]">Secure HTTP / MQTT Cloud Sync</div>
              </div>
            </div>

            <div className="pt-4 border-t border-border-soft dark:border-border-dark">
              <div className="flex flex-wrap gap-1.5 mb-4">
                {["ESP32", "Arduino", "RFID", "MQTT", "Supabase"].map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded text-[11px] font-mono bg-ivory-warm dark:bg-[#222631] text-slate-grey dark:text-muted-foreground border border-border-soft/60 dark:border-border-dark/60">{t}</span>
                ))}
              </div>
              <button
                type="button"
                onClick={() => onSelectServiceForEnquiry('IoT & Embedded Systems')}
                className="text-xs font-semibold text-cobalt-muted dark:text-cobalt-accent hover:underline flex items-center gap-1"
              >
                <span>Request embedded consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Service 6: Custom Software Solutions */}
          <div className="service-dossier-card group relative flex flex-col justify-between p-7 rounded-2xl border border-border-soft dark:border-border-dark bg-surface dark:bg-[#1B1E26] hover:border-cobalt-muted/40 dark:hover:border-cobalt-accent/40 shadow-subtle hover:shadow-surface hover:-translate-y-1 transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-11 h-11 rounded-xl bg-ivory-warm dark:bg-[#222631] border border-border-soft dark:border-border-dark flex items-center justify-center text-ink-midnight dark:text-foreground group-hover:bg-cobalt-muted group-hover:text-white dark:group-hover:bg-cobalt-accent dark:group-hover:text-ink-midnight transition-colors shadow-subtle">
                  <Terminal className="w-5 h-5 stroke-[1.9]" />
                </div>
                <Badge variant="subtle" className="font-mono text-[11px]">Bespoke Systems</Badge>
              </div>

              <h3 className="font-display text-xl font-bold tracking-tight text-ink-midnight dark:text-foreground mb-2">
                Custom Software Solutions
              </h3>
              <p className="text-xs text-slate-grey dark:text-muted-foreground leading-relaxed mb-5">
                Tailored systems for individual requirements, student innovation prototypes, and small business workflow automations.
              </p>

              {/* Async Worker Spec */}
              <div className="p-3.5 rounded-xl bg-ivory-warm/80 dark:bg-[#15171F] border border-border-soft dark:border-border-dark font-mono text-[11px] space-y-1.5 mb-5">
                <div className="text-[10px] uppercase text-cobalt-muted dark:text-cobalt-accent font-semibold">Async Worker Spec:</div>
                <div className="text-ink-midnight dark:text-foreground font-medium">Celery Task Processing + Redis</div>
                <div className="text-slate-grey dark:text-muted-foreground text-[10px]">Automated OTP &amp; Notification Workflows</div>
              </div>
            </div>

            <div className="pt-4 border-t border-border-soft dark:border-border-dark">
              <div className="flex flex-wrap gap-1.5 mb-4">
                {["Node.js", "Python", "Celery", "Redis", "Docker"].map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded text-[11px] font-mono bg-ivory-warm dark:bg-[#222631] text-slate-grey dark:text-muted-foreground border border-border-soft/60 dark:border-border-dark/60">{t}</span>
                ))}
              </div>
              <button
                type="button"
                onClick={() => onSelectServiceForEnquiry('Custom Software Solutions')}
                className="text-xs font-semibold text-cobalt-muted dark:text-cobalt-accent hover:underline flex items-center gap-1"
              >
                <span>Request custom solution</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
