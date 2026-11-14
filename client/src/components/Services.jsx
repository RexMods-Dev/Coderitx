import React from 'react';
import {
  GraduationCap,
  Layout,
  BrainCircuit,
  Smartphone,
  Cpu,
  Terminal,
  ArrowRight,
  Sliders
} from 'lucide-react';
import { servicesData } from '../data/services';
import { Badge } from './ui/Badge';

const iconMap = {
  GraduationCap,
  Layout,
  BrainCircuit,
  Smartphone,
  Cpu,
  Terminal
};

export function Services({ onSelectServiceForEnquiry }) {
  return (
    <section id="services" className="py-20 md:py-28 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/40 dark:bg-neutral-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
              <span>01 / Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white mb-4">
              Technical Services
            </h2>
            <p className="text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
              We provide engineering and implementation assistance across academic and practical software domains. Every engagement is shaped around your specific requirements and syllabus expectations.
            </p>
          </div>

          {/* Flexible offering callout as requested */}
          <div className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 max-w-sm">
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-900 dark:text-white mb-1">
              <Sliders className="w-3.5 h-3.5" />
              <span>Flexible Technical Offering</span>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-normal">
              No rigid packages. We adapt scope, architecture, and technology to fit your college guidelines, timeline, or prototype needs.
            </p>
          </div>
        </div>

        {/* Services Grid (Minimal cards, thin borders, clear typography) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service) => {
            const IconComponent = iconMap[service.icon] || Terminal;

            return (
              <div
                key={service.id}
                className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/70 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <div>
                  {/* Top Bar with Icon and Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 rounded border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 flex items-center justify-center text-neutral-900 dark:text-neutral-100 group-hover:bg-neutral-950 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-neutral-950 transition-colors">
                      <IconComponent className="w-5 h-5 stroke-[1.8]" />
                    </div>
                    <Badge variant="outline" className="text-[11px] font-mono">
                      {service.badge}
                    </Badge>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-semibold text-neutral-950 dark:text-white tracking-tight mb-2.5">
                    {service.title}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Highlights list */}
                  <div className="space-y-2 mb-6 pt-4 border-t border-neutral-100 dark:border-neutral-800/80">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                      Scope Includes:
                    </div>
                    {service.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-600 mt-1.5 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer: Tech tags & Enquiry Action */}
                <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800/80">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {service.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectServiceForEnquiry(service.title)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-900 dark:text-neutral-200 hover:text-black dark:hover:text-white transition-colors group-hover:translate-x-0.5 duration-150"
                  >
                    <span>Request this service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
