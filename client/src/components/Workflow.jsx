import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { workflowSteps } from '../data/workflow';
import { Check, MessageSquare, Compass, Hammer, Presentation, ArrowRight, ShieldCheck, ChevronRight } from 'lucide-react';
import { Button } from './ui/Button';

gsap.registerPlugin(ScrollTrigger);

const stepIcons = [MessageSquare, Compass, Hammer, Presentation];

export function Workflow({ onStartProjectClick }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(".workflow-header-anim", 
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

      // Workflow step cards sequence
      gsap.fromTo(".workflow-step-card", 
        { opacity: 0, y: 40 }, 
        {
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.15, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".workflow-steps-container",
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );

      // Guarantee callout banner
      gsap.fromTo(".workflow-guarantee-banner", 
        { opacity: 0, y: 30 }, 
        {
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".workflow-guarantee-banner",
            start: "top 90%",
            toggleActions: "play none none none"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="workflow" className="py-24 md:py-36 border-b border-border-soft dark:border-border-dark bg-ivory-warm dark:bg-background relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="workflow-header-anim max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-cobalt-muted dark:text-cobalt-accent font-semibold mb-3">
            <span>03 / Development Framework</span>
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold tracking-tight text-ink-midnight dark:text-foreground mb-4">
            How We Work
          </h2>
          
          <p className="text-base text-slate-grey dark:text-muted-foreground leading-relaxed">
            A disciplined four-phase engineering framework designed to turn conceptual ideas into evaluated, working software with complete student understanding.
          </p>
        </div>

        {/* Refined Process Pipeline Visualization */}
        <div className="workflow-steps-container relative mb-16">
          
          {/* Subtle connecting guideline on desktop */}
          <div className="hidden lg:block absolute top-[52px] left-[8%] right-[8%] h-[2px] bg-border-soft dark:bg-border-dark z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {workflowSteps.map((step, idx) => {
              const Icon = stepIcons[idx] || MessageSquare;
              const isDeliverStep = idx === 3;

              return (
                <div
                  key={step.step}
                  className={`workflow-step-card group relative flex flex-col justify-between p-7 rounded-2xl border transition-all duration-200 ${
                    isDeliverStep
                      ? 'border-cobalt-muted/50 dark:border-cobalt-accent/50 bg-surface shadow-surface ring-1 ring-cobalt-muted/20 dark:ring-cobalt-accent/20'
                      : 'border-border-soft dark:border-border-dark bg-surface shadow-subtle hover:shadow-surface'
                  }`}
                >
                  <div>
                    {/* Stage Badge & Step Indicator */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-ivory-warm dark:bg-surface-elevated border border-border-soft dark:border-border-dark flex items-center justify-center text-ink-midnight dark:text-foreground group-hover:border-cobalt-muted/50 dark:group-hover:border-cobalt-accent/50 transition-colors shadow-subtle">
                        <Icon className="w-5 h-5 stroke-[1.9] text-cobalt-muted dark:text-cobalt-accent" />
                      </div>

                      <span className="font-mono text-xs font-bold text-slate-grey dark:text-muted-foreground px-2.5 py-1 rounded bg-ivory-warm dark:bg-surface-elevated border border-border-soft/80 dark:border-border-dark/80">
                        STAGE {step.step}
                      </span>
                    </div>

                    {/* Step Title & Summary */}
                    <h3 className="font-display text-xl font-bold tracking-tight text-ink-midnight dark:text-foreground mb-2">
                      {step.name}
                    </h3>

                    <p className="text-xs font-semibold text-cobalt-muted dark:text-cobalt-accent mb-3 leading-normal font-mono">
                      {step.summary}
                    </p>

                    <p className="text-xs text-slate-grey dark:text-muted-foreground leading-relaxed mb-6">
                      {step.details}
                    </p>
                  </div>

                  {/* Stage Milestone Deliverable */}
                  <div className="pt-4 border-t border-border-soft dark:border-border-dark">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-grey/80 dark:text-muted-foreground/80 mb-1.5 font-semibold">
                      Agreed Milestone:
                    </div>
                    <div className="text-xs font-medium text-ink-midnight dark:text-foreground flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-cobalt-muted dark:text-cobalt-accent mt-0.5 flex-shrink-0" />
                      <span>{step.deliverable}</span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* The Understanding Guarantee Callout */}
        <div className="workflow-guarantee-banner p-8 sm:p-10 rounded-2xl border border-border-soft dark:border-border-dark bg-surface shadow-subtle flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-cobalt-muted dark:text-cobalt-accent">
              <ShieldCheck className="w-4 h-4" />
              <span>The Coderitz Understanding Guarantee</span>
            </div>
            
            <h4 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-ink-midnight dark:text-foreground">
              Software delivery is incomplete without technical understanding.
            </h4>
            
            <p className="text-xs sm:text-sm text-slate-grey dark:text-muted-foreground leading-relaxed">
              Academic success requires you to defend the project before college evaluators. We dedicate time to walkthroughs covering database schemas, algorithmic logic, API endpoints, and potential viva questions so you speak with mastery.
            </p>
          </div>

          <div className="flex-shrink-0 w-full sm:w-auto">
            <Button
              variant="primary"
              size="lg"
              onClick={onStartProjectClick}
              className="w-full sm:w-auto gap-2 px-7 py-3.5"
            >
              <span>Schedule Project Discussion</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
}
