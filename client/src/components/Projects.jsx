import React, { useState } from 'react';
import { ArrowUpRight, Code, Server, Terminal, Layers } from 'lucide-react';
import { projectsData, projectCategories } from '../data/projects';
import { Badge } from './ui/Badge';
import { ProjectModal } from './ProjectModal';

export function Projects({ onDiscussProject }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = activeCategory === 'all'
    ? projectsData
    : projectsData.filter((p) => p.categoryKey === activeCategory);

  return (
    <section id="work" className="py-20 md:py-28 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
              <span>02 / Selected Works</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white mb-3">
              Built with code. Driven by ideas.
            </h2>
            <p className="text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
              A selection of technical projects engineered by our team, spanning distributed systems, embedded hardware, mobile tracking, and artificial intelligence.
            </p>
          </div>

          <div className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
            <span>{projectsData.length} Documented Projects</span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar border-b border-neutral-100 dark:border-neutral-900">
          {projectCategories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-3.5 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-all duration-150 ${
                activeCategory === cat.key
                  ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 shadow-sm'
                  : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col justify-between p-6 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <div>
                {/* Header with Category and Expand Icon */}
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline" className="font-mono text-[11px]">
                    {project.category}
                  </Badge>
                  
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="p-1.5 rounded text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    aria-label={`View ${project.title} details`}
                    title="View technical details"
                  >
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>

                {/* Project Title */}
                <h3 className="text-xl font-bold tracking-tight text-neutral-950 dark:text-white mb-2.5">
                  {project.title}
                </h3>

                {/* Project Description */}
                <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              {/* Technologies Tags & Detail Trigger */}
              <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800/80">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-semibold text-neutral-900 dark:text-neutral-200 hover:underline flex items-center gap-1"
                  >
                    <span>Inspect architecture</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <span className="text-[11px] font-mono text-neutral-400">
                    Production Verified
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Supporting Notice (as instructed: no fabricated screenshots) */}
        <div className="mt-12 p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-neutral-400 dark:bg-neutral-600" />
            <span>Architecture specs reflect actual codebases built and maintained by our team members.</span>
          </div>
          <span className="font-mono text-[11px]">Source repositories available for student walk-throughs upon request.</span>
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
