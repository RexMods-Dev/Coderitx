import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { teamData } from '../data/team';
import { Badge } from './ui/Badge';
import { ShieldCheck, UserCheck, Terminal, Award, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function AboutTeam() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(".team-header-anim", 
        { opacity: 0, y: 35 }, 
        {
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      // Founder dossier cards stagger
      gsap.fromTo(".founder-dossier-card", 
        { opacity: 0, y: 40 }, 
        {
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.12, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".team-grid-container",
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-24 md:py-36 border-b border-border-soft dark:border-border-dark bg-surface dark:bg-background relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="team-header-anim max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-cobalt-muted dark:text-cobalt-accent font-semibold mb-3">
            <span>04 / Leadership &amp; Transparency</span>
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold tracking-tight text-ink-midnight dark:text-foreground mb-5">
            A small team. Different technical strengths. One shared goal.
          </h2>
          
          <p className="text-base text-slate-grey dark:text-muted-foreground leading-relaxed">
            Coderitz is built by a team of technology graduates with backgrounds spanning software development, data science, cybersecurity and practical application engineering. We believe good projects come from understanding the problem, choosing the right technologies and building solutions that work.
          </p>
        </div>

        {/* Co-Founders Dossiers Grid */}
        <div className="team-grid-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {teamData.map((member) => {
            const monogram = member.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase();

            return (
              <div
                key={member.id}
                className="founder-dossier-card group flex flex-col justify-between p-7 sm:p-8 rounded-2xl border border-border-soft dark:border-border-dark bg-ivory-warm/40 dark:bg-surface hover:border-slate-grey/30 dark:hover:border-muted-foreground/30 shadow-subtle hover:shadow-surface transition-all duration-200"
              >
                <div>
                  {/* Top Bar: Monogram and Role */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-surface dark:bg-surface-elevated border border-border-soft dark:border-border-dark flex items-center justify-center font-mono font-bold text-xs text-ink-midnight dark:text-foreground group-hover:border-cobalt-muted/50 dark:group-hover:border-cobalt-accent/50 transition-colors shadow-subtle">
                      {monogram}
                    </div>
                    
                    <Badge variant="subtle" className="font-mono text-[11px] text-slate-grey dark:text-muted-foreground">
                      {member.role}
                    </Badge>
                  </div>

                  {/* Name */}
                  <h3 className="font-display text-xl font-bold tracking-tight text-ink-midnight dark:text-foreground mb-3">
                    {member.name}
                  </h3>

                  {/* Factual Qualifications */}
                  <div className="space-y-1.5 mb-5 pb-4 border-b border-border-soft/60 dark:border-border-dark/60">
                    {member.qualifications.map((qual, idx) => (
                      <div
                        key={idx}
                        className="text-xs text-slate-grey dark:text-muted-foreground flex items-start gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-cobalt-muted dark:text-cobalt-accent mt-0.5 flex-shrink-0" />
                        <span>{qual}</span>
                      </div>
                    ))}
                  </div>

                  {/* Factual Bio */}
                  <p className="text-xs text-slate-grey dark:text-muted-foreground leading-relaxed mb-6">
                    {member.bio}
                  </p>
                </div>

                {/* Technical Focus Tags */}
                <div className="pt-4 border-t border-border-soft dark:border-border-dark">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-grey/80 dark:text-muted-foreground/80 mb-2 font-semibold">
                    Core Technical Competencies
                  </div>
                  
                  <div className="flex flex-wrap gap-1.5">
                    {member.technicalFocus.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-surface dark:bg-surface-elevated text-ink-midnight dark:text-foreground border border-border-soft/60 dark:border-border-dark/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}

          {/* Direct Developer Access Commitment Card */}
          <div className="founder-dossier-card flex flex-col justify-between p-7 sm:p-8 rounded-2xl border border-dashed border-border-soft dark:border-border-dark bg-ivory-warm/70 dark:bg-surface-elevated/40 shadow-subtle">
            <div>
              <div className="w-12 h-12 rounded-xl bg-surface dark:bg-surface border border-border-soft dark:border-border-dark flex items-center justify-center text-cobalt-muted dark:text-cobalt-accent mb-5 shadow-subtle">
                <ShieldCheck className="w-6 h-6 stroke-[1.9]" />
              </div>
              
              <h3 className="font-display text-lg font-bold tracking-tight text-ink-midnight dark:text-foreground mb-3">
                Direct Developer Access
              </h3>
              
              <p className="text-xs text-slate-grey dark:text-muted-foreground leading-relaxed mb-4">
                You work directly with the developers writing, refining, and testing your codebase. We never outsource project delivery to anonymous third parties or automated scrapers.
              </p>

              <div className="space-y-2 text-xs text-ink-midnight dark:text-foreground font-medium">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cobalt-muted dark:bg-cobalt-accent" />
                  <span>Transparent credentials &amp; experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cobalt-muted dark:bg-cobalt-accent" />
                  <span>Scheduled 1-on-1 code walkthroughs</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border-soft dark:border-border-dark text-[11px] font-mono text-slate-grey dark:text-muted-foreground font-semibold">
              Technical integrity first.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
