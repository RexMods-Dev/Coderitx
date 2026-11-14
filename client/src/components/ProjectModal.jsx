import React, { useEffect } from 'react';
import { X, Cpu, Layers, Database, Shield, CheckCircle2, ArrowRight } from 'lucide-react';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';

export function ProjectModal({ project, isOpen, onClose, onDiscussProject }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink-midnight/60 dark:bg-black/70 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Surface */}
      <div className="relative w-full max-w-2xl bg-surface border border-border-soft dark:border-border-dark rounded-xl shadow-elevated overflow-hidden z-10 max-h-[90vh] flex flex-col animate-slide-up">
        
        {/* Modal Header */}
        <div className="p-6 sm:p-7 border-b border-border-soft dark:border-border-dark bg-ivory-warm/60 dark:bg-ink-midnight/50 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="cobalt" className="font-mono text-xs">
                {project.category}
              </Badge>
              <span className="text-slate-grey/40 dark:text-muted-foreground/40 text-xs font-mono">•</span>
              <span className="text-xs font-mono text-slate-grey dark:text-muted-foreground">TECHNICAL DOSSIER</span>
            </div>
            <h3 className="font-display text-2xl font-bold tracking-tight text-ink-midnight dark:text-foreground">
              {project.title}
            </h3>
            <p className="text-sm text-slate-grey dark:text-muted-foreground mt-1">
              {project.tagline}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-md text-slate-grey hover:text-ink-midnight dark:text-muted-foreground dark:hover:text-foreground hover:bg-surface-elevated transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 overflow-y-auto space-y-6 text-sm text-ink-midnight dark:text-foreground">
          
          {/* Detailed description */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-grey dark:text-muted-foreground mb-2 font-semibold">
              System Architecture &amp; Logic
            </h4>
            <p className="text-slate-grey dark:text-muted-foreground leading-relaxed">
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Architecture Breakdown */}
          {project.architecture && (
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-grey dark:text-muted-foreground mb-3 font-semibold">
                Architectural Layers
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(project.architecture).map(([layer, desc]) => (
                  <div
                    key={layer}
                    className="p-3.5 rounded-lg border border-border-soft dark:border-border-dark bg-ivory-warm/40 dark:bg-surface-elevated/40"
                  >
                    <div className="text-[11px] font-mono text-cobalt-muted dark:text-cobalt-accent uppercase mb-1 font-semibold">
                      {layer}
                    </div>
                    <div className="text-xs font-medium text-ink-midnight dark:text-foreground">
                      {desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Implementation Metrics */}
          {project.metrics && (
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-grey dark:text-muted-foreground mb-3 font-semibold">
                Technical Highlights
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {project.metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded border border-border-soft/80 dark:border-border-dark/80 bg-surface"
                  >
                    <div className="text-[10px] font-mono uppercase text-slate-grey dark:text-muted-foreground">
                      {metric.label}
                    </div>
                    <div className="text-xs font-semibold text-ink-midnight dark:text-foreground mt-0.5">
                      {metric.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technologies Stack */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-grey dark:text-muted-foreground mb-2.5 font-semibold">
              Verified Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded font-mono text-xs font-medium border border-border-soft dark:border-border-dark bg-ivory-warm dark:bg-surface-elevated text-ink-midnight dark:text-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-5 sm:p-6 border-t border-border-soft dark:border-border-dark bg-ivory-warm/50 dark:bg-ink-midnight/50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-grey dark:text-muted-foreground font-mono">
            Direct codebase walkthrough available for students.
          </span>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="w-full sm:w-auto"
            >
              Close
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                onClose();
                onDiscussProject(project.title);
              }}
              className="w-full sm:w-auto gap-1.5"
            >
              <span>Build Something Similar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}
