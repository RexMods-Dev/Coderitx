import React, { useState, useRef } from 'react';
import { useTheme } from './hooks/useTheme';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Projects } from './components/Projects';
import { Workflow } from './components/Workflow';
import { AboutTeam } from './components/AboutTeam';
import { ProjectForm } from './components/ProjectForm';
import { ContactFooter } from './components/ContactFooter';

export function App() {
  const { theme, toggleTheme } = useTheme();
  const [selectedCategoryPrefill, setSelectedCategoryPrefill] = useState('');

  const scrollToEnquiry = (category = '') => {
    if (category) {
      setSelectedCategoryPrefill(category);
    }
    const enquiryElem = document.getElementById('enquiry');
    if (enquiryElem) {
      const headerOffset = 70;
      const elementPosition = enquiryElem.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToWork = () => {
    const workElem = document.getElementById('work');
    if (workElem) {
      const headerOffset = 70;
      const elementPosition = workElem.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-200">
      {/* Top Navbar */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        onStartProjectClick={() => scrollToEnquiry()}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onStartProjectClick={() => scrollToEnquiry()}
          onExploreWorkClick={scrollToWork}
        />

        {/* Services Section */}
        <Services
          onSelectServiceForEnquiry={(serviceName) => scrollToEnquiry(serviceName)}
        />

        {/* Selected Projects Portfolio */}
        <Projects
          onDiscussProject={(projectName) => scrollToEnquiry(`Similar to: ${projectName}`)}
        />

        {/* How We Work 4-Step Process */}
        <Workflow
          onStartProjectClick={() => scrollToEnquiry()}
        />

        {/* About Coderitz & The 5 Co-Founders */}
        <AboutTeam />

        {/* Project Request Form */}
        <ProjectForm
          initialCategory={selectedCategoryPrefill}
        />
      </main>

      {/* Contact & Footer */}
      <ContactFooter
        onStartProjectClick={() => scrollToEnquiry()}
      />
    </div>
  );
}

export default App;
