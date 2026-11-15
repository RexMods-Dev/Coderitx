import React from 'react';
import { cn } from '../../lib/utils';

export const Button = React.forwardRef(({
  className,
  variant = 'primary',
  size = 'default',
  children,
  ...props
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus-ring disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer tracking-tight relative overflow-hidden group";
  
  const variants = {
    // Primary Muted Cobalt CTA with deep cobalt hover & subtle lift
    primary: "bg-cobalt-muted hover:bg-cobalt-deep text-white dark:bg-cobalt-muted dark:hover:bg-cobalt-deep dark:text-white shadow-sm border border-cobalt-muted/20 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0",
    
    // High-contrast Midnight Ink button
    ink: "bg-ink-midnight hover:bg-ink-deep text-white dark:bg-foreground dark:text-ink-midnight dark:hover:bg-white shadow-sm border border-transparent hover:shadow-md hover:-translate-y-0.5 active:translate-y-0",
    
    // Clean secondary surface button
    secondary: "bg-surface hover:bg-ivory-warm dark:bg-[#1B1E26] dark:hover:bg-[#222631] text-ink-midnight dark:text-foreground border border-border-soft dark:border-border-dark shadow-subtle hover:border-slate-grey/30 dark:hover:border-muted-foreground/30 hover:-translate-y-0.5 active:translate-y-0",
    
    // Outline button
    outline: "border border-border-soft dark:border-border-dark bg-transparent text-ink-midnight dark:text-foreground hover:bg-surface dark:hover:bg-[#1B1E26] hover:border-slate-grey/40 dark:hover:border-muted-foreground/40 hover:-translate-y-0.5 active:translate-y-0",
    
    // Ghost
    ghost: "bg-transparent text-slate-grey dark:text-muted-foreground hover:text-ink-midnight dark:hover:text-foreground hover:bg-surface/80 dark:hover:bg-[#1B1E26]/80",
    
    // Link
    link: "text-cobalt-muted dark:text-cobalt-accent underline-offset-4 hover:underline p-0 h-auto"
  };

  const sizes = {
    default: "min-h-[40px] px-4 py-2 text-sm rounded-lg",
    sm: "min-h-[36px] px-3.5 py-1.5 text-xs rounded-md",
    lg: "min-h-[48px] px-7 py-3 text-sm sm:text-base rounded-xl font-semibold",
    icon: "h-10 w-10 rounded-lg p-0"
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
