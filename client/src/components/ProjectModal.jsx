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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-neutral-950/70 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col animate-slide-up">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 flex items-start justify-between bg-neutral-50/50 dark:bg-neutral-950/50">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="font-mono text-xs">
                {project.category}
              </Badge>
              <span className="text-neutral-400 text-xs font-mono">•</span>
              <span className="text-xs font-mono text-neutral-500">TECHNICAL OVERVIEW</span>
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
              {project.title}
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              {project.tagline}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-md text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-neutral-700 dark:text-neutral-300">
          
          {/* Detailed description */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
              System Description
            </h4>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Architecture Breakdown */}
          {project.architecture && (
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3">
                Architectural Layers
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(project.architecture).map(([layer, desc]) => (
                  <div
                    key={layer}
                    className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/60"
                  >
                    <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase mb-1">
                      {layer}
                    </div>
                    <div className="text-xs font-medium text-neutral-900 dark:text-neutral-200">
                      {desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Metrics / Key highlights */}
          {project.metrics && (
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3">
                Implementation Metrics
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {project.metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded border border-neutral-100 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-800/40"
                  >
                    <div className="text-[10px] font-mono uppercase text-neutral-400">
                      {metric.label}
                    </div>
                    <div className="text-xs font-semibold text-neutral-900 dark:text-white mt-0.5">
                      {metric.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technologies Stack */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
              Technologies &amp; Libraries
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded font-mono text-xs font-medium border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-neutral-500 font-mono">
            Want a project with a similar architecture?
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
