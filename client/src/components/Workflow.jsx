import React from 'react';
import { workflowSteps } from '../data/workflow';
import { Check, MessageSquare, Compass, Hammer, Presentation } from 'lucide-react';

const stepIcons = [MessageSquare, Compass, Hammer, Presentation];

export function Workflow({ onStartProjectClick }) {
  return (
    <section id="workflow" className="py-20 md:py-28 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
            <span>03 / Development Method</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white mb-4">
            How We Work
          </h2>
          <p className="text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
            We follow a straightforward four-step development approach designed to keep you informed, confident, and prepared for your college evaluation.
          </p>
        </div>

        {/* 4-Step Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {workflowSteps.map((step, idx) => {
            const Icon = stepIcons[idx] || MessageSquare;

            return (
              <div
                key={step.step}
                className="relative flex flex-col justify-between p-6 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 shadow-sm hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
              >
                <div>
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-2xl font-bold text-neutral-300 dark:text-neutral-700">
                      {step.step}
                    </span>
                    <div className="w-8 h-8 rounded border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-800 dark:text-neutral-200 bg-neutral-50 dark:bg-neutral-800/80">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Title & Summary */}
                  <h3 className="text-lg font-bold tracking-tight text-neutral-950 dark:text-white mb-2">
                    {step.name}
                  </h3>
                  <p className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-3">
                    {step.summary}
                  </p>

                  {/* Deep Details */}
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed mb-6">
                    {step.details}
                  </p>
                </div>

                {/* Outcome badge */}
                <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800/80">
                  <div className="text-[10px] font-mono uppercase text-neutral-400 mb-1">
                    Key Outcome:
                  </div>
                  <div className="text-xs font-medium text-neutral-900 dark:text-neutral-200 flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-neutral-500 mt-0.5 flex-shrink-0" />
                    <span>{step.deliverable}</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Technical Understanding Emphasis Banner */}
        <div className="mt-12 p-6 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-neutral-950 dark:text-white">
              Why Step 4 matters most to us
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
              Anyone can produce code, but passing college reviews requires understanding it. We conduct thorough walkthroughs covering module design, database queries, and typical viva questions so you can present your project with complete confidence.
            </p>
          </div>
          <button
            type="button"
            onClick={onStartProjectClick}
            className="px-4 py-2 rounded-md bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 text-xs font-medium whitespace-nowrap hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
          >
            Schedule Initial Discussion
          </button>
        </div>

      </div>
    </section>
  );
}
