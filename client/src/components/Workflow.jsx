import React from 'react';
import { workflowSteps } from '../data/workflow';
import { Check, MessageSquare, Compass, Hammer, Presentation, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from './ui/Button';

const stepIcons = [MessageSquare, Compass, Hammer, Presentation];

export function Workflow({ onStartProjectClick }) {
  return (
    <section id="workflow" className="py-24 md:py-32 border-b border-border-soft dark:border-border-dark bg-ivory-warm dark:bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-cobalt-muted dark:text-cobalt-accent font-semibold mb-3">
            <span>03 / Development Methodology</span>
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.6rem] font-bold tracking-tight text-ink-midnight dark:text-foreground mb-4">
            How We Work
          </h2>
          
          <p className="text-base text-slate-grey dark:text-muted-foreground leading-relaxed">
            A disciplined four-phase engineering framework designed to turn conceptual ideas into evaluated, working software with complete student understanding.
          </p>
        </div>

        {/* Phased Pipeline Layout (Connected Stages) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          
          {workflowSteps.map((step, idx) => {
            const Icon = stepIcons[idx] || MessageSquare;
            const isDeliverStep = idx === 3;

            return (
              <div
                key={step.step}
                className={`relative flex flex-col justify-between p-7 rounded-xl border transition-all duration-200 ${
                  isDeliverStep
                    ? 'border-cobalt-muted/40 dark:border-cobalt-accent/40 bg-surface shadow-surface ring-1 ring-cobalt-muted/20 dark:ring-cobalt-accent/20'
                    : 'border-border-soft dark:border-border-dark bg-surface shadow-subtle hover:shadow-surface'
                }`}
              >
                <div>
                  {/* Step Numeric Header + Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs font-bold text-cobalt-muted dark:text-cobalt-accent px-2 py-0.5 rounded bg-cobalt-muted/10 dark:bg-cobalt-accent/10 border border-cobalt-muted/20 dark:border-cobalt-accent/20">
                      PHASE {step.step}
                    </span>
                    
                    <div className="w-8 h-8 rounded-md bg-ivory-warm dark:bg-surface-elevated border border-border-soft dark:border-border-dark flex items-center justify-center text-ink-midnight dark:text-foreground">
                      <Icon className="w-4 h-4 stroke-[1.8]" />
                    </div>
                  </div>

                  {/* Title & Summary */}
                  <h3 className="font-display text-xl font-bold tracking-tight text-ink-midnight dark:text-foreground mb-2">
                    {step.name}
                  </h3>

                  <p className="text-xs font-semibold text-slate-grey dark:text-muted-foreground mb-3 leading-normal">
                    {step.summary}
                  </p>

                  <p className="text-xs text-slate-grey/90 dark:text-muted-foreground/90 leading-relaxed mb-6">
                    {step.details}
                  </p>
                </div>

                {/* Bottom Deliverable Tag */}
                <div className="pt-4 border-t border-border-soft dark:border-border-dark">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-grey dark:text-muted-foreground mb-1.5 font-semibold">
                    Target Milestone:
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

        {/* Detailed Callout: The Deliver & Explain Distinction */}
        <div className="mt-12 p-7 sm:p-8 rounded-xl border border-border-soft dark:border-border-dark bg-surface shadow-subtle flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-cobalt-muted dark:text-cobalt-accent">
              <ShieldCheck className="w-4 h-4" />
              <span>The Coderitz Understanding Guarantee</span>
            </div>
            
            <h4 className="font-display text-lg sm:text-xl font-bold tracking-tight text-ink-midnight dark:text-foreground">
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
              className="w-full sm:w-auto gap-2"
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
