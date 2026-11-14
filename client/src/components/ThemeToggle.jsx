import React from 'react';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle({ theme, toggleTheme }) {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="relative p-2 rounded-md border border-border-soft dark:border-border-dark bg-surface text-slate-grey dark:text-muted-foreground hover:text-ink-midnight dark:hover:text-foreground hover:border-slate-grey/30 dark:hover:border-muted-foreground/30 transition-all focus-ring"
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 transition-transform duration-200 rotate-0 text-amber-300" />
      ) : (
        <Moon className="w-4 h-4 transition-transform duration-200 rotate-0 text-slate-grey" />
      )}
    </button>
  );
}
