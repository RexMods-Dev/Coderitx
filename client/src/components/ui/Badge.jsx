import React from 'react';
import { cn } from '../../lib/utils';

export function Badge({ className, variant = 'default', children, ...props }) {
  const variants = {
    default: "bg-surface text-ink-midnight dark:bg-surface dark:text-foreground border-border-soft dark:border-border-dark",
    outline: "text-slate-grey dark:text-muted-foreground border-border-soft dark:border-border-dark bg-transparent",
    mono: "font-mono text-[11px] bg-ivory-warm dark:bg-surface-elevated text-slate-grey dark:text-muted-foreground border-border-soft dark:border-border-dark",
    cobalt: "bg-cobalt-muted/10 text-cobalt-muted dark:bg-cobalt-accent/15 dark:text-cobalt-accent border-cobalt-muted/20 dark:border-cobalt-accent/25",
    subtle: "bg-ivory-warm dark:bg-surface-elevated text-ink-midnight dark:text-foreground border-transparent font-medium"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium border transition-colors",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
