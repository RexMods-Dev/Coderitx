import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowUpRight,
  Code2,
  ChevronDown,
  MessageSquare,
  ShieldCheck
} from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { servicesData } from '../data/services';
import { projectsData } from '../data/projects';
import { Button } from './ui/Button';

gsap.registerPlugin(ScrollTrigger);

export function ContactFooter({ onStartProjectClick }) {
  const [openFaq, setOpenFaq] = useState(0);
  const footerRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(".closing-cta-anim", 
        { opacity: 0, y: 35 }, 
        {
          opacity: 1, 
          y: 0, 
          duration: 0.95, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".closing-cta-container",
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );

      gsap.fromTo(".faq-container-anim", 
        { opacity: 0, y: 35 }, 
        {
          opacity: 1, 
          y: 0, 
          duration: 0.95, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".faq-container-anim",
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const elem = document.querySelector(id);
    if (elem) {
      const headerOffset = 90;
      const elementPosition = elem.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer ref={footerRef} className="bg-ink-midnight text-white border-t border-border-dark selection:bg-cobalt-accent selection:text-ink-midnight relative">
      
      {/* Pre-footer Call to Action Banner */}
      <div className="closing-cta-container py-24 md:py-36 border-b border-border-dark/80 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[320px] bg-cobalt-muted/[0.09] rounded-full blur-3xl pointer-events-none" />

        <div className="closing-cta-anim max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border-dark bg-[#1B1E26] text-xs font-mono text-slate-300 mb-6 shadow-subtle">
            <span className="w-1.5 h-1.5 rounded-full bg-cobalt-accent animate-pulse" />
            <span>Consultation &amp; Feasibility Review</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 max-w-3xl mx-auto leading-tight">
            {siteConfig.contact.closingHeadline}
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto mb-10 leading-relaxed">
            Have a project concept, need technical guidance, or want to explore implementation approaches? Get in touch with our team today.
          </p>

          <Button
            size="lg"
            variant="primary"
            onClick={onStartProjectClick}
            className="gap-2 px-9 py-4 text-base shadow-elevated"
          >
            <span>{siteConfig.contact.cta}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="faq-container-anim py-20 border-b border-border-dark/80 bg-ink-deep/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-xs font-mono uppercase tracking-wider text-cobalt-accent font-semibold mb-2">
              Common Inquiries
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-muted-foreground font-mono mt-2">
              Direct insights into our academic guidance and development process
            </p>
          </div>

          <div className="space-y-3">
            {siteConfig.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-border-dark bg-[#161821] hover:bg-[#1C1F2B] transition-colors overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 text-left flex items-center justify-between text-sm sm:text-base font-semibold text-white focus-ring"
                  >
                    <span className="pr-4">{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-cobalt-accent' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-border-dark/60 pt-3.5 animate-fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-10">
            
            {/* Col 1 & 2: Brand & Studio Mission */}
            <div className="lg:col-span-2 space-y-5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-cobalt-muted flex items-center justify-center text-white shadow-sm">
                  <Code2 className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-display text-base font-extrabold tracking-tight text-white uppercase">
                    {siteConfig.brand}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-cobalt-accent" />
                </div>
              </div>
              
              <p className="text-xs text-muted-foreground max-w-sm leading-relaxed">
                A technology and project development initiative helping students plan, build, and thoroughly understand academic and practical software projects across web, AI/ML, mobile, IoT, and cybersecurity.
              </p>

              {/* Contact Coordinates */}
              <div className="p-4 rounded-xl border border-border-dark bg-[#161821] text-xs font-mono space-y-1 text-slate-300 shadow-subtle">
                <div className="text-white font-semibold mb-1 text-[11px] uppercase tracking-wider">
                  Contact Coordinates
                </div>
                <div>Email: <span className="text-slate-400">{siteConfig.contact.emailPlaceholder}</span></div>
                <div>Phone: <span className="text-slate-400">{siteConfig.contact.phonePlaceholder}</span></div>
                <div>Location: <span className="text-slate-400">{siteConfig.contact.locationPlaceholder}</span></div>
              </div>
            </div>

            {/* Col 3: Services */}
            <div className="space-y-3.5">
              <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
                Services
              </h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                {servicesData.map((s) => (
                  <li key={s.id}>
                    <a
                      href="#services"
                      onClick={(e) => handleScrollTo(e, '#services')}
                      className="hover:text-white transition-colors"
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Project Portfolio */}
            <div className="space-y-3.5">
              <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
                Selected Works
              </h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                {projectsData.slice(0, 5).map((p) => (
                  <li key={p.id}>
                    <a
                      href="#work"
                      onClick={(e) => handleScrollTo(e, '#work')}
                      className="hover:text-white transition-colors"
                    >
                      {p.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 5: Navigation & Methodology */}
            <div className="space-y-3.5">
              <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
                Company
              </h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                {siteConfig.navLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => handleScrollTo(e, link.href)}
                      className="hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Bottom Copyright & Guarantee */}
          <div className="mt-16 pt-8 border-t border-border-dark flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground font-mono">
            <div>
              &copy; {new Date().getFullYear()} Coderitz. All rights reserved.
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Direct co-founder project guidance &amp; implementation</span>
            </div>
          </div>

        </div>
      </div>

    </footer>
  );
}
