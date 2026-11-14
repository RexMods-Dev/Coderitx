import React, { useState, useEffect } from 'react';
import { Code2, ArrowUpRight, Terminal, CheckCircle2, Shield, Cpu, Layers, Sparkles, Activity, Play, RefreshCw, Database } from 'lucide-react';

const logMessages = [
  { time: '0.04s', type: 'SYS', text: 'Coderitz studio kernel initialized (Node.js + Python 3.11)', color: 'text-cobalt-muted dark:text-cobalt-accent' },
  { time: '0.12s', type: 'POSTGRES', text: 'Pool connected: enquiries & auction_bids tables verified (ACID compliant)', color: 'text-emerald-500' },
  { time: '0.24s', type: 'IOT', text: 'ESP32 firmware serial link synchronized @ 115200 baud', color: 'text-amber-500' },
  { time: '0.38s', type: 'AI/ML', text: 'Ultralytics YOLOv8 weights loaded into GPU memory (mAP@50: 98.4%)', color: 'text-sky-500' },
  { time: '0.52s', type: 'QUEUE', text: 'Celery async task workers active (Redis pub/sub latency: 1.4ms)', color: 'text-purple-400' },
  { time: '0.68s', type: 'VIVA', text: 'Project walkthrough dossier & examiner Q&A syllabus mapped', color: 'text-emerald-400' },
];

export function LaptopScreenContent({ onStartProjectClick, onExploreWorkClick }) {
  const [activeTab, setActiveTab] = useState('terminal');
  const [displayedLogs, setDisplayedLogs] = useState(logMessages.slice(0, 3));
  const [counter, setCounter] = useState(3);

  // Dynamic live terminal ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => {
        const next = (prev % logMessages.length) + 1;
        setDisplayedLogs(logMessages.slice(0, next));
        return next;
      });
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full bg-[#0F1117] text-white overflow-hidden flex flex-col font-mono select-none relative">
      
      {/* IDE Top Window Bar */}
      <div className="w-full px-4 py-2 bg-[#171A23] border-b border-white/10 flex items-center justify-between z-10">
        
        {/* Window controls & active file */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-red-600/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-amber-600/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-emerald-600/40" />
          </div>

          <div className="flex items-center gap-1 pl-2 border-l border-white/10 text-[11px] text-slate-300">
            <Code2 className="w-3.5 h-3.5 text-cobalt-accent" />
            <span className="font-semibold text-white">coderitz_runtime.py</span>
          </div>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-1 bg-black/40 p-0.5 rounded-lg border border-white/10 text-[10px]">
          <button
            type="button"
            onClick={() => setActiveTab('terminal')}
            className={`px-2.5 py-1 rounded transition-all flex items-center gap-1 ${
              activeTab === 'terminal'
                ? 'bg-cobalt-muted text-white font-semibold shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Terminal className="w-3 h-3" />
            <span>Live Terminal</span>
          </button>
          
          <button
            type="button"
            onClick={() => setActiveTab('architecture')}
            className={`px-2.5 py-1 rounded transition-all flex items-center gap-1 ${
              activeTab === 'architecture'
                ? 'bg-cobalt-muted text-white font-semibold shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3 h-3" />
            <span>Architecture</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('defense')}
            className={`px-2.5 py-1 rounded transition-all flex items-center gap-1 ${
              activeTab === 'defense'
                ? 'bg-cobalt-muted text-white font-semibold shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Shield className="w-3 h-3" />
            <span>Viva Prep</span>
          </button>
        </div>

        {/* Studio Status Live Pulse */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] border border-emerald-500/20 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>RUNNING 100%</span>
          </span>
        </div>
      </div>

      {/* Screen Body */}
      <div className="flex-1 p-5 sm:p-6 overflow-hidden flex flex-col justify-between relative bg-[#0D0F15]">
        
        {/* Subtle glowing circuit grid */}
        <div className="absolute inset-0 bg-subtle-grid opacity-20 pointer-events-none" />

        {/* Ambient Cobalt Glow */}
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-cobalt-muted/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* TAB 1: Live Terminal Log Stream */}
        {activeTab === 'terminal' && (
          <div className="flex-1 flex flex-col justify-between z-10 animate-fade-in">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-white/10 pb-2">
                <span className="flex items-center gap-1.5 text-white font-semibold">
                  <Activity className="w-3.5 h-3.5 text-cobalt-accent animate-pulse" />
                  Continuous Compilation &amp; Telemetry Stream
                </span>
                <span className="text-[10px] text-slate-400 font-mono">PID: 4092 • PORT: 5000</span>
              </div>

              {/* Logs */}
              <div className="space-y-1.5 text-xs pt-1 font-mono">
                {displayedLogs.map((log, index) => (
                  <div key={index} className="flex items-start gap-2 animate-fade-in leading-relaxed">
                    <span className="text-slate-500 text-[10px] mt-0.5">[{log.time}]</span>
                    <span className={`font-bold text-[10px] px-1 rounded bg-white/5 ${log.color}`}>
                      {log.type}
                    </span>
                    <span className="text-slate-200 text-[11px]">{log.text}</span>
                  </div>
                ))}

                <div className="flex items-center gap-2 pt-1 text-xs text-cobalt-accent">
                  <span className="text-slate-500">$</span>
                  <span className="animate-pulse">coderitz watch --ready-for-handover _</span>
                </div>
              </div>
            </div>

            {/* Metrics HUD strip */}
            <div className="pt-3 border-t border-white/10 grid grid-cols-4 gap-2 text-[10px]">
              <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                <div className="text-slate-400 text-[9px] uppercase">Database Sync</div>
                <div className="text-emerald-400 font-bold mt-0.5">PostgreSQL ACID</div>
              </div>
              <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                <div className="text-slate-400 text-[9px] uppercase">Telemetry Speed</div>
                <div className="text-white font-bold mt-0.5">&lt; 18ms Latency</div>
              </div>
              <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                <div className="text-slate-400 text-[9px] uppercase">Hardware Nodes</div>
                <div className="text-amber-400 font-bold mt-0.5">ESP32 + RFID</div>
              </div>
              <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                <div className="text-slate-400 text-[9px] uppercase">Viva Readiness</div>
                <div className="text-cobalt-accent font-bold mt-0.5">100% Walkthrough</div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: System Architecture Flow */}
        {activeTab === 'architecture' && (
          <div className="flex-1 flex flex-col justify-between z-10 animate-fade-in text-xs space-y-3">
            <div className="text-[11px] text-slate-400 border-b border-white/10 pb-2 flex items-center justify-between">
              <span className="text-white font-semibold">Tier-1 Multi-Layered Architecture</span>
              <span className="text-emerald-400 text-[10px]">Modular Microservices</span>
            </div>

            <div className="grid grid-cols-3 gap-2.5 py-1">
              <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-1">
                <div className="text-[10px] text-cobalt-accent font-bold uppercase">Presentation Layer</div>
                <div className="text-white text-[11px] font-semibold">React + Vite + Tailwind</div>
                <div className="text-slate-400 text-[10px]">State caching, glassmorphic UI, responsive layout</div>
              </div>

              <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-1">
                <div className="text-[10px] text-amber-400 font-bold uppercase">Backend &amp; Queues</div>
                <div className="text-white text-[11px] font-semibold">Django / Node.js + Celery</div>
                <div className="text-slate-400 text-[10px]">JWT auth, rate limits, async background task queues</div>
              </div>

              <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-1">
                <div className="text-[10px] text-emerald-400 font-bold uppercase">Hardware &amp; AI</div>
                <div className="text-white text-[11px] font-semibold">ESP32 + YOLOv8 Models</div>
                <div className="text-slate-400 text-[10px]">RC522 RFID serial sync, PyTorch inference pipeline</div>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-cobalt-muted/15 border border-cobalt-muted/30 text-[11px] text-slate-300 flex items-center justify-between">
              <span>Code is cleanly documented with commit milestones for student understanding.</span>
              <span className="text-cobalt-accent font-bold text-[10px]">Production Verified</span>
            </div>
          </div>
        )}

        {/* TAB 3: Viva Walkthrough Preparation */}
        {activeTab === 'defense' && (
          <div className="flex-1 flex flex-col justify-between z-10 animate-fade-in text-xs space-y-2">
            <div className="text-[11px] text-slate-400 border-b border-white/10 pb-2 flex items-center justify-between">
              <span className="text-white font-semibold">1-on-1 Code Walkthrough &amp; Viva Defense Prep</span>
              <span className="text-emerald-400 text-[10px]">Student Guarantee</span>
            </div>

            <div className="space-y-2 text-[11px] text-slate-300">
              <div className="flex items-center gap-2 p-2 rounded bg-white/5 border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Line-by-line function walkthroughs explaining architectural design decisions</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-white/5 border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Anticipated external examiner viva questions with technical rationale</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-white/5 border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>ER diagrams, database normalization docs, and API documentation (Swagger/Postman)</span>
              </div>
            </div>

            <div className="p-2 rounded bg-white/5 border border-white/10 text-[10px] text-slate-400 flex items-center justify-between">
              <span>"We never hand over an unexplained black box."</span>
              <span className="text-white font-semibold">Coderitz Guarantee</span>
            </div>
          </div>
        )}

        {/* Bottom Interactive Bar */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between z-10">
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Coderitz Engineering Workstation</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onStartProjectClick}
              className="px-3 py-1 rounded-md bg-cobalt-muted hover:bg-cobalt-deep text-white text-[11px] font-semibold flex items-center gap-1 transition-all shadow-sm"
            >
              <span>Build This Project</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
