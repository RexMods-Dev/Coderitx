import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Code2 } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { Button } from './ui/Button';
import { siteConfig } from '../data/siteConfig';

export function Navbar({ theme, toggleTheme, onStartProjectClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Section spy
      const sections = ['home', 'services', 'work', 'workflow', 'about', 'enquiry'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'Services', href: '#services', id: 'services' },
    { name: 'Our Work', href: '#work', id: 'work' },
    { name: 'Workflow', href: '#workflow', id: 'workflow' },
    { name: 'About Us', href: '#about', id: 'about' },
    { name: 'Contact', href: '#enquiry', id: 'enquiry' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const headerOffset = 76;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 sm:py-4 px-4 sm:px-6 lg:px-8`}
    >
      <div
        className={`max-w-6xl mx-auto rounded-2xl transition-all duration-300 px-4 sm:px-6 py-2.5 sm:py-3 border ${
          scrolled
            ? 'glass-surface border-border-soft/90 dark:border-border-dark/90 shadow-elevated'
            : 'bg-surface/80 dark:bg-[#111318]/90 backdrop-blur-md border-border-soft/60 dark:border-border-dark/60 shadow-subtle'
        }`}
      >
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & Wordmark */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            className="flex items-center gap-2.5 group focus-ring rounded-lg px-1.5 py-1"
          >
            <div className="w-8 h-8 rounded-lg bg-ink-midnight dark:bg-foreground text-white dark:text-ink-midnight flex items-center justify-center transition-all duration-200 group-hover:bg-cobalt-muted dark:group-hover:bg-cobalt-accent shadow-sm">
              <Code2 className="w-4 h-4 stroke-[2.2]" />
            </div>
            
            <div className="flex items-center gap-1.5">
              <span className="font-display font-extrabold text-base tracking-tight text-ink-midnight dark:text-foreground uppercase">
                CODERITZ
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-cobalt-muted dark:bg-cobalt-accent inline-block" />
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-tight transition-all relative ${
                    isActive
                      ? 'text-ink-midnight dark:text-foreground bg-ivory-warm dark:bg-[#222631]'
                      : 'text-slate-grey dark:text-muted-foreground hover:text-ink-midnight dark:hover:text-foreground hover:bg-ivory-warm/60 dark:hover:bg-[#222631]/60'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-1 left-3 right-3 h-0.5 bg-cobalt-muted dark:bg-cobalt-accent rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center gap-2.5">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <Button
              size="sm"
              variant="primary"
              onClick={onStartProjectClick}
              className="gap-1.5 h-9 px-4 rounded-lg text-xs font-semibold"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Button>
          </div>

          {/* Mobile Menu & Theme Toggle */}
          <div className="flex items-center gap-2 sm:hidden">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="p-2 rounded-lg border border-border-soft dark:border-border-dark bg-surface dark:bg-[#1B1E26] text-slate-grey dark:text-muted-foreground hover:text-ink-midnight dark:hover:text-foreground focus-ring"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="sm:hidden mt-3 pt-3 border-t border-border-soft/80 dark:border-border-dark/80 animate-fade-in space-y-1">
            {navLinks.map((link, idx) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="py-2.5 px-3 rounded-lg text-xs font-semibold text-ink-midnight dark:text-foreground hover:bg-ivory-warm dark:hover:bg-[#222631] flex items-center justify-between"
              >
                <span>{link.name}</span>
                <span className="text-[10px] font-mono text-slate-grey/60">0{idx + 1}</span>
              </a>
            ))}
            <div className="pt-2">
              <Button
                variant="primary"
                size="sm"
                className="w-full justify-center gap-2 h-10 text-xs font-semibold rounded-lg"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onStartProjectClick();
                }}
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
