import React from 'react';
import { Code2, ArrowUpRight, Terminal, CheckCircle2, Shield, Cpu, Layers } from 'lucide-react';

export function LaptopScreenContent({ onStartProjectClick, onExploreWorkClick }) {
  return (
    <div className="w-full h-full bg-ivory-warm dark:bg-background text-ink-midnight dark:text-foreground overflow-hidden flex flex-col font-sans select-none relative">
      
      {/* Mini Mockup Navbar */}
      <div className="w-full px-5 py-2.5 bg-ivory-warm/95 dark:bg-background/95 border-b border-border-soft dark:border-border-dark flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-ink-midnight dark:bg-surface text-white dark:text-foreground flex items-center justify-center">
            <Code2 className="w-3 h-3 stroke-[2.2]" />
          </div>
          <span className="font-display font-bold text-xs tracking-tight uppercase text-ink-midnight dark:text-foreground">
            CODERITZ
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-cobalt-muted dark:bg-cobalt-accent ml-0.5" />
        </div>

        <div className="hidden sm:flex items-center gap-4 text-[11px] font-medium text-slate-grey dark:text-muted-foreground">
          <span>Services</span>
          <span>Our Work</span>
          <span>How We Work</span>
          <span>About Us</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cobalt-muted/10 text-cobalt-muted dark:text-cobalt-accent text-[10px] font-mono font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Studio Live</span>
          </span>
        </div>
      </div>

      {/* Screen Body Content */}
      <div className="flex-1 p-5 sm:p-7 overflow-hidden flex flex-col justify-between relative bg-subtle-grid">
        
        {/* Subtle ambient blur */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-cobalt-muted/[0.06] rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-xl z-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded border border-border-soft dark:border-border-dark bg-surface text-[10px] font-mono text-slate-grey dark:text-muted-foreground shadow-subtle">
            <span className="text-cobalt-muted dark:text-cobalt-accent font-semibold">CODERITZ //</span>
            <span>Academic &amp; Practical Engineering Studio</span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-ink-midnight dark:text-foreground leading-tight">
            Ideas deserve to become<br />
            <span className="text-cobalt-muted dark:text-cobalt-accent">something real.</span>
          </h2>

          <p className="text-xs text-slate-grey dark:text-muted-foreground leading-relaxed line-clamp-2 max-w-md">
            From academic concepts to practical software applications, Coderitz brings technical ideas to life through thoughtful engineering and 1-on-1 walkthroughs.
          </p>

          <div className="flex items-center gap-2 pt-1">
            <div className="px-3 py-1 rounded bg-cobalt-muted text-white text-[11px] font-medium flex items-center gap-1 shadow-sm">
              <span>Start a Project</span>
              <ArrowUpRight className="w-3 h-3" />
            </div>
            <div className="px-3 py-1 rounded bg-surface border border-border-soft dark:border-border-dark text-[11px] font-medium text-ink-midnight dark:text-foreground">
              Explore Works
            </div>
          </div>
        </div>

        {/* Mini Technical Architecture Strip at Bottom */}
        <div className="pt-3 border-t border-border-soft dark:border-border-dark grid grid-cols-3 gap-2 text-[10px] font-mono text-slate-grey dark:text-muted-foreground z-10">
          <div className="flex items-center gap-1.5 truncate">
            <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0" />
            <span className="truncate">PostgreSQL + Django / Node</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0" />
            <span className="truncate">ESP32 IoT &amp; YOLOv8 AI</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0" />
            <span className="truncate">Full Viva &amp; Code Walkthrough</span>
          </div>
        </div>

      </div>

    </div>
  );
}
