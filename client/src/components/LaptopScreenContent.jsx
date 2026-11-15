import React, { useState, useEffect, useRef } from 'react';
import {
  Code2,
  ArrowUpRight,
  Terminal,
  CheckCircle2,
  Shield,
  Cpu,
  Layers,
  Sparkles,
  Activity,
  Play,
  RotateCcw,
  Database,
  Radio,
  FileCode2,
  Check,
  Zap,
  Clock,
  ChevronRight
} from 'lucide-react';

const initialLogs = [
  { id: 1, time: '0.04s', type: 'SYS', text: 'Coderitz studio kernel initialized (Node.js + Python 3.11)', color: 'text-cobalt-accent' },
  { id: 2, time: '0.12s', type: 'POSTGRES', text: 'Pool connected: enquiries & auction_bids (ACID compliant)', color: 'text-emerald-400' },
  { id: 3, time: '0.24s', type: 'IOT', text: 'ESP32 firmware serial link synchronized @ 115200 baud', color: 'text-amber-400' },
  { id: 4, time: '0.38s', type: 'AI/ML', text: 'Ultralytics YOLOv8 weights loaded into GPU (mAP@50: 98.4%)', color: 'text-sky-400' },
  { id: 5, time: '0.52s', type: 'QUEUE', text: 'Celery async task workers active (Redis pub/sub: 1.4ms)', color: 'text-purple-400' },
  { id: 6, time: '0.68s', type: 'VIVA', text: 'Project walkthrough dossier & examiner Q&A mapped', color: 'text-emerald-400' },
  { id: 7, time: '0.85s', type: 'API', text: 'REST endpoints verified (Rate limiter: 30 req/min/IP)', color: 'text-indigo-400' },
  { id: 8, time: '1.02s', type: 'SYNC', text: 'All microservices green • Ready for student deployment', color: 'text-emerald-300' }
];

export function LaptopScreenContent({ onStartProjectClick, onExploreWorkClick }) {
  const [activeTab, setActiveTab] = useState('terminal');
  const [logs, setLogs] = useState(initialLogs.slice(0, 4));
  const [logIndex, setLogIndex] = useState(4);
  const [isSimulating, setIsSimulating] = useState(false);
  const [pulseCount, setPulseCount] = useState(0);
  const [activeDefenseIndex, setActiveDefenseIndex] = useState(0);
  const logContainerRef = useRef(null);

  // Dynamic live log stream ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setLogIndex((prev) => {
        const next = prev < initialLogs.length ? prev + 1 : 1;
        setLogs(initialLogs.slice(0, next));
        return next;
      });
      setPulseCount((p) => p + 1);
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll logs to bottom
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const handleTriggerSimulation = () => {
    setIsSimulating(true);
    setLogs(initialLogs.slice(0, 2));
    setLogIndex(2);

    let step = 2;
    const simInterval = setInterval(() => {
      step++;
      if (step <= initialLogs.length) {
        setLogs(initialLogs.slice(0, step));
        setLogIndex(step);
      } else {
        clearInterval(simInterval);
        setIsSimulating(false);
      }
    }, 400);
  };

  const defenseQuestions = [
    {
      q: "Why choose PostgreSQL with connection pooling over MongoDB for this system?",
      a: "PostgreSQL guarantees ACID compliance for critical transactional operations (such as student records and auction bids). Connection pooling mitigates handshake overhead, allowing high concurrency under heavy load without exhausting server file descriptors."
    },
    {
      q: "How does the ESP32 communicate with your cloud backend without latency spikes?",
      a: "We utilize asynchronous non-blocking HTTP and lightweight MQTT brokers with keep-alive heartbeats, ensuring packet loss resilience and sub-20ms sensor dispatch even over fluctuating Wi-Fi channels."
    },
    {
      q: "What architectural pattern prevents race conditions in concurrent requests?",
      a: "We implement atomic database row-level locking (`SELECT ... FOR UPDATE`) paired with Redis distributed locks and serialized task execution via Celery background workers."
    }
  ];

  return (
    <div className="w-full h-full bg-[#0D1017] text-white overflow-hidden flex flex-col font-mono select-none relative">
      
      {/* IDE Top Window Bar (macOS Pro Glass Aesthetic) */}
      <div className="w-full px-3 sm:px-4 py-2 bg-[#151922]/90 backdrop-blur-md border-b border-white/10 flex items-center justify-between z-20">
        
        {/* Left: Window traffic lights & filename */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-red-500/50 shadow-[0_0_8px_rgba(255,95,86,0.4)]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-amber-500/50 shadow-[0_0_8px_rgba(255,189,46,0.4)]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-emerald-500/50 shadow-[0_0_8px_rgba(39,201,63,0.4)]" />
          </div>

          <div className="hidden sm:flex items-center gap-1.5 pl-2 border-l border-white/10 text-[11px] text-slate-300">
            <FileCode2 className="w-3.5 h-3.5 text-cobalt-accent" />
            <span className="font-semibold text-white tracking-tight">coderitz_runtime.py</span>
            <span className="text-[10px] text-slate-500">• modified</span>
          </div>
        </div>

        {/* Center: Interactive Workspace Mode Switcher */}
        <div className="flex items-center gap-1 bg-black/50 p-1 rounded-lg border border-white/10 text-[10px]">
          <button
            type="button"
            onClick={() => setActiveTab('terminal')}
            className={`px-2.5 py-1 rounded transition-all flex items-center gap-1.5 ${
              activeTab === 'terminal'
                ? 'bg-cobalt-muted text-white font-semibold shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Terminal className="w-3 h-3" />
            <span>Terminal</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('architecture')}
            className={`px-2.5 py-1 rounded transition-all flex items-center gap-1.5 ${
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
            className={`px-2.5 py-1 rounded transition-all flex items-center gap-1.5 ${
              activeTab === 'defense'
                ? 'bg-cobalt-muted text-white font-semibold shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Shield className="w-3 h-3" />
            <span>Viva Prep</span>
          </button>
        </div>

        {/* Right: Studio Status & Replay Trigger */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleTriggerSimulation}
            disabled={isSimulating}
            title="Re-run compilation stream"
            className="p-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
          >
            <RotateCcw className={`w-3 h-3 ${isSimulating ? 'animate-spin text-cobalt-accent' : ''}`} />
          </button>

          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] border border-emerald-500/30 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
            <span>LIVE 100%</span>
          </span>
        </div>
      </div>

      {/* Screen Body */}
      <div className="flex-1 p-4 sm:p-5 overflow-hidden flex flex-col justify-between relative bg-[#0B0D13]">
        
        {/* Subtle glowing circuit grid */}
        <div className="absolute inset-0 bg-subtle-grid opacity-30 pointer-events-none" />

        {/* Ambient Cobalt Glow Orbs */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-cobalt-muted/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* ============================================================== */}
        {/* TAB 1: Live Terminal Log Stream & Real-time Telemetry          */}
        {/* ============================================================== */}
        {activeTab === 'terminal' && (
          <div className="flex-1 flex flex-col justify-between z-10 transition-opacity duration-200">
            <div className="space-y-2">
              {/* Telemetry Header */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-white/10 pb-2">
                <span className="flex items-center gap-2 text-white font-semibold">
                  <Activity className="w-3.5 h-3.5 text-cobalt-accent animate-pulse" />
                  <span>Continuous Compilation &amp; Telemetry Stream</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  PID: 4092 • PORT: 5000 • TICK #{pulseCount}
                </span>
              </div>

              {/* Streaming Logs Box */}
              <div
                ref={logContainerRef}
                className="space-y-1.5 text-xs pt-1 max-h-[175px] sm:max-h-[200px] overflow-y-auto pr-1"
              >
                {logs.map((log) => (
                  <div key={log.id} className="flex items-start gap-2 leading-relaxed transition-all">
                    <span className="text-slate-500 text-[10px] mt-0.5 select-none font-mono">
                      [{log.time}]
                    </span>
                    <span className={`font-bold text-[10px] px-1.5 py-0.2 rounded bg-white/5 border border-white/10 ${log.color}`}>
                      {log.type}
                    </span>
                    <span className="text-slate-200 text-[11px]">{log.text}</span>
                  </div>
                ))}

                {/* Live CLI Prompt */}
                <div className="flex items-center gap-2 pt-1 text-xs text-cobalt-accent font-mono">
                  <span className="text-slate-500">$</span>
                  <span className="text-slate-300">coderitz watch</span>
                  <span className="text-emerald-400 font-semibold">--verified</span>
                  <span className="w-2 h-3.5 bg-cobalt-accent animate-pulse ml-0.5" />
                </div>
              </div>
            </div>

            {/* Metrics HUD strip */}
            <div className="pt-3 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px]">
              <div className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-cobalt-muted/40 transition-colors">
                <div className="text-slate-400 text-[9px] uppercase tracking-wide flex items-center justify-between">
                  <span>Database</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <div className="text-emerald-400 font-bold mt-0.5">PostgreSQL ACID</div>
              </div>

              <div className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-cobalt-muted/40 transition-colors">
                <div className="text-slate-400 text-[9px] uppercase tracking-wide">Telemetry Latency</div>
                <div className="text-white font-bold mt-0.5 flex items-center gap-1">
                  <span>14ms</span>
                  <span className="text-[9px] text-emerald-400 font-normal">(Optimal)</span>
                </div>
              </div>

              <div className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-cobalt-muted/40 transition-colors">
                <div className="text-slate-400 text-[9px] uppercase tracking-wide">Hardware Nodes</div>
                <div className="text-amber-400 font-bold mt-0.5">ESP32 + RC522 RFID</div>
              </div>

              <div className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-cobalt-muted/40 transition-colors">
                <div className="text-slate-400 text-[9px] uppercase tracking-wide">Viva Readiness</div>
                <div className="text-cobalt-accent font-bold mt-0.5">100% Prepared</div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: Multi-Tier Architecture & Data Flow                     */}
        {/* ============================================================== */}
        {activeTab === 'architecture' && (
          <div className="flex-1 flex flex-col justify-between z-10 transition-opacity duration-200 text-xs space-y-3">
            <div className="text-[11px] text-slate-400 border-b border-white/10 pb-2 flex items-center justify-between">
              <span className="text-white font-semibold flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cobalt-accent" />
                <span>Tier-1 Multi-Layered Architecture</span>
              </span>
              <span className="text-emerald-400 text-[10px] font-semibold">Modular &amp; Scalable</span>
            </div>

            {/* Architecture 3-Column Diagram */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 py-1">
              {/* Layer 1 */}
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-cobalt-accent/40 transition-all space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-cobalt-accent font-bold uppercase tracking-wider">Client Layer</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-cobalt-muted/20 text-cobalt-accent">Vite + React</span>
                </div>
                <div className="text-white text-[11px] font-semibold">Interactive UI/UX</div>
                <p className="text-slate-400 text-[10px] leading-relaxed">
                  Tailwind CSS, dynamic state management, smooth Lenis inertia &amp; GSAP animations.
                </p>
              </div>

              {/* Layer 2 */}
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-amber-400/40 transition-all space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">Service Layer</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">Express / Django</span>
                </div>
                <div className="text-white text-[11px] font-semibold">REST &amp; Async Workers</div>
                <p className="text-slate-400 text-[10px] leading-relaxed">
                  Rate limiting, honeypot spam protection, Celery workers with Redis messaging queues.
                </p>
              </div>

              {/* Layer 3 */}
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-400/40 transition-all space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Data &amp; IoT Layer</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">Postgres + ESP32</span>
                </div>
                <div className="text-white text-[11px] font-semibold">Persistence &amp; Hardware</div>
                <p className="text-slate-400 text-[10px] leading-relaxed">
                  ACID transactional tables, JSON fallback safety, RC522 RFID 13.56MHz serial telemetry.
                </p>
              </div>
            </div>

            {/* Verification Guarantee Banner */}
            <div className="p-2.5 rounded-lg bg-cobalt-muted/15 border border-cobalt-muted/30 text-[11px] text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cobalt-accent" />
                <span>Documented architectural diagrams and ER schemas ready for college viva defense.</span>
              </span>
              <span className="text-cobalt-accent font-bold text-[10px]">Verified Blueprint</span>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: Viva & Defense Preparation Q&A                          */}
        {/* ============================================================== */}
        {activeTab === 'defense' && (
          <div className="flex-1 flex flex-col justify-between z-10 transition-opacity duration-200 text-xs space-y-2">
            <div className="text-[11px] text-slate-400 border-b border-white/10 pb-2 flex items-center justify-between">
              <span className="text-white font-semibold flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>1-on-1 Code Walkthrough &amp; Viva Defense Preparation</span>
              </span>
              <span className="text-emerald-400 text-[10px]">Student Guarantee</span>
            </div>

            {/* Defense Questions Selector */}
            <div className="space-y-2">
              <div className="flex gap-1.5 overflow-x-auto pb-1">
                {defenseQuestions.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveDefenseIndex(idx)}
                    className={`px-2.5 py-1 rounded text-[10px] whitespace-nowrap transition-all ${
                      activeDefenseIndex === idx
                        ? 'bg-cobalt-muted text-white font-semibold'
                        : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
                    }`}
                  >
                    Question #{idx + 1}
                  </button>
                ))}
              </div>

              {/* Active Q&A Card */}
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-start gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-cobalt-muted/30 text-cobalt-accent font-bold text-[10px]">
                    EXAMINER Q:
                  </span>
                  <span className="text-white text-[11px] font-semibold leading-snug">
                    {defenseQuestions[activeDefenseIndex].q}
                  </span>
                </div>
                <div className="flex items-start gap-2 pt-1 border-t border-white/10">
                  <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                    CODERITZ DEFENSE:
                  </span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    {defenseQuestions[activeDefenseIndex].a}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>We never hand over an unexplained black box. Full code mastery guaranteed.</span>
              </span>
              <span className="text-white font-semibold">1-on-1 Sessions Included</span>
            </div>
          </div>
        )}

        {/* Bottom Interactive Bar */}
        <div className="pt-2.5 border-t border-white/10 flex items-center justify-between z-10">
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
            <span className="text-white font-medium">Coderitz Engineering Workstation</span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden sm:inline text-[10px] text-slate-400">v2.4 Active</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onStartProjectClick}
              className="px-3 py-1 rounded-md bg-cobalt-muted hover:bg-cobalt-deep text-white text-[11px] font-semibold flex items-center gap-1.5 transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98]"
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
