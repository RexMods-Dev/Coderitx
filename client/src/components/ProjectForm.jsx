import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, CheckCircle2, AlertCircle, Loader2, Sparkles, MessageSquare, ArrowRight } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { Button } from './ui/Button';

gsap.registerPlugin(ScrollTrigger);

export function ProjectForm({ initialCategory = '', onSubmissionSuccess }) {
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    institution: '',
    category: initialCategory || 'CSE & Academic Project',
    preferred_tech: '',
    description: '',
    deadline: '',
    additional_requirements: '',
    hp_field: '', // Honeypot field for anti-spam
    form_load_time: Date.now()
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [statusMessage, setStatusMessage] = useState('');
  const [submittedData, setSubmittedData] = useState(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(".form-header-anim", 
        { opacity: 0, y: 35 }, 
        {
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      gsap.fromTo(".form-container-card", 
        { opacity: 0, y: 40 }, 
        {
          opacity: 1, 
          y: 0, 
          duration: 0.85, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".form-container-card",
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (initialCategory) {
      setFormData((prev) => ({ ...prev, category: initialCategory }));
    }
  }, [initialCategory]);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Full name is required (min 2 characters).';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Valid email address is required.';
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 7) {
      errs.phone = 'Contact number (Phone or WhatsApp) is required.';
    }
    if (!formData.category.trim()) {
      errs.category = 'Please select a project category.';
    }
    if (!formData.description.trim() || formData.description.trim().length < 10) {
      errs.description = 'Please describe your project idea or requirement (at least 10 characters).';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    setStatus('submitting');
    setStatusMessage('');

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus('success');
        setStatusMessage(result.message || 'Your project enquiry has been submitted successfully.');
        setSubmittedData(result.data);
        if (onSubmissionSuccess) onSubmissionSuccess(result.data);
      } else {
        setStatus('error');
        setStatusMessage(result.message || 'Failed to submit enquiry. Please check the fields and try again.');
        if (result.errors) {
          setErrors(result.errors);
        }
      }
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('error');
      setStatusMessage('Unable to connect to the server. Please verify your connection or contact us directly.');
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      institution: '',
      category: 'CSE & Academic Project',
      preferred_tech: '',
      description: '',
      deadline: '',
      additional_requirements: '',
      hp_field: '',
      form_load_time: Date.now()
    });
    setErrors({});
    setStatus('idle');
    setStatusMessage('');
    setSubmittedData(null);
  };

  return (
    <section ref={sectionRef} id="enquiry" className="py-24 md:py-36 border-b border-border-soft dark:border-border-dark bg-ivory-warm dark:bg-background relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="form-header-anim text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-cobalt-muted dark:text-cobalt-accent font-semibold mb-3">
            <span>05 / Project Request</span>
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold tracking-tight text-ink-midnight dark:text-foreground mb-4">
            {siteConfig.enquiry.headline}
          </h2>
          
          <p className="text-base text-slate-grey dark:text-muted-foreground leading-relaxed">
            {siteConfig.enquiry.supportingText}
          </p>
        </div>

        {/* Form Container Card */}
        <div className="form-container-card bg-surface border border-border-soft dark:border-border-dark rounded-2xl shadow-elevated p-7 sm:p-11 relative">
          
          {status === 'success' ? (
            /* Success Feedback State */
            <div className="py-10 text-center space-y-6 animate-fade-in">
              <div className="w-16 h-16 rounded-2xl bg-cobalt-muted/10 dark:bg-cobalt-accent/15 border border-cobalt-muted/20 dark:border-cobalt-accent/30 mx-auto flex items-center justify-center text-cobalt-muted dark:text-cobalt-accent shadow-subtle">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-2">
                <h3 className="font-display text-2xl font-bold tracking-tight text-ink-midnight dark:text-foreground">
                  Enquiry Received
                </h3>
                <p className="text-sm text-slate-grey dark:text-muted-foreground max-w-md mx-auto leading-relaxed">
                  {statusMessage}
                </p>
              </div>

              {submittedData && (
                <div className="p-5 rounded-xl border border-border-soft dark:border-border-dark bg-ivory-warm/50 dark:bg-surface-elevated/60 text-left max-w-md mx-auto font-mono text-xs space-y-2 shadow-subtle">
                  <div className="flex justify-between text-slate-grey dark:text-muted-foreground">
                    <span>Reference ID:</span>
                    <span className="font-semibold text-ink-midnight dark:text-foreground">#CR-{submittedData.id}</span>
                  </div>
                  <div className="flex justify-between text-slate-grey dark:text-muted-foreground">
                    <span>Applicant:</span>
                    <span className="text-ink-midnight dark:text-foreground font-medium">{submittedData.name}</span>
                  </div>
                  <div className="flex justify-between text-slate-grey dark:text-muted-foreground">
                    <span>Category:</span>
                    <span className="text-ink-midnight dark:text-foreground font-medium">{submittedData.category}</span>
                  </div>
                  <div className="flex justify-between text-slate-grey dark:text-muted-foreground">
                    <span>Storage Engine:</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">Logged ({submittedData.storage})</span>
                  </div>
                </div>
              )}

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button
                  onClick={handleReset}
                  variant="outline"
                  size="sm"
                >
                  Submit Another Project
                </Button>
                <a
                  href="#home"
                  className="text-xs font-mono text-slate-grey dark:text-muted-foreground hover:text-ink-midnight dark:hover:text-foreground underline underline-offset-4"
                >
                  Return to Top
                </a>
              </div>
            </div>
          ) : (
            /* Main Form */
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              
              {/* Error Callout */}
              {status === 'error' && (
                <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 flex items-start gap-3 text-red-800 dark:text-red-300 text-sm animate-fade-in">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>{statusMessage}</span>
                </div>
              )}

              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono font-medium text-ink-midnight dark:text-foreground uppercase mb-2">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    className={`w-full px-4 py-2.5 rounded-lg border text-sm bg-ivory-warm/40 dark:bg-surface-elevated/40 text-ink-midnight dark:text-foreground placeholder:text-slate-grey/50 dark:placeholder:text-muted-foreground/40 transition-colors focus-ring ${
                      errors.name
                        ? 'border-red-500'
                        : 'border-border-soft dark:border-border-dark'
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-mono font-medium text-ink-midnight dark:text-foreground uppercase mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className={`w-full px-4 py-2.5 rounded-lg border text-sm bg-ivory-warm/40 dark:bg-surface-elevated/40 text-ink-midnight dark:text-foreground placeholder:text-slate-grey/50 dark:placeholder:text-muted-foreground/40 transition-colors focus-ring ${
                      errors.email
                        ? 'border-red-500'
                        : 'border-border-soft dark:border-border-dark'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Row 2: Phone/WhatsApp & College/Institution */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="phone" className="block text-xs font-mono font-medium text-ink-midnight dark:text-foreground uppercase mb-2">
                    Phone / WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className={`w-full px-4 py-2.5 rounded-lg border text-sm bg-ivory-warm/40 dark:bg-surface-elevated/40 text-ink-midnight dark:text-foreground placeholder:text-slate-grey/50 dark:placeholder:text-muted-foreground/40 transition-colors focus-ring ${
                      errors.phone
                        ? 'border-red-500'
                        : 'border-border-soft dark:border-border-dark'
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="institution" className="block text-xs font-mono font-medium text-ink-midnight dark:text-foreground uppercase mb-2">
                    College / Institution <span className="text-slate-grey text-[10px] lowercase font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    id="institution"
                    name="institution"
                    value={formData.institution}
                    onChange={handleChange}
                    placeholder="e.g. University College of Engineering"
                    className="w-full px-4 py-2.5 rounded-lg border border-border-soft dark:border-border-dark bg-ivory-warm/40 dark:bg-surface-elevated/40 text-ink-midnight dark:text-foreground placeholder:text-slate-grey/50 dark:placeholder:text-muted-foreground/40 transition-colors focus-ring text-sm"
                  />
                </div>
              </div>

              {/* Row 3: Category & Preferred Technology */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="category" className="block text-xs font-mono font-medium text-ink-midnight dark:text-foreground uppercase mb-2">
                    Project Domain / Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-border-soft dark:border-border-dark bg-ivory-warm/40 dark:bg-surface-elevated/40 text-ink-midnight dark:text-foreground transition-colors focus-ring text-sm"
                  >
                    {siteConfig.enquiry.categories.map((cat) => (
                      <option key={cat} value={cat} className="bg-surface text-ink-midnight dark:text-foreground">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="preferred_tech" className="block text-xs font-mono font-medium text-ink-midnight dark:text-foreground uppercase mb-2">
                    Preferred Technology <span className="text-slate-grey text-[10px] lowercase font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    id="preferred_tech"
                    name="preferred_tech"
                    value={formData.preferred_tech}
                    onChange={handleChange}
                    placeholder="e.g. Django, React, ESP32, YOLOv8"
                    className="w-full px-4 py-2.5 rounded-lg border border-border-soft dark:border-border-dark bg-ivory-warm/40 dark:bg-surface-elevated/40 text-ink-midnight dark:text-foreground placeholder:text-slate-grey/50 dark:placeholder:text-muted-foreground/40 transition-colors focus-ring text-sm"
                  />
                </div>
              </div>

              {/* Row 4: Project Description */}
              <div>
                <label htmlFor="description" className="block text-xs font-mono font-medium text-ink-midnight dark:text-foreground uppercase mb-2">
                  Project Description &amp; Objectives <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Outline the core objective, problem to solve, college guide guidelines, or specific features you need implemented..."
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm bg-ivory-warm/40 dark:bg-surface-elevated/40 text-ink-midnight dark:text-foreground placeholder:text-slate-grey/50 dark:placeholder:text-muted-foreground/40 transition-colors focus-ring resize-y ${
                    errors.description
                      ? 'border-red-500'
                      : 'border-border-soft dark:border-border-dark'
                  }`}
                />
                {errors.description && (
                  <p className="mt-1 text-xs text-red-500">{errors.description}</p>
                )}
              </div>

              {/* Row 5: Deadline & Additional Requirements */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="deadline" className="block text-xs font-mono font-medium text-ink-midnight dark:text-foreground uppercase mb-2">
                    Expected Deadline <span className="text-slate-grey text-[10px] lowercase font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    id="deadline"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    placeholder="e.g. 4 weeks, End of semester"
                    className="w-full px-4 py-2.5 rounded-lg border border-border-soft dark:border-border-dark bg-ivory-warm/40 dark:bg-surface-elevated/40 text-ink-midnight dark:text-foreground placeholder:text-slate-grey/50 dark:placeholder:text-muted-foreground/40 transition-colors focus-ring text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="additional_requirements" className="block text-xs font-mono font-medium text-ink-midnight dark:text-foreground uppercase mb-2">
                    Additional Requirements <span className="text-slate-grey text-[10px] lowercase font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    id="additional_requirements"
                    name="additional_requirements"
                    value={formData.additional_requirements}
                    onChange={handleChange}
                    placeholder="e.g. Code walkthrough, Viva prep, Report guidance"
                    className="w-full px-4 py-2.5 rounded-lg border border-border-soft dark:border-border-dark bg-ivory-warm/40 dark:bg-surface-elevated/40 text-ink-midnight dark:text-foreground placeholder:text-slate-grey/50 dark:placeholder:text-muted-foreground/40 transition-colors focus-ring text-sm"
                  />
                </div>
              </div>

              {/* Anti-spam Honeypot */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  name="hp_field"
                  tabIndex="-1"
                  autoComplete="off"
                  value={formData.hp_field}
                  onChange={handleChange}
                />
              </div>

              {/* Submission Footer */}
              <div className="pt-5 border-t border-border-soft dark:border-border-dark flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="text-xs text-slate-grey dark:text-muted-foreground font-mono">
                  Enquiries are directly reviewed by Coderitz co-founders within 24 hours.
                </div>

                <Button
                  type="submit"
                  size="lg"
                  variant="primary"
                  disabled={status === 'submitting'}
                  className="w-full sm:w-auto gap-2 px-8 py-3.5"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting Enquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Project Enquiry</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}
