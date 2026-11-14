import React, { forwardRef } from 'react';
import { LaptopScreenContent } from './LaptopScreenContent';

export const LaptopMockup = forwardRef(({
  onStartProjectClick,
  onExploreWorkClick,
  className = ""
}, ref) => {
  return (
    <div
      ref={ref}
      className={`laptop-mockup-root relative w-full max-w-[860px] mx-auto select-none ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* 3D Transformable Device Group */}
      <div
        className="laptop-perspective-group relative w-full flex flex-col items-center"
        style={{ transformStyle: 'preserve-3d' }}
      >
        
        {/* LAPTOP LID / SCREEN UNIT */}
        <div
          id="laptop-lid"
          className="laptop-lid relative w-full aspect-[16/10] max-h-[520px] rounded-[16px] sm:rounded-[20px] p-[10px] sm:p-[12px] bg-[#1E2128] dark:bg-[#252830] border border-white/20 dark:border-white/10 shadow-2xl laptop-lid-frame transition-colors"
          style={{
            transformOrigin: 'bottom center',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden'
          }}
        >
          {/* Inner Bezel */}
          <div
            id="laptop-bezel"
            className="laptop-bezel relative w-full h-full rounded-[10px] sm:rounded-[12px] bg-[#0A0B0D] p-[6px] sm:p-[8px] flex flex-col overflow-hidden"
          >
            {/* Top Camera Sensor & Mic */}
            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-30">
              <div className="w-1.5 h-1.5 rounded-full bg-[#1C1F26] border border-white/10 flex items-center justify-center">
                <div className="w-0.5 h-0.5 rounded-full bg-cobalt-muted/80" />
              </div>
              <div className="w-0.5 h-0.5 rounded-full bg-emerald-500/60" />
            </div>

            {/* Live Screen Glass Surface */}
            <div
              id="laptop-screen"
              className="laptop-screen relative w-full h-full rounded-[6px] sm:rounded-[8px] overflow-hidden bg-ivory-warm dark:bg-background border border-black/30"
            >
              {/* Glass Glare Overlay */}
              <div className="absolute inset-0 screen-glass-glare pointer-events-none z-20" />

              {/* High-Fidelity Website Preview Composition */}
              <div id="laptop-screen-content" className="w-full h-full">
                <LaptopScreenContent
                  onStartProjectClick={onStartProjectClick}
                  onExploreWorkClick={onExploreWorkClick}
                />
              </div>
            </div>
          </div>
        </div>

        {/* LAPTOP BASE / LOWER CHASSIS & HINGE */}
        <div
          id="laptop-base"
          className="laptop-base relative w-[103%] -mt-[2px] flex flex-col items-center z-10 transition-opacity"
        >
          {/* Hinge bar */}
          <div className="w-[88%] h-[5px] bg-[#121418] dark:bg-[#16181F] rounded-t-sm border-t border-white/15 dark:border-white/10" />

          {/* Lower keyboard deck front wedge */}
          <div className="w-full h-[14px] sm:h-[18px] bg-gradient-to-b from-[#282B33] via-[#1E2027] to-[#14151B] dark:from-[#2E313A] dark:via-[#22252D] dark:to-[#171920] rounded-b-[14px] sm:rounded-b-[18px] border-b border-white/10 shadow-lg relative flex items-start justify-center pt-[1px]">
            {/* Thumb opening recess notch */}
            <div className="w-14 sm:w-20 h-[3px] sm:h-[4px] rounded-full bg-[#0D0E12] dark:bg-[#0A0B0E] border-t border-black/50" />
          </div>

          {/* Realistic Surface Shadow underneath */}
          <div className="w-[92%] h-[24px] sm:h-[32px] -mt-[6px] bg-ink-midnight/25 dark:bg-black/70 blur-xl rounded-full pointer-events-none -z-10" />
        </div>

      </div>
    </div>
  );
});

LaptopMockup.displayName = 'LaptopMockup';
