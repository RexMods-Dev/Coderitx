import React, { useState } from 'react';
import { ArrowRight, Terminal, CheckCircle2, ShieldCheck, Cpu, Code2, Layers, Sparkles, ChevronRight } from 'lucide-react';
import { Button } from './ui/Button';

export function Hero({ onStartProjectClick, onExploreWorkClick }) {
  const [activeTab, setActiveTab] = useState('blueprint');

  const tabs = [
    { id: 'blueprint', label: 'system_architecture.ts' },
    { id: 'pipeline', label: 'verification_loop.sh' },
    { id: 'walkthrough', label: 'viva_walkthrough.md' }
  ];

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden border-b border-border-soft dark:border-border-dark bg-ivory-warm dark:bg-background">
      {/* Background architectural grid */}
      <div className="absolute inset-0 bg-subtle-grid opacity-80 pointer-events-none" />

      {/* Subtle radial light wash for depth */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-cobalt-muted/[0.04] dark:bg-cobalt-accent/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Editorial Headline & Messaging */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Engineering Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-soft dark:border-border-dark bg-surface shadow-subtle text-xs font-mono text-slate-grey dark:text-muted-foreground mb-6">
              <span className="w-2 h-2 rounded-full bg-cobalt-muted dark:bg-cobalt-accent animate-pulse" />
              <span className="font-medium text-ink-midnight dark:text-foreground">Coderitz Engineering Studio</span>
              <span className="text-border-soft dark:text-border-dark">•</span>
              <span>Academic &amp; Practical Software</span>
            </div>

            {/* Editorial Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.75rem] font-extrabold tracking-tight text-ink-midnight dark:text-foreground leading-[1.08] mb-6">
              Have an idea?<br />
              <span className="text-slate-grey dark:text-muted-foreground">Let's build it.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-grey dark:text-muted-foreground max-w-xl leading-relaxed mb-9">
              From academic projects to practical software solutions, Coderitz helps turn technical ideas into working applications. Explore possibilities, discuss your requirements and build something meaningful with our team.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto mb-11">
              <Button
                size="lg"
                variant="primary"
                onClick={onStartProjectClick}
                className="w-full sm:w-auto gap-2 shadow-sm"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="secondary"
                onClick={onExploreWorkClick}
                className="w-full sm:w-auto text-sm"
              >
                Explore Our Work
              </Button>
            </div>

            {/* Supporting Line with subtle border */}
            <div className="pt-6 border-t border-border-soft dark:border-border-dark w-full max-w-xl">
              <p className="text-xs sm:text-[13px] font-mono text-slate-grey dark:text-muted-foreground font-medium flex items-center flex-wrap gap-x-2 gap-y-1">
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

          {/* Right Column: Architectural Engineering Panel */}
          <div className="lg:col-span-5 w-full">
            <div className="rounded-xl border border-border-soft dark:border-border-dark bg-surface shadow-elevated overflow-hidden font-mono text-xs transition-all duration-200">
              
              {/* Window Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-ivory-warm/70 dark:bg-ink-midnight/80 border-b border-border-soft dark:border-border-dark select-none">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-grey/30 dark:bg-slate-grey/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-grey/30 dark:bg-slate-grey/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-grey/30 dark:bg-slate-grey/40" />
                  <span className="ml-2 font-mono text-[11px] text-slate-grey dark:text-muted-foreground">
                    coderitz-engine // core
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-cobalt-muted dark:text-cobalt-accent font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-cobalt-muted dark:bg-cobalt-accent" />
                  <span>v2.5.0</span>
                </div>
              </div>

              {/* Sub-header Tab Bar */}
              <div className="flex border-b border-border-soft dark:border-border-dark bg-ivory-warm/40 dark:bg-surface-elevated/40 overflow-x-auto no-scrollbar">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3.5 py-2 text-[11px] border-r border-border-soft dark:border-border-dark transition-all whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'bg-surface text-ink-midnight dark:text-foreground font-semibold border-b-2 border-b-cobalt-muted dark:border-b-cobalt-accent'
                        : 'text-slate-grey dark:text-muted-foreground hover:text-ink-midnight dark:hover:text-foreground hover:bg-surface/50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Console Body */}
              <div className="p-5 leading-relaxed space-y-3.5 min-h-[285px] bg-surface text-ink-midnight dark:text-foreground">
                
                {activeTab === 'blueprint' && (
                  <div className="space-y-2.5 animate-fade-in text-[11px]">
                    <div className="text-slate-grey dark:text-muted-foreground">// Architectural blueprint specification</div>
                    
                    <div className="p-2.5 rounded border border-border-soft dark:border-border-dark bg-ivory-warm/50 dark:bg-surface-elevated/60 space-y-1">
                      <div className="text-cobalt-muted dark:text-cobalt-accent font-bold">interface ProjectArchitecture &#123;</div>
                      <div className="pl-3 text-slate-grey dark:text-muted-foreground">
                        frontend: <span className="text-ink-midnight dark:text-foreground font-semibold">"React + Vite + Tailwind"</span>;
                      </div>
                      <div className="pl-3 text-slate-grey dark:text-muted-foreground">
                        backend: <span className="text-ink-midnight dark:text-foreground font-semibold">"Node.js / Express | Django REST"</span>;
                      </div>
                      <div className="pl-3 text-slate-grey dark:text-muted-foreground">
                        database: <span className="text-ink-midnight dark:text-foreground font-semibold">"PostgreSQL | Supabase"</span>;
                      </div>
                      <div className="pl-3 text-slate-grey dark:text-muted-foreground">
                        modules: <span className="text-ink-midnight dark:text-foreground font-semibold">["Auth", "Telemetry", "Async Queues"]</span>;
                      </div>
                      <div className="text-cobalt-muted dark:text-cobalt-accent font-bold">&#125;</div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-grey dark:text-muted-foreground pt-1">
                      <span>PATTERN: CLEAN REPOSITORY PATTERN</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">MODULAR &amp; SCALABLE</span>
                    </div>
                  </div>
                )}

                {activeTab === 'pipeline' && (
                  <div className="space-y-2.5 text-[11px] animate-fade-in">
                    <div className="text-slate-grey dark:text-muted-foreground"># Verification &amp; continuous test suite</div>
                    <div className="text-slate-grey dark:text-muted-foreground font-mono">
                      <span className="text-cobalt-muted dark:text-cobalt-accent">$</span> coderitz verify --suite "Student Capstone"
                    </div>

                    <div className="space-y-1.5 pl-1">
                      <div className="flex items-center gap-2 text-ink-midnight dark:text-foreground">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                        <span>Database migration: PostgreSQL tables synced</span>
                      </div>
                      <div className="flex items-center gap-2 text-ink-midnight dark:text-foreground">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                        <span>API endpoint latency: &lt; 45ms P99</span>
                      </div>
                      <div className="flex items-center gap-2 text-ink-midnight dark:text-foreground">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                        <span>Hardware telemetry: ESP32 packets verified</span>
                      </div>
                      <div className="flex items-center gap-2 text-ink-midnight dark:text-foreground">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                        <span>Code formatting &amp; docstrings: 100% compliant</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-border-soft dark:border-border-dark flex items-center justify-between text-[10px]">
                      <span className="text-slate-grey dark:text-muted-foreground">TEST RESULTS:</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">ALL PASSING (0 FAILS)</span>
                    </div>
                  </div>
                )}

                {activeTab === 'walkthrough' && (
                  <div className="space-y-2.5 text-[11px] animate-fade-in text-ink-midnight dark:text-foreground">
                    <div className="text-slate-grey dark:text-muted-foreground">## Deliver &amp; Explain Commitment</div>
                    <p className="text-xs text-slate-grey dark:text-muted-foreground leading-relaxed">
                      "We never hand over an unexplained black box. Every project delivery includes 1-on-1 guided sessions covering architecture, code patterns, and viva questions."
                    </p>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div className="p-2.5 rounded border border-border-soft dark:border-border-dark bg-ivory-warm/40 dark:bg-surface-elevated/40">
                        <div className="font-semibold text-ink-midnight dark:text-foreground text-[11px]">Source Walkthrough</div>
                        <div className="text-[10px] text-slate-grey dark:text-muted-foreground mt-0.5">Line-by-line function breakdown</div>
                      </div>
                      <div className="p-2.5 rounded border border-border-soft dark:border-border-dark bg-ivory-warm/40 dark:bg-surface-elevated/40">
                        <div className="font-semibold text-ink-midnight dark:text-foreground text-[11px]">Viva Defense Prep</div>
                        <div className="text-[10px] text-slate-grey dark:text-muted-foreground mt-0.5">Typical examiner questions &amp; logic</div>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Console Footer */}
              <div className="px-4 py-2.5 bg-ivory-warm/50 dark:bg-ink-midnight/60 border-t border-border-soft dark:border-border-dark flex items-center justify-between text-[10px] text-slate-grey dark:text-muted-foreground">
                <span className="flex items-center gap-1.5 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Active Engineering Studio
                </span>
                <span className="font-mono text-slate-grey/80 dark:text-muted-foreground/80">Direct Founder Access</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
