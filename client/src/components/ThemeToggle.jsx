import React from 'react';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle({ theme, toggleTheme }) {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="relative p-2 rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors focus:outline-none focus:ring-1 focus:ring-neutral-400"
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 transition-transform duration-200 rotate-0" />
      ) : (
        <Moon className="w-4 h-4 transition-transform duration-200 rotate-0" />
      )}
    </button>
  );
}
