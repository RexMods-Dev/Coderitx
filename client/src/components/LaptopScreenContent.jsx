import React, { useState } from 'react';
import { Code2, ArrowUpRight, Terminal, CheckCircle2, Shield, Cpu, Layers, Sparkles, Activity } from 'lucide-react';

export function LaptopScreenContent({ onStartProjectClick, onExploreWorkClick }) {
  const [activeTab, setActiveTab] = useState('pipeline');

  return (
    <div className="w-full h-full bg-ivory-warm dark:bg-background text-ink-midnight dark:text-foreground overflow-hidden flex flex-col font-sans select-none relative">
      
      {/* Studio Top Bar */}
      <div className="w-full px-4 sm:px-6 py-2.5 bg-surface/90 dark:bg-surface/90 border-b border-border-soft dark:border-border-dark flex items-center justify-between z-10 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-ink-midnight dark:bg-foreground text-white dark:text-ink-midnight flex items-center justify-center shadow-xs">
            <Code2 className="w-3.5 h-3.5 stroke-[2.2]" />
          </div>
          <span className="font-display font-extrabold text-xs tracking-tight uppercase text-ink-midnight dark:text-foreground">
            CODERITZ
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-cobalt-muted dark:bg-cobalt-accent inline-block" />
        </div>

        {/* Tab switchers in screen header */}
        <div className="flex items-center gap-1 bg-ivory-warm dark:bg-surface-elevated p-0.5 rounded-lg border border-border-soft dark:border-border-dark text-[10px] font-mono font-medium">
          <button
            type="button"
            onClick={() => setActiveTab('pipeline')}
            className={`px-2.5 py-0.5 rounded-md transition-colors ${
              activeTab === 'pipeline'
                ? 'bg-surface dark:bg-surface text-ink-midnight dark:text-foreground shadow-xs font-semibold'
                : 'text-slate-grey dark:text-muted-foreground hover:text-ink-midnight'
            }`}
          >
            pipeline.sh
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('architecture')}
            className={`px-2.5 py-0.5 rounded-md transition-colors ${
              activeTab === 'architecture'
                ? 'bg-surface dark:bg-surface text-ink-midnight dark:text-foreground shadow-xs font-semibold'
                : 'text-slate-grey dark:text-muted-foreground hover:text-ink-midnight'
            }`}
          >
            spec.ts
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cobalt-muted/10 text-cobalt-muted dark:text-cobalt-accent text-[10px] font-mono font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Studio Live</span>
          </span>
        </div>
      </div>

      {/* Screen Body */}
      <div className="flex-1 p-5 sm:p-7 overflow-hidden flex flex-col justify-between relative bg-subtle-grid">
        
        {/* Subtle ambient blur */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cobalt-muted/[0.07] dark:bg-cobalt-accent/[0.05] rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-xl z-10 space-y-3">
          
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md border border-border-soft dark:border-border-dark bg-surface text-[10px] font-mono text-slate-grey dark:text-muted-foreground shadow-subtle">
            <span className="text-cobalt-muted dark:text-cobalt-accent font-semibold">CODERITZ //</span>
            <span>Academic &amp; Practical Engineering Studio</span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-ink-midnight dark:text-foreground leading-[1.1]">
            Ideas deserve to become<br />
            <span className="text-cobalt-muted dark:text-cobalt-accent">something real.</span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-grey dark:text-muted-foreground leading-relaxed line-clamp-2 max-w-lg">
            From academic concepts to practical software applications, Coderitz brings technical ideas to life through thoughtful engineering and 1-on-1 walkthroughs.
          </p>

          <div className="flex items-center gap-2.5 pt-1">
            <button
              type="button"
              onClick={onStartProjectClick}
              className="px-3.5 py-1.5 rounded-lg bg-cobalt-muted hover:bg-cobalt-deep text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={onExploreWorkClick}
              className="px-3.5 py-1.5 rounded-lg bg-surface border border-border-soft dark:border-border-dark text-xs font-medium text-ink-midnight dark:text-foreground hover:bg-ivory-warm transition-all"
            >
              Explore Our Work
            </button>
          </div>

        </div>

        {/* Dynamic Interactive Panel inside screen */}
        <div className="p-3.5 rounded-xl border border-border-soft dark:border-border-dark bg-surface/90 dark:bg-surface-elevated/90 font-mono text-[11px] shadow-subtle z-10">
          {activeTab === 'pipeline' ? (
            <div className="space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between text-[10px] text-slate-grey dark:text-muted-foreground pb-1 border-b border-border-soft/60 dark:border-border-dark/60">
                <span className="flex items-center gap-1.5 font-semibold text-ink-midnight dark:text-foreground">
                  <Activity className="w-3 h-3 text-cobalt-muted dark:text-cobalt-accent" />
                  Live Verification Suite
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">14/14 Passing</span>
              </div>
              <div className="flex items-center gap-2 text-ink-midnight dark:text-foreground">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                <span>PostgreSQL schemas synchronized with ACID transactions</span>
              </div>
              <div className="flex items-center gap-2 text-ink-midnight dark:text-foreground">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                <span>Celery worker queues active (sub-second task dispatch)</span>
              </div>
            </div>
          ) : (
            <div className="space-y-1 text-[11px]">
              <div className="text-cobalt-muted dark:text-cobalt-accent font-bold">const CoderitzStandard = &#123;</div>
              <div className="pl-3 text-slate-grey dark:text-muted-foreground">
                stack: <span className="text-ink-midnight dark:text-foreground">["React", "Node.js", "Django", "ESP32", "YOLOv8"]</span>,
              </div>
              <div className="pl-3 text-slate-grey dark:text-muted-foreground">
                handover: <span className="text-ink-midnight dark:text-foreground">"Source Code + Documentation + 1-on-1 Walkthrough"</span>
              </div>
              <div className="text-cobalt-muted dark:text-cobalt-accent font-bold">&#125;;</div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
