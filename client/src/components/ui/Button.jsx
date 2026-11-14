import React from 'react';
import { cn } from '../../lib/utils';

export const Button = React.forwardRef(({
  className,
  variant = 'primary',
  size = 'default',
  children,
  ...props
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium text-sm transition-all duration-150 focus-ring disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer tracking-tight";
  
  const variants = {
    // Primary Muted Cobalt CTA
    primary: "bg-cobalt-muted hover:bg-cobalt-deep text-white dark:bg-cobalt-accent dark:hover:bg-cobalt-hover dark:text-ink-midnight shadow-sm border border-transparent active:scale-[0.99]",
    // High-contrast Midnight Ink button
    ink: "bg-ink-midnight hover:bg-ink-deep text-white dark:bg-foreground dark:text-ink-midnight dark:hover:bg-white shadow-sm border border-transparent active:scale-[0.99]",
    // Clean secondary surface button
    secondary: "bg-surface hover:bg-ivory-warm dark:bg-surface dark:hover:bg-surface-elevated text-foreground border border-border-soft dark:border-border-dark active:scale-[0.99]",
    // Outline button
    outline: "border border-border-soft dark:border-border-dark bg-transparent text-foreground hover:bg-surface dark:hover:bg-surface active:scale-[0.99]",
    // Ghost
    ghost: "bg-transparent text-slate-grey dark:text-muted-foreground hover:text-foreground hover:bg-surface dark:hover:bg-surface",
    // Link
    link: "text-cobalt-muted dark:text-cobalt-accent underline-offset-4 hover:underline p-0 h-auto"
  };

  const sizes = {
    default: "h-9 px-4 py-2 rounded-md text-sm",
    sm: "h-8 px-3 text-xs rounded-md",
    lg: "h-11 px-5 text-sm sm:text-base rounded-md font-semibold",
    icon: "h-9 w-9 rounded-md p-0"
  };

  return (
    <button
      ref={ref}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";
