import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowUpRight,
  Code2,
  ChevronDown,
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { servicesData } from '../data/services';
import { projectsData } from '../data/projects';
import { Button } from './ui/Button';

export function ContactFooter({ onStartProjectClick }) {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const elem = document.querySelector(id);
    if (elem) {
      const headerOffset = 70;
      const elementPosition = elem.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-neutral-950 text-neutral-100 border-t border-neutral-800">
      
      {/* Pre-footer Call to Action */}
      <div className="py-20 md:py-28 border-b border-neutral-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900 text-xs font-mono text-neutral-400 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Consultation &amp; Project Planning</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6 max-w-2xl mx-auto">
            {siteConfig.contact.closingHeadline}
          </h2>

          <p className="text-base text-neutral-400 max-w-xl mx-auto mb-10 leading-relaxed">
            Have a project concept, need technical guidance, or want to explore implementation approaches? Get in touch with our team today.
          </p>

          <Button
            size="lg"
            onClick={onStartProjectClick}
            className="bg-white text-neutral-950 hover:bg-neutral-200 gap-2 font-semibold shadow-lg"
          >
            <span>{siteConfig.contact.cta}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="py-16 border-b border-neutral-800/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h3 className="text-xl font-bold tracking-tight text-white mb-2">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-neutral-400 font-mono">
              Answers regarding our academic guidance and development process
            </p>
          </div>

          <div className="space-y-3">
            {siteConfig.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-lg border border-neutral-800 bg-neutral-900/60 transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 text-left flex items-center justify-between text-sm font-medium text-neutral-200 hover:text-white"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-white' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-neutral-400 leading-relaxed border-t border-neutral-800/60 pt-3 animate-fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            
            {/* Col 1: Brand & Bio (2 cols wide) */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded bg-white flex items-center justify-center text-neutral-950">
                  <Code2 className="w-4 h-4 stroke-[2.2]" />
                </div>
                <span className="font-mono text-base font-bold tracking-tight text-white uppercase">
                  {siteConfig.brand}
                </span>
              </div>
              
              <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
                A technology and project development initiative helping students plan, build, and thoroughly understand academic and practical software projects across web, AI/ML, mobile, IoT, and cybersecurity.
              </p>

              {/* Editable Placeholders Notice */}
              <div className="p-3 rounded border border-neutral-800/80 bg-neutral-900/40 text-[11px] text-neutral-400 font-mono">
                <div className="text-neutral-300 font-semibold mb-1">Direct Contact Placeholders:</div>
                <div>Email: {siteConfig.contact.emailPlaceholder}</div>
                <div>Phone: {siteConfig.contact.phonePlaceholder}</div>
                <div>Location: {siteConfig.contact.locationPlaceholder}</div>
              </div>
            </div>

            {/* Col 2: Services Links */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                Services
              </h4>
              <ul className="space-y-2 text-xs text-neutral-400">
                {servicesData.slice(0, 5).map((s) => (
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

            {/* Col 3: Selected Projects */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                Projects
              </h4>
              <ul className="space-y-2 text-xs text-neutral-400">
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

            {/* Col 4: Quick Navigation & Touchpoint */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                Navigation
              </h4>
              <ul className="space-y-2 text-xs text-neutral-400">
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

          {/* Bottom Copyright & Status Bar */}
          <div className="mt-16 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-mono">
            <div>
              &copy; {new Date().getFullYear()} Coderitz. Built with precision. All rights reserved.
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Available for CSE &amp; IT project assistance</span>
            </div>
          </div>

        </div>
      </div>

    </footer>
  );
}
