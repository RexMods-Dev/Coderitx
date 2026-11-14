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
      setScrolled(window.scrollY > 20);

      // Section spy
      const sections = ['home', 'services', 'work', 'workflow', 'about', 'enquiry'];
      for (const s of sections) {
        const el = document.getElementById(s);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-ivory-warm/95 dark:bg-background/95 backdrop-blur-md border-b border-border-soft dark:border-border-dark py-3.5 shadow-subtle'
          : 'bg-ivory-warm dark:bg-background border-b border-border-soft/60 dark:border-border-dark/60 py-4.5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand */}
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, '#home')}
          className="flex items-center gap-2.5 group focus-ring rounded"
        >
          <div className="w-8 h-8 rounded-md bg-ink-midnight dark:bg-surface text-white dark:text-foreground flex items-center justify-center transition-all duration-200 group-hover:bg-cobalt-muted dark:group-hover:bg-cobalt-accent dark:group-hover:text-ink-midnight shadow-sm">
            <Code2 className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-display font-bold text-base tracking-tight text-ink-midnight dark:text-foreground uppercase">
                CODERITZ
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-cobalt-muted dark:bg-cobalt-accent inline-block" />
            </div>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`transition-colors py-1 relative ${
                  isActive
                    ? 'text-ink-midnight dark:text-foreground font-semibold'
                    : 'text-slate-grey dark:text-muted-foreground hover:text-ink-midnight dark:hover:text-foreground'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cobalt-muted dark:bg-cobalt-accent rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <Button
            size="sm"
            variant="primary"
            onClick={onStartProjectClick}
            className="gap-1.5"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 rounded-md border border-border-soft dark:border-border-dark bg-surface text-slate-grey dark:text-muted-foreground hover:text-ink-midnight dark:hover:text-foreground focus-ring"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border-soft dark:border-border-dark bg-ivory-warm dark:bg-surface px-5 pt-4 pb-6 animate-fade-in shadow-surface">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="py-2 text-sm font-medium text-ink-midnight dark:text-foreground hover:text-cobalt-muted dark:hover:text-cobalt-accent border-b border-border-soft/60 dark:border-border-dark/60 flex items-center justify-between"
              >
                <span>{link.name}</span>
                <span className="text-slate-grey/50 text-xs font-mono">0{navLinks.indexOf(link) + 1}</span>
              </a>
            ))}
            <div className="pt-2">
              <Button
                variant="primary"
                className="w-full justify-center gap-2 py-2.5"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onStartProjectClick();
                }}
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
