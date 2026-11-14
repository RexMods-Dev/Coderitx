import React from 'react';
import { teamData } from '../data/team';
import { Badge } from './ui/Badge';
import { ShieldCheck, UserCheck, Terminal, Award } from 'lucide-react';

export function AboutTeam() {
  return (
    <section id="about" className="py-20 md:py-28 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
            <span>04 / Leadership &amp; Transparency</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white mb-4">
            A small team. Different technical strengths. One shared goal.
          </h2>
          <p className="text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
            Coderitz is built by a team of technology graduates with backgrounds spanning software development, data science, cybersecurity and practical application engineering. We believe good projects come from understanding the problem, choosing the right technologies and building solutions that work.
          </p>
        </div>

        {/* Co-Founders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamData.map((member) => {
            // Initials avatar
            const initials = member.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase();

            return (
              <div
                key={member.id}
                className="flex flex-col justify-between p-6 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors shadow-sm"
              >
                <div>
                  {/* Top Bar with Initials & Role */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-md border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center font-mono font-bold text-sm text-neutral-900 dark:text-white">
                      {initials}
                    </div>
                    <Badge variant="outline" className="font-mono text-[11px]">
                      {member.role}
                    </Badge>
                  </div>

                  {/* Name */}
                  <h3 className="text-xl font-bold tracking-tight text-neutral-950 dark:text-white mb-3">
                    {member.name}
                  </h3>

                  {/* Qualifications list (Exact factual credentials from prompt) */}
                  <div className="space-y-1.5 mb-5 pb-4 border-b border-neutral-100 dark:border-neutral-800/80">
                    {member.qualifications.map((qual, idx) => (
                      <div
                        key={idx}
                        className="text-xs text-neutral-600 dark:text-neutral-300 flex items-start gap-1.5"
                      >
                        <Award className="w-3.5 h-3.5 text-neutral-500 mt-0.5 flex-shrink-0" />
                        <span>{qual}</span>
                      </div>
                    ))}
                  </div>

                  {/* Short Factual Bio */}
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed mb-6">
                    {member.bio}
                  </p>
                </div>

                {/* Technical Focus Chips */}
                <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800/80">
                  <div className="text-[10px] font-mono uppercase text-neutral-400 mb-2">
                    Primary Domain Focus
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {member.technicalFocus.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-100 dark:bg-neutral-850 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}

          {/* Transparency Statement Card */}
          <div className="flex flex-col justify-between p-6 rounded-lg border border-dashed border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-900/20">
            <div>
              <div className="w-10 h-10 rounded border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 flex items-center justify-center text-neutral-800 dark:text-neutral-200 mb-5">
                <ShieldCheck className="w-5 h-5 stroke-[1.8]" />
              </div>
              <h3 className="text-lg font-bold tracking-tight text-neutral-950 dark:text-white mb-2">
                Our Commitment to Transparency
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                We believe students deserve clarity. You work directly with the developers writing and reviewing your codebase—not middlemen or anonymous contractors. Our credentials and technical proficiencies are stated exactly as they are.
              </p>
            </div>
            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 text-[11px] font-mono text-neutral-500">
              Direct access to real developers.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
