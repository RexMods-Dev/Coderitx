import React, { useState } from 'react';
import { ArrowRight, Terminal, CheckCircle2, ShieldCheck, Cpu, Code2, Layers } from 'lucide-react';
import { Button } from './ui/Button';

export function Hero({ onStartProjectClick, onExploreWorkClick }) {
  const [activeTab, setActiveTab] = useState('pipeline');

  const tabs = [
    { id: 'pipeline', label: 'build_pipeline.sh' },
    { id: 'stack', label: 'architecture.config' },
    { id: 'walkthrough', label: 'viva_walkthrough.md' }
  ];

  return (
    <section id="home" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden border-b border-neutral-200 dark:border-neutral-800/80">
      {/* Background subtle grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Status indicator pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/90 text-xs font-mono text-neutral-600 dark:text-neutral-400 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Academic & Practical Software Development</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-950 dark:text-white leading-[1.1] mb-6">
              Have an idea?<br />
              <span className="text-neutral-500 dark:text-neutral-400">Let's build it.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-xl leading-relaxed mb-8">
              From academic projects to practical software solutions, Coderitz helps turn technical ideas into working applications. Explore possibilities, discuss your requirements and build something meaningful with our team.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto mb-10">
              <Button
                size="lg"
                onClick={onStartProjectClick}
                className="w-full sm:w-auto gap-2 text-sm font-semibold shadow-md"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={onExploreWorkClick}
                className="w-full sm:w-auto text-sm font-medium"
              >
                Explore Our Work
              </Button>
            </div>

            {/* Small Supporting Line requested */}
            <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 w-full">
              <p className="text-xs sm:text-sm font-mono tracking-tight text-neutral-600 dark:text-neutral-400 font-medium">
                Web Development · AI &amp; ML · Mobile Applications · IoT · Software Engineering
              </p>
            </div>

          </div>

          {/* Right Engineering Console Visual */}
          <div className="lg:col-span-5 w-full">
            <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-950 text-neutral-100 shadow-2xl overflow-hidden font-mono text-xs">
              
              {/* Window Bar */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-900 border-b border-neutral-800 select-none">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                  <span className="ml-2 text-neutral-400 text-[11px]">coderitz-core-engine</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-neutral-400">
                  <Terminal className="w-3 h-3" />
                  <span>v2.4.0</span>
                </div>
              </div>

              {/* Tab Selector */}
              <div className="flex border-b border-neutral-800 bg-neutral-900/60 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-1.5 text-[11px] border-r border-neutral-800 transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'bg-neutral-950 text-white font-medium border-t-2 border-t-white'
                        : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Content Panel */}
              <div className="p-4 leading-relaxed space-y-3 min-h-[260px] bg-neutral-950">
                {activeTab === 'pipeline' && (
                  <div className="space-y-2 animate-fade-in text-[11px]">
                    <div className="text-neutral-500"># Continuous implementation &amp; verification loop</div>
                    <div className="text-neutral-300">
                      <span className="text-neutral-500">$</span> coderitz init --project "Student Academic Capstone"
                    </div>
                    <div className="text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 inline text-emerald-400 flex-shrink-0" />
                      <span>Requirements analyzed &amp; system architecture defined</span>
                    </div>
                    <div className="text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 inline text-emerald-400 flex-shrink-0" />
                      <span>PostgreSQL schema &amp; RESTful endpoints constructed</span>
                    </div>
                    <div className="text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 inline text-emerald-400 flex-shrink-0" />
                      <span>Unit tests executed: 14 passing, 0 errors</span>
                    </div>
                    <div className="pt-2 text-neutral-400 border-t border-neutral-800 flex items-center justify-between text-[10px]">
                      <span>STATUS: READY FOR WALKTHROUGH</span>
                      <span className="text-emerald-400">100% OPERATIONAL</span>
                    </div>
                  </div>
                )}

                {activeTab === 'stack' && (
                  <div className="space-y-1.5 text-[11px] animate-fade-in text-neutral-300">
                    <div className="text-neutral-500">// Modern, maintainable architecture standard</div>
                    <div><span className="text-neutral-400 font-bold">FRONTEND:</span> React, Vite, Tailwind CSS, Modern UI</div>
                    <div><span className="text-neutral-400 font-bold">BACKEND:</span> Node.js / Express, Python / Django, Flask</div>
                    <div><span className="text-neutral-400 font-bold">DATABASE:</span> PostgreSQL, Supabase, Redis caching</div>
                    <div><span className="text-neutral-400 font-bold">AI / ML:</span> YOLOv8, PyTorch, Scikit-Learn, OpenCV</div>
                    <div><span className="text-neutral-400 font-bold">EMBEDDED:</span> ESP32, RFID modules, Microcontrollers</div>
                    <div className="pt-2 text-neutral-500 text-[10px]">Clean commit logs &amp; complete project ownership.</div>
                  </div>
                )}

                {activeTab === 'walkthrough' && (
                  <div className="space-y-2 text-[11px] animate-fade-in text-neutral-300">
                    <div className="text-neutral-500">## Deliver &amp; Explain Commitment</div>
                    <p className="text-neutral-300">
                      "We do not treat student projects as black boxes. Every delivery includes guided sessions explaining every algorithm, module and database query."
                    </p>
                    <div className="grid grid-cols-2 gap-2 pt-1 text-[10px]">
                      <div className="p-2 rounded bg-neutral-900 border border-neutral-800">
                        <div className="text-neutral-400 font-semibold">Code Walkthrough</div>
                        <div className="text-neutral-500">Function-by-function explanation</div>
                      </div>
                      <div className="p-2 rounded bg-neutral-900 border border-neutral-800">
                        <div className="text-neutral-400 font-semibold">Viva Defense Prep</div>
                        <div className="text-neutral-500">Anticipated questions &amp; answers</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Status bar */}
              <div className="px-4 py-2 bg-neutral-900/90 border-t border-neutral-800 flex items-center justify-between text-[10px] text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Ready to accept new project enquiries
                </span>
                <span className="text-neutral-500 font-mono">B&amp;W Studio Spec</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
