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
  RotateCcw,
  Database,
  Radio,
  FileCode2,
  Check,
  Zap,
  Play,
  Server
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

const codeSnippet = [
  { line: 1, text: '# Coderitz Production Architecture Runtime', type: 'comment' },
  { line: 2, text: 'from fastapi import FastAPI, Depends, BackgroundTasks', type: 'import' },
  { line: 3, text: 'from models import ProjectEnquiry, TelemetryRecord', type: 'import' },
  { line: 4, text: '', type: 'empty' },
  { line: 5, text: '@app.post("/api/enquiries/dispatch")', type: 'decorator' },
  { line: 6, text: 'async def handle_enquiry(req: ProjectEnquiry, bg: BackgroundTasks):', type: 'def' },
  { line: 7, text: '    # ACID transaction with connection pooling', type: 'comment' },
  { line: 8, text: '    record = await db.pool.create(req.model_dump())', type: 'code' },
  { line: 9, text: '    bg.add_task(dispatch_founder_walkthrough, record.id)', type: 'code' },
  { line: 10, text: '    return {"status": "assigned", "viva_prep": True}', type: 'code' },
];

export function LaptopScreenContent({ onStartProjectClick, onExploreWorkClick }) {
  const [activeTab, setActiveTab] = useState('terminal'); // 'terminal' | 'architecture' | 'defense' | 'code'
  const [logs, setLogs] = useState(initialLogs.slice(0, 4));
  const [logIndex, setLogIndex] = useState(4);
  const [isSimulating, setIsSimulating] = useState(false);
  const [pulseCount, setPulseCount] = useState(42);
  const [latency, setLatency] = useState(14);
  const [fps, setFps] = useState('60.0');
  const [activeDefenseIndex, setActiveDefenseIndex] = useState(0);
  const logContainerRef = useRef(null);

  // Dynamic live log stream and realistic telemetry jitter
  useEffect(() => {
    const interval = setInterval(() => {
      setLogIndex((prev) => {
        const next = prev < initialLogs.length ? prev + 1 : 2;
        setLogs(initialLogs.slice(0, next));
        return next;
      });
      setPulseCount((p) => p + 1);
      // Realistic fluctuation: 12-16ms latency, 59.8 - 60.1 FPS
      setLatency(12 + Math.floor(Math.random() * 5));
      setFps((59.7 + Math.random() * 0.4).toFixed(1));
    }, 2400);

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll logs inside terminal
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
    }, 380);
  };

  const defenseQuestions = [
    {
      q: "Why choose PostgreSQL with connection pooling over MongoDB for this system?",
      a: "PostgreSQL guarantees ACID compliance for critical transactional records. Connection pooling eliminates handshake overhead under heavy concurrent load, preventing socket exhaustion."
    },
    {
      q: "How does the ESP32 communicate with your cloud backend without latency spikes?",
      a: "We utilize non-blocking async HTTP and lightweight MQTT brokers with keep-alive heartbeats, ensuring packet loss resilience and sub-20ms sensor dispatch."
    },
    {
      q: "What architectural pattern prevents race conditions in concurrent requests?",
      a: "We implement atomic database row-level locking (`SELECT ... FOR UPDATE`) paired with Redis distributed locks and serialized task queues via Celery."
    }
  ];

  return (
    <div className="w-full h-full bg-[#0B0D14] text-white overflow-hidden flex flex-col font-mono select-none relative">
      
      {/* ============================================================== */}
      {/* TOP WINDOW BAR (macOS Pro Glass Window Header)                 */}
      {/* ============================================================== */}
      <div className="w-full px-2.5 sm:px-4 py-1.5 sm:py-2 bg-[#141720]/95 backdrop-blur-md border-b border-white/10 flex items-center justify-between z-20 flex-shrink-0">
        
        {/* Left: Window traffic lights & filename */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 sm:gap-1.5">
            <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#FF5F56] border border-red-500/50 shadow-[0_0_6px_rgba(255,95,86,0.6)]" />
            <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#FFBD2E] border border-amber-500/50 shadow-[0_0_6px_rgba(255,189,46,0.6)]" />
            <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#27C93F] border border-emerald-500/50 shadow-[0_0_6px_rgba(39,201,63,0.6)]" />
          </div>

          <div className="hidden md:flex items-center gap-1.5 pl-2 border-l border-white/10 text-[10px] sm:text-[11px] text-slate-300">
            <FileCode2 className="w-3 h-3 text-cobalt-accent" />
            <span className="font-semibold text-white tracking-tight">coderitz_runtime.py</span>
            <span className="text-[9px] text-emerald-400">• active</span>
          </div>
        </div>

        {/* Center: Interactive Mode Switcher Tabs */}
        <div className="flex items-center gap-0.5 sm:gap-1 bg-black/60 p-0.5 sm:p-1 rounded-lg border border-white/10 text-[9px] sm:text-[10px]">
          <button
            type="button"
            onClick={() => setActiveTab('terminal')}
            className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded transition-all flex items-center gap-1 ${
              activeTab === 'terminal'
                ? 'bg-cobalt-muted text-white font-semibold shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Terminal className="w-2.5 sm:w-3 h-2.5 sm:h-3" />
            <span>Terminal</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('architecture')}
            className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded transition-all flex items-center gap-1 ${
              activeTab === 'architecture'
                ? 'bg-cobalt-muted text-white font-semibold shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-2.5 sm:w-3 h-2.5 sm:h-3" />
            <span>Arch</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('defense')}
            className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded transition-all flex items-center gap-1 ${
              activeTab === 'defense'
                ? 'bg-cobalt-muted text-white font-semibold shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Shield className="w-2.5 sm:w-3 h-2.5 sm:h-3" />
            <span>Viva</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('code')}
            className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded transition-all flex items-center gap-1 ${
              activeTab === 'code'
                ? 'bg-cobalt-muted text-white font-semibold shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code2 className="w-2.5 sm:w-3 h-2.5 sm:h-3" />
            <span>Code</span>
          </button>
        </div>

        {/* Right: Studio Status & Simulation Trigger */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={handleTriggerSimulation}
            disabled={isSimulating}
            title="Re-run compilation telemetry"
            className="p-1 sm:p-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
          >
            <RotateCcw className={`w-2.5 sm:w-3 h-2.5 sm:h-3 ${isSimulating ? 'animate-spin text-cobalt-accent' : ''}`} />
          </button>

          <span className="inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[8px] sm:text-[10px] border border-emerald-500/30 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
            <span className="hidden xs:inline">LIVE</span> {latency}ms
          </span>
        </div>
      </div>

      {/* ============================================================== */}
      {/* SCREEN MAIN BODY (Responsive, Adaptive, Alive)                 */}
      {/* ============================================================== */}
      <div className="flex-1 p-2.5 sm:p-4 overflow-hidden flex flex-col justify-between relative bg-[#090B10]">
        
        {/* Subtle glowing circuit grid & ambient lights */}
        <div className="absolute inset-0 bg-subtle-grid opacity-35 pointer-events-none" />
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-cobalt-muted/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* ============================================================== */}
        {/* TAB 1: Live Terminal Log Stream & Real-time Telemetry          */}
        {/* ============================================================== */}
        {activeTab === 'terminal' && (
          <div className="flex-1 flex flex-col justify-between z-10 animate-fade-in overflow-hidden">
            <div className="space-y-1.5 sm:space-y-2 flex-1 flex flex-col min-h-0">
              {/* Telemetry Header */}
              <div className="flex items-center justify-between text-[9px] sm:text-[11px] text-slate-400 border-b border-white/10 pb-1.5 flex-shrink-0">
                <span className="flex items-center gap-1.5 text-white font-semibold">
                  <Activity className="w-3 h-3 text-cobalt-accent animate-pulse" />
                  <span className="truncate">Continuous Compilation Stream</span>
                </span>
                <span className="text-[8px] sm:text-[10px] text-slate-400 font-mono flex-shrink-0">
                  PID: 4092 • {fps} FPS
                </span>
              </div>

              {/* Streaming Logs Box */}
              <div
                ref={logContainerRef}
                className="space-y-1 sm:space-y-1.5 text-[10px] sm:text-xs pt-0.5 overflow-y-auto pr-1 flex-1 min-h-[90px] max-h-[140px] sm:max-h-[180px]"
              >
                {logs.map((log) => (
                  <div key={log.id} className="flex items-start gap-1.5 leading-snug">
                    <span className="text-slate-500 text-[9px] mt-0.5 select-none font-mono">
                      [{log.time}]
                    </span>
                    <span className={`font-bold text-[8px] sm:text-[9px] px-1 py-0.2 rounded bg-white/5 border border-white/10 ${log.color}`}>
                      {log.type}
                    </span>
                    <span className="text-slate-200 text-[10px] sm:text-[11px] truncate sm:whitespace-normal">{log.text}</span>
                  </div>
                ))}

                {/* Live CLI Prompt */}
                <div className="flex items-center gap-1.5 pt-0.5 text-[10px] sm:text-xs text-cobalt-accent font-mono">
                  <span className="text-slate-500">$</span>
                  <span className="text-slate-300">coderitz compile</span>
                  <span className="text-emerald-400 font-semibold">--production-ready</span>
                  <span className="w-1.5 h-3 bg-cobalt-accent animate-pulse ml-0.5" />
                </div>
              </div>
            </div>

            {/* Metrics HUD strip (Optimized for both Mobile and Desktop) */}
            <div className="pt-2 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] flex-shrink-0">
              <div className="p-1.5 sm:p-2 rounded-lg bg-white/5 border border-white/10 hover:border-cobalt-muted/40 transition-colors">
                <div className="text-slate-400 text-[8px] sm:text-[9px] uppercase tracking-wide flex items-center justify-between">
                  <span>Database</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <div className="text-emerald-400 font-bold mt-0.5 truncate">PostgreSQL Pool</div>
              </div>

              <div className="p-1.5 sm:p-2 rounded-lg bg-white/5 border border-white/10 hover:border-cobalt-muted/40 transition-colors">
                <div className="text-slate-400 text-[8px] sm:text-[9px] uppercase tracking-wide">Latency</div>
                <div className="text-white font-bold mt-0.5 flex items-center gap-1">
                  <span>{latency}ms</span>
                  <span className="text-[8px] text-emerald-400 font-normal">Optimal</span>
                </div>
              </div>

              <div className="p-1.5 sm:p-2 rounded-lg bg-white/5 border border-white/10 hover:border-cobalt-muted/40 transition-colors">
                <div className="text-slate-400 text-[8px] sm:text-[9px] uppercase tracking-wide">Hardware</div>
                <div className="text-amber-400 font-bold mt-0.5 truncate">ESP32 + RFID</div>
              </div>

              <div className="p-1.5 sm:p-2 rounded-lg bg-white/5 border border-white/10 hover:border-cobalt-muted/40 transition-colors">
                <div className="text-slate-400 text-[8px] sm:text-[9px] uppercase tracking-wide">Viva Defense</div>
                <div className="text-cobalt-accent font-bold mt-0.5 truncate">100% Guaranteed</div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: Multi-Tier Architecture & Data Flow                     */}
        {/* ============================================================== */}
        {activeTab === 'architecture' && (
          <div className="flex-1 flex flex-col justify-between z-10 animate-fade-in text-[10px] sm:text-xs space-y-2 overflow-hidden">
            <div className="text-[9px] sm:text-[11px] text-slate-400 border-b border-white/10 pb-1.5 flex items-center justify-between flex-shrink-0">
              <span className="text-white font-semibold flex items-center gap-1">
                <Layers className="w-3 h-3 text-cobalt-accent" />
                <span>Tier-1 Multi-Layer Architecture</span>
              </span>
              <span className="text-emerald-400 text-[9px] font-semibold">Modular Design</span>
            </div>

            {/* Architecture 3-Column Diagram (Responsive) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 sm:gap-2.5 py-0.5 flex-1 overflow-y-auto">
              <div className="p-2 sm:p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-cobalt-accent/40 transition-all space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] text-cobalt-accent font-bold uppercase">Client Layer</span>
                  <span className="text-[8px] px-1 py-0.2 rounded bg-cobalt-muted/20 text-cobalt-accent">React + Vite</span>
                </div>
                <div className="text-white text-[10px] sm:text-[11px] font-semibold">Interactive UI/UX</div>
                <p className="text-slate-400 text-[9px] sm:text-[10px] leading-relaxed line-clamp-2 sm:line-clamp-none">
                  Tailwind CSS, smooth Lenis scrolling, dynamic state management.
                </p>
              </div>

              <div className="p-2 sm:p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-amber-400/40 transition-all space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] text-amber-400 font-bold uppercase">Service Layer</span>
                  <span className="text-[8px] px-1 py-0.2 rounded bg-amber-500/20 text-amber-300">FastAPI / Node</span>
                </div>
                <div className="text-white text-[10px] sm:text-[11px] font-semibold">REST &amp; Async Workers</div>
                <p className="text-slate-400 text-[9px] sm:text-[10px] leading-relaxed line-clamp-2 sm:line-clamp-none">
                  Rate limiting, Celery workers with Redis message broker.
                </p>
              </div>

              <div className="p-2 sm:p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-400/40 transition-all space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] text-emerald-400 font-bold uppercase">Data &amp; IoT</span>
                  <span className="text-[8px] px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-300">Postgres + ESP32</span>
                </div>
                <div className="text-white text-[10px] sm:text-[11px] font-semibold">Persistence &amp; Hardware</div>
                <p className="text-slate-400 text-[9px] sm:text-[10px] leading-relaxed line-clamp-2 sm:line-clamp-none">
                  ACID transactional tables, RC522 RFID 13.56MHz serial telemetry.
                </p>
              </div>
            </div>

            {/* Verification Guarantee Banner */}
            <div className="p-1.5 sm:p-2 rounded-lg bg-cobalt-muted/15 border border-cobalt-muted/30 text-[9px] sm:text-[10px] text-slate-300 flex items-center justify-between flex-shrink-0">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-cobalt-accent" />
                <span>Documented schemas &amp; ER diagrams ready for college viva defense.</span>
              </span>
              <span className="text-cobalt-accent font-bold text-[9px]">Verified</span>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: Viva & Defense Preparation Q&A                          */}
        {/* ============================================================== */}
        {activeTab === 'defense' && (
          <div className="flex-1 flex flex-col justify-between z-10 animate-fade-in text-[10px] sm:text-xs space-y-1.5 overflow-hidden">
            <div className="text-[9px] sm:text-[11px] text-slate-400 border-b border-white/10 pb-1.5 flex items-center justify-between flex-shrink-0">
              <span className="text-white font-semibold flex items-center gap-1">
                <Shield className="w-3 h-3 text-emerald-400" />
                <span>1-on-1 Code Walkthrough &amp; Viva Defense</span>
              </span>
              <span className="text-emerald-400 text-[9px]">Student Guarantee</span>
            </div>

            {/* Defense Questions Selector */}
            <div className="space-y-1.5 flex-1 overflow-y-auto">
              <div className="flex gap-1 overflow-x-auto pb-0.5 no-scrollbar">
                {defenseQuestions.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveDefenseIndex(idx)}
                    className={`px-2 py-0.5 rounded text-[9px] whitespace-nowrap transition-all ${
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
              <div className="p-2 sm:p-3 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                <div className="flex items-start gap-1.5">
                  <span className="px-1 py-0.2 rounded bg-cobalt-muted/30 text-cobalt-accent font-bold text-[8px] sm:text-[9px] flex-shrink-0">
                    EXAMINER Q:
                  </span>
                  <span className="text-white text-[10px] sm:text-[11px] font-semibold leading-snug">
                    {defenseQuestions[activeDefenseIndex].q}
                  </span>
                </div>
                <div className="flex items-start gap-1.5 pt-1 border-t border-white/10">
                  <span className="px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[8px] sm:text-[9px] flex-shrink-0">
                    DEFENSE:
                  </span>
                  <p className="text-slate-300 text-[9px] sm:text-[10px] leading-relaxed">
                    {defenseQuestions[activeDefenseIndex].a}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[9px] text-slate-300 flex items-center justify-between flex-shrink-0">
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>Full code mastery guaranteed before college review.</span>
              </span>
              <span className="text-white font-semibold">1-on-1 Prep</span>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: Live Code View                                          */}
        {/* ============================================================== */}
        {activeTab === 'code' && (
          <div className="flex-1 flex flex-col justify-between z-10 animate-fade-in text-[10px] sm:text-xs space-y-1.5 overflow-hidden">
            <div className="text-[9px] sm:text-[11px] text-slate-400 border-b border-white/10 pb-1.5 flex items-center justify-between flex-shrink-0">
              <span className="text-white font-semibold flex items-center gap-1.5">
                <Code2 className="w-3 h-3 text-cobalt-accent" />
                <span>coderitz_runtime.py — Live Endpoint Logic</span>
              </span>
              <span className="text-emerald-400 text-[9px]">Python 3.11</span>
            </div>

            <div className="space-y-0.5 font-mono text-[9px] sm:text-[10px] overflow-y-auto flex-1 min-h-[90px] max-h-[160px] p-2 rounded-lg bg-black/40 border border-white/5">
              {codeSnippet.map((c) => (
                <div key={c.line} className="flex items-start gap-2.5">
                  <span className="text-slate-600 select-none w-4 text-right">{c.line}</span>
                  <span className={
                    c.type === 'comment' ? 'text-slate-500 italic' :
                    c.type === 'import' ? 'text-purple-400' :
                    c.type === 'decorator' ? 'text-amber-400' :
                    c.type === 'def' ? 'text-cobalt-accent font-semibold' :
                    'text-slate-200'
                  }>
                    {c.text}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-[9px] text-slate-400 flex items-center justify-between flex-shrink-0">
              <span>Production-grade asynchronous async/await architecture</span>
              <span className="text-emerald-400 font-semibold">Lint Clean</span>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* BOTTOM WORKSTATION CONTROLS (Responsive)                      */}
        {/* ============================================================== */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-between z-10 flex-shrink-0">
          <div className="flex items-center gap-1.5 text-[9px] sm:text-[11px] text-slate-400">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
            <span className="text-white font-medium truncate">Coderitz Engineering Workstation</span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden sm:inline text-[9px] text-slate-400">v2.4 Active</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={onStartProjectClick}
              className="px-2.5 sm:px-3 py-1 rounded-md bg-cobalt-muted hover:bg-cobalt-deep text-white text-[9px] sm:text-[11px] font-semibold flex items-center gap-1 transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Build This Project</span>
              <ArrowUpRight className="w-2.5 sm:w-3 h-2.5 sm:h-3" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
