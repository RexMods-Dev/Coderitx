import React, { useState } from 'react';
import { ArrowUpRight, Code, Server, Terminal, Layers, Cpu, Radio, Sparkles } from 'lucide-react';
import { projectsData, projectCategories } from '../data/projects';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { ProjectModal } from './ProjectModal';

export function Projects({ onDiscussProject }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = activeCategory === 'all'
    ? projectsData
    : projectsData.filter((p) => p.categoryKey === activeCategory);

  // Split into flagships (top 2) and catalog projects when viewing 'all'
  const isAllCategory = activeCategory === 'all';
  const flagshipProjects = isAllCategory ? filteredProjects.slice(0, 2) : [];
  const catalogProjects = isAllCategory ? filteredProjects.slice(2) : filteredProjects;

  return (
    <section id="work" className="py-24 md:py-32 border-b border-border-soft dark:border-border-dark bg-surface dark:bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-cobalt-muted dark:text-cobalt-accent font-semibold mb-3">
              <span>02 / Selected Works</span>
            </div>
            
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.6rem] font-bold tracking-tight text-ink-midnight dark:text-foreground mb-4">
              Built with code. Driven by ideas.
            </h2>
            
            <p className="text-base text-slate-grey dark:text-muted-foreground leading-relaxed">
              A curated portfolio of software systems engineered by our team, spanning real-time distributed platforms, embedded IoT hardware, mobile telemetry, and computer vision.
            </p>
          </div>

          <div className="font-mono text-xs text-slate-grey dark:text-muted-foreground bg-ivory-warm dark:bg-surface-elevated px-3 py-1.5 rounded border border-border-soft dark:border-border-dark">
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
                className={`px-3.5 py-1.5 rounded text-xs font-medium whitespace-nowrap transition-all duration-150 flex items-center gap-1.5 ${
                  activeCategory === cat.key
                    ? 'bg-ink-midnight text-white dark:bg-foreground dark:text-ink-midnight shadow-sm'
                    : 'bg-ivory-warm dark:bg-surface border border-border-soft dark:border-border-dark text-slate-grey dark:text-muted-foreground hover:text-ink-midnight dark:hover:text-foreground'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeCategory === cat.key
                    ? 'bg-white/20 dark:bg-ink-midnight/20 text-white dark:text-ink-midnight'
                    : 'bg-surface dark:bg-surface-elevated text-slate-grey dark:text-muted-foreground'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Flagship Showcases (Featured 2-Column Split when on 'All') */}
        {isAllCategory && flagshipProjects.length > 0 && (
          <div className="mb-12 space-y-6">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-grey dark:text-muted-foreground flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cobalt-muted dark:bg-cobalt-accent" />
              <span>Flagship Architectural Case Studies</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {flagshipProjects.map((project, idx) => (
                <div
                  key={project.id}
                  className="group relative flex flex-col justify-between p-8 rounded-xl border border-border-soft dark:border-border-dark bg-ivory-warm/40 dark:bg-surface hover:border-slate-grey/30 dark:hover:border-muted-foreground/30 shadow-subtle hover:shadow-surface transition-all duration-200"
                >
                  <div>
                    {/* Header: Category & Action */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Badge variant="cobalt" className="font-mono text-[11px]">
                          {project.category}
                        </Badge>
                        <span className="text-[10px] font-mono text-slate-grey dark:text-muted-foreground uppercase">
                          Featured Build
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        className="p-1.5 rounded-md text-slate-grey hover:text-ink-midnight dark:text-muted-foreground dark:hover:text-foreground hover:bg-surface transition-colors"
                        title="Inspect Architecture"
                      >
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </button>
                    </div>

                    <h3 className="font-display text-2xl font-bold tracking-tight text-ink-midnight dark:text-foreground mb-2">
                      {project.title}
                    </h3>
                    <p className="text-xs font-mono text-cobalt-muted dark:text-cobalt-accent mb-4">
                      {project.tagline}
                    </p>

                    <p className="text-sm text-slate-grey dark:text-muted-foreground leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Architectural Schematic Box */}
                    <div className="p-4 rounded-lg bg-surface dark:bg-surface-elevated border border-border-soft dark:border-border-dark font-mono text-xs space-y-2 mb-6">
                      <div className="text-[10px] uppercase text-slate-grey dark:text-muted-foreground font-semibold flex items-center justify-between">
                        <span>Architecture Matrix</span>
                        <span className="text-emerald-600 dark:text-emerald-400">Production Ready</span>
                      </div>
                      {project.architecture && (
                        <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                          {Object.entries(project.architecture).slice(0, 4).map(([k, v]) => (
                            <div key={k} className="truncate">
                              <span className="text-slate-grey dark:text-muted-foreground capitalize">{k}:</span>{' '}
                              <span className="text-ink-midnight dark:text-foreground font-medium">{v}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer: Tech tags and CTA */}
                  <div className="pt-4 border-t border-border-soft dark:border-border-dark flex items-center justify-between flex-wrap gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-surface dark:bg-surface-elevated text-ink-midnight dark:text-foreground border border-border-soft dark:border-border-dark"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setSelectedProject(project)}
                      className="text-xs gap-1"
                    >
                      <span>Inspect Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

        {/* Catalog Showcase Projects */}
        <div className="space-y-4">
          {isAllCategory && (
            <div className="text-xs font-mono uppercase tracking-wider text-slate-grey dark:text-muted-foreground flex items-center gap-2 pt-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-grey/60" />
              <span>Engineered Software Catalog</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {catalogProjects.map((project) => (
              <div
                key={project.id}
                className="group flex flex-col justify-between p-6 rounded-xl border border-border-soft dark:border-border-dark bg-ivory-warm/30 dark:bg-surface hover:border-slate-grey/30 dark:hover:border-muted-foreground/30 shadow-subtle hover:shadow-surface transition-all duration-200"
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

                  <h3 className="font-display text-lg font-bold tracking-tight text-ink-midnight dark:text-foreground mb-2">
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-grey dark:text-muted-foreground leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-border-soft dark:border-border-dark">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-surface dark:bg-surface-elevated text-slate-grey dark:text-muted-foreground border border-border-soft/60 dark:border-border-dark/60"
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
        <div className="mt-12 p-5 rounded-xl border border-border-soft dark:border-border-dark bg-ivory-warm/50 dark:bg-surface/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-grey dark:text-muted-foreground">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-cobalt-muted dark:bg-cobalt-accent flex-shrink-0" />
            <span>All projects reflect verified, production-standard architectures authored and maintained by Coderitz co-founders.</span>
          </div>
          <span className="font-mono text-[11px] text-ink-midnight dark:text-foreground">
            Source code walkthroughs provided during handover.
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
