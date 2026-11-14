import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Code2 } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { Button } from './ui/Button';

export function Navbar({ theme, toggleTheme, onStartProjectClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Section spy
      const sections = ['home', 'services', 'work', 'workflow', 'about', 'enquiry'];
      for (const s of sections) {
        const el = document.getElementById(s);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(s);
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
    { name: 'How We Work', href: '#workflow', id: 'workflow' },
    { name: 'About Us', href: '#about', id: 'about' },
    { name: 'Contact', href: '#enquiry', id: 'enquiry' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const headerOffset = 90;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="fixed top-3 sm:top-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      
      {/* Floating Island Container */}
      <div
        className={`w-full max-w-6xl rounded-2xl border transition-all duration-300 pointer-events-auto ${
          scrolled
            ? 'bg-surface/92 dark:bg-surface/92 backdrop-blur-xl border-border-soft dark:border-border-dark shadow-elevated py-2 px-4 sm:px-6'
            : 'bg-surface/85 dark:bg-surface/85 backdrop-blur-lg border-border-soft/80 dark:border-border-dark/80 shadow-surface py-2.5 px-4 sm:px-6'
        }`}
      >
        <div className="flex items-center justify-between h-11">
          
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
                      ? 'text-ink-midnight dark:text-foreground bg-ivory-warm/80 dark:bg-surface-elevated'
                      : 'text-slate-grey dark:text-muted-foreground hover:text-ink-midnight dark:hover:text-foreground hover:bg-ivory-warm/40 dark:hover:bg-surface-elevated/40'
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
              className="p-2 rounded-lg border border-border-soft dark:border-border-dark bg-surface text-slate-grey dark:text-muted-foreground hover:text-ink-midnight dark:hover:text-foreground focus-ring"
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
                className="py-2.5 px-3 rounded-lg text-xs font-semibold text-ink-midnight dark:text-foreground hover:bg-ivory-warm dark:hover:bg-surface-elevated flex items-center justify-between"
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
