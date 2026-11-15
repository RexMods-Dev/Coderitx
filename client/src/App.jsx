import React, { useState, useEffect } from 'react';
import { useTheme } from './hooks/useTheme';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Projects } from './components/Projects';
import { Workflow } from './components/Workflow';
import { AboutTeam } from './components/AboutTeam';
import { ProjectForm } from './components/ProjectForm';
import { ContactFooter } from './components/ContactFooter';
import { initSmoothScroll, scrollToTarget } from './lib/smoothScroll';

export function App() {
  const { theme, toggleTheme } = useTheme();
  const [selectedCategoryPrefill, setSelectedCategoryPrefill] = useState('');

  // Initialize Lenis smooth scroll on mount
  useEffect(() => {
    const lenis = initSmoothScroll();

    // Intercept in-page hash links for fluid scrolling
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (href && href !== '#' && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          scrollToTarget(target, -76);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      if (lenis && lenis._cleanup) {
        lenis._cleanup();
      }
    };
  }, []);

  const scrollToEnquiry = (category = '') => {
    if (category) {
      setSelectedCategoryPrefill(category);
    }
    const enquiryElem = document.getElementById('enquiry');
    if (enquiryElem) {
      scrollToTarget(enquiryElem, -76);
    }
  };

  const scrollToWork = () => {
    const workElem = document.getElementById('work');
    if (workElem) {
      scrollToTarget(workElem, -76);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-200">
      {/* Top Fixed Navbar */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        onStartProjectClick={() => scrollToEnquiry()}
      />

      {/* Main Content Flow */}
      <main className="flex-1">
        {/* Cinematic Laptop-to-Website Hero Presentation */}
        <Hero
          onStartProjectClick={() => scrollToEnquiry()}
          onExploreWorkClick={scrollToWork}
        />

        {/* 01 What We Build (Services) */}
        <Services
          onSelectServiceForEnquiry={(serviceName) => scrollToEnquiry(serviceName)}
        />

        {/* 02 Selected Work (Projects Showcase) */}
        <Projects
          onDiscussProject={(projectName) => scrollToEnquiry(`Similar to: ${projectName}`)}
        />

        {/* 03 How We Work (Development Framework) */}
        <Workflow
          onStartProjectClick={() => scrollToEnquiry()}
        />

        {/* 04 Leadership & Transparency (About Team) */}
        <AboutTeam />

        {/* 05 Project Request (Enquiry Form) */}
        <ProjectForm
          initialCategory={selectedCategoryPrefill}
        />
      </main>

      {/* Closing CTA & Footer */}
      <ContactFooter
        onStartProjectClick={() => scrollToEnquiry()}
      />
    </div>
  );
}

export default App;
