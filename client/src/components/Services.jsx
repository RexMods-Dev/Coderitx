import React, { useState } from 'react';
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
  Code2
} from 'lucide-react';
import { servicesData } from '../data/services';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';

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

  const filteredServices = selectedDomain === 'all'
    ? servicesData
    : servicesData.filter((s) => s.id === selectedDomain);

  return (
    <section id="services" className="py-24 md:py-32 border-b border-border-soft dark:border-border-dark bg-ivory-warm dark:bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Split Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-16">
          
          {/* Left Column: Scope Overview */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-cobalt-muted dark:text-cobalt-accent font-semibold mb-3">
              <span>01 / Technical Capabilities</span>
            </div>
            
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.6rem] font-bold tracking-tight text-ink-midnight dark:text-foreground leading-tight mb-5">
              Comprehensive technical guidance &amp; implementation.
            </h2>
            
            <p className="text-base text-slate-grey dark:text-muted-foreground leading-relaxed mb-6">
              We work with students across Computer Science and Information Technology, shaping each project from initial concept through systems architecture, coding, and defense preparation.
            </p>

            {/* Flexible Offering Statement Box */}
            <div className="p-5 rounded-xl border border-border-soft dark:border-border-dark bg-surface shadow-subtle space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-ink-midnight dark:text-foreground uppercase tracking-tight">
                <Sliders className="w-3.5 h-3.5 text-cobalt-muted dark:text-cobalt-accent" />
                <span>Flexible Engagement Model</span>
              </div>
              <p className="text-xs text-slate-grey dark:text-muted-foreground leading-relaxed">
                We do not sell rigid pre-packaged templates. Every project is scoped according to your college syllabus, timeline requirements, and personal learning objectives.
              </p>
            </div>
          </div>

          {/* Right Column: Architectural Domain Badges & Summary */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full pt-2">
            <div className="space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-grey dark:text-muted-foreground">
                Domain Categories
              </div>

              {/* Domain Filter Pills */}
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedDomain('all')}
                  className={`px-3.5 py-1.5 rounded text-xs font-medium transition-all ${
                    selectedDomain === 'all'
                      ? 'bg-ink-midnight text-white dark:bg-foreground dark:text-ink-midnight shadow-sm'
                      : 'bg-surface border border-border-soft dark:border-border-dark text-slate-grey dark:text-muted-foreground hover:text-ink-midnight dark:hover:text-foreground'
                  }`}
                >
                  All 6 Domains
                </button>
                {servicesData.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedDomain(s.id)}
                    className={`px-3.5 py-1.5 rounded text-xs font-medium transition-all ${
                      selectedDomain === s.id
                        ? 'bg-cobalt-muted text-white dark:bg-cobalt-accent dark:text-ink-midnight shadow-sm'
                        : 'bg-surface border border-border-soft dark:border-border-dark text-slate-grey dark:text-muted-foreground hover:text-ink-midnight dark:hover:text-foreground'
                    }`}
                  >
                    {s.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 p-4 rounded-lg bg-surface/70 border border-border-soft/80 dark:border-border-dark/80 text-xs text-slate-grey dark:text-muted-foreground flex items-center justify-between">
              <span>Looking for a custom tech stack or combination?</span>
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

        {/* Services Stream: Architectural Dossiers with Distinctive Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filteredServices.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Terminal;
            const globalIndex = servicesData.findIndex((s) => s.id === service.id);

            return (
              <div
                key={service.id}
                className="group relative flex flex-col justify-between p-7 rounded-xl border border-border-soft dark:border-border-dark bg-surface hover:border-slate-grey/30 dark:hover:border-muted-foreground/30 shadow-subtle hover:shadow-surface transition-all duration-200"
              >
                <div>
                  {/* Top Bar: Numeric Index + Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-md bg-ivory-warm dark:bg-surface-elevated border border-border-soft dark:border-border-dark flex items-center justify-center text-ink-midnight dark:text-foreground group-hover:bg-cobalt-muted group-hover:text-white dark:group-hover:bg-cobalt-accent dark:group-hover:text-ink-midnight transition-colors">
                        <IconComponent className="w-4 h-4 stroke-[1.9]" />
                      </div>
                      <span className="font-mono text-xs text-slate-grey dark:text-muted-foreground font-semibold">
                        0{globalIndex + 1}
                      </span>
                    </div>

                    <Badge variant="cobalt" className="font-mono text-[11px]">
                      {service.badge}
                    </Badge>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-display text-xl font-bold tracking-tight text-ink-midnight dark:text-foreground mb-3">
                    {service.title}
                  </h3>

                  <p className="text-sm text-slate-grey dark:text-muted-foreground leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Key Highlights / Deliverables */}
                  <div className="space-y-2 mb-6 pt-4 border-t border-border-soft/60 dark:border-border-dark/60">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-slate-grey/80 dark:text-muted-foreground/80 font-medium">
                      Core Implementation Scope:
                    </div>
                    {service.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-ink-midnight dark:text-foreground">
                        <Check className="w-3.5 h-3.5 text-cobalt-muted dark:text-cobalt-accent mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer: Technologies & Direct Enquiry CTA */}
                <div className="pt-4 border-t border-border-soft dark:border-border-dark">
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {service.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-ivory-warm dark:bg-surface-elevated text-slate-grey dark:text-muted-foreground border border-border-soft/60 dark:border-border-dark/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      type="button"
                      onClick={() => onSelectServiceForEnquiry(service.title)}
                      className="text-xs font-semibold text-cobalt-muted dark:text-cobalt-accent hover:text-cobalt-deep dark:hover:text-cobalt-hover inline-flex items-center gap-1.5 group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>Request project consultation</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[11px] font-mono text-slate-grey/70 dark:text-muted-foreground/70">
                      Syllabus aligned
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
