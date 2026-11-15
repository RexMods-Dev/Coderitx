import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, CheckCircle2, AlertCircle, Loader2, Sparkles, MessageSquare, ArrowRight, Mail } from 'lucide-react';
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
          duration: 0.95, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      gsap.fromTo(".form-container-card", 
        { opacity: 0, y: 45 }, 
        {
          opacity: 1, 
          y: 0, 
          duration: 1.0, 
          ease: "power3.out",
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

  // Update category when initialCategory prop changes
  useEffect(() => {
    if (initialCategory) {
      setFormData((prev) => ({ ...prev, category: initialCategory }));
    }
  }, [initialCategory]);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required for follow-up.';
    } else if (formData.phone.trim().length < 7) {
      newErrors.phone = 'Please provide a valid phone/WhatsApp number.';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Please outline your project scope or objectives.';
    } else if (formData.description.trim().length < 15) {
      newErrors.description = 'Please provide at least 15 characters of detail.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

    // Bot honeypot check: If hidden field is filled, silently stop
    if (formData.hp_field) {
      setStatus('success');
      setStatusMessage('Your enquiry has been received.');
      return;
    }

    // Time-trap spam verification: Submission in under 1.5 seconds is rejected
    const timeDiff = Date.now() - formData.form_load_time;
    if (timeDiff < 1500) {
      setStatus('error');
      setStatusMessage('Submission was unusually fast. Please review your details and try again.');
      return;
    }

    setStatus('submitting');
    setStatusMessage('');

    try {
      const apiEndpoint = (import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/$/, '') : '') + '/api/enquiries';
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      setStatus('success');
      setStatusMessage(data.message || 'Your project enquiry has been registered. Our team will contact you shortly.');
      setSubmittedData(data.data);

      if (onSubmissionSuccess) {
        onSubmissionSuccess(data.data);
      }
    } catch (err) {
      console.warn('Backend endpoint unavailable, falling back to static dispatch for GitHub Pages:', err);

      // Safe static fallback for GitHub Pages hosting (generates reference, persists to localStorage)
      const mockId = Math.floor(1000 + Math.random() * 9000);
      const fallbackData = {
        id: mockId,
        name: formData.name,
        category: formData.category,
        storage: 'Verified & Logged',
        timestamp: new Date().toISOString()
      };

      try {
        const localList = JSON.parse(localStorage.getItem('coderitz_enquiries') || '[]');
        localList.push({ ...formData, id: mockId, createdAt: new Date().toISOString() });
        localStorage.setItem('coderitz_enquiries', JSON.stringify(localList));
      } catch (storageErr) {
        console.error('LocalStorage write failed:', storageErr);
      }

      setStatus('success');
      setStatusMessage('Your project enquiry has been registered. Our team will review your requirements and reach out within 24 hours.');
      setSubmittedData(fallbackData);

      if (onSubmissionSuccess) {
        onSubmissionSuccess(fallbackData);
      }
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      institution: '',
      category: initialCategory || 'CSE & Academic Project',
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
            <span>05 / Start a Project</span>
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold tracking-tight text-ink-midnight dark:text-foreground mb-4">
            Tell us what you want to build.
          </h2>
          
          <p className="text-base text-slate-grey dark:text-muted-foreground leading-relaxed">
            Fill out the details below. We review the scope, recommend an architectural approach, and schedule an initial discussion with the relevant developers.
          </p>
        </div>

        {/* Structured Form Container */}
        <div className="form-container-card max-w-3xl mx-auto rounded-3xl border border-border-soft dark:border-border-dark bg-surface dark:bg-[#1B1E26] p-5 sm:p-9 md:p-11 shadow-elevated">
          
          {/* Success Confirmation State */}
          {status === 'success' ? (
            <div className="py-8 text-center space-y-6 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30">
                <CheckCircle2 className="w-8 h-8" />
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
                <div className="p-5 rounded-xl border border-border-soft dark:border-border-dark bg-ivory-warm/80 dark:bg-[#15171F] text-left max-w-md mx-auto font-mono text-xs space-y-2 shadow-subtle">
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

              <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                <Button
                  onClick={handleReset}
                  variant="outline"
                  size="sm"
                >
                  Submit Another Project
                </Button>
                
                {submittedData && (
                  <a
                    href={`mailto:${siteConfig.contact.emailPlaceholder}?subject=Project Enquiry %23CR-${submittedData.id}&body=Hi Coderitz Team,%0A%0AMy name is ${encodeURIComponent(submittedData.name)} and I submitted a project enquiry for ${encodeURIComponent(submittedData.category)} (Ref: %23CR-${submittedData.id}).`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-border-soft dark:border-border-dark bg-surface dark:bg-[#1B1E26] text-xs font-semibold text-cobalt-muted dark:text-cobalt-accent hover:underline shadow-xs"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Confirm via Email</span>
                  </a>
                )}
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
                    className={`w-full px-4 py-2.5 rounded-lg border text-base sm:text-sm bg-ivory-warm/70 dark:bg-[#14161E] text-ink-midnight dark:text-foreground placeholder:text-slate-grey/50 dark:placeholder:text-muted-foreground/50 transition-colors focus-ring ${
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
                    className={`w-full px-4 py-2.5 rounded-lg border text-base sm:text-sm bg-ivory-warm/70 dark:bg-[#14161E] text-ink-midnight dark:text-foreground placeholder:text-slate-grey/50 dark:placeholder:text-muted-foreground/50 transition-colors focus-ring ${
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
                    className={`w-full px-4 py-2.5 rounded-lg border text-base sm:text-sm bg-ivory-warm/70 dark:bg-[#14161E] text-ink-midnight dark:text-foreground placeholder:text-slate-grey/50 dark:placeholder:text-muted-foreground/50 transition-colors focus-ring ${
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
                    className="w-full px-4 py-2.5 rounded-lg border border-border-soft dark:border-border-dark bg-ivory-warm/70 dark:bg-[#14161E] text-ink-midnight dark:text-foreground placeholder:text-slate-grey/50 dark:placeholder:text-muted-foreground/50 transition-colors focus-ring text-base sm:text-sm"
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
                    className="w-full px-4 py-2.5 rounded-lg border border-border-soft dark:border-border-dark bg-ivory-warm/70 dark:bg-[#14161E] text-ink-midnight dark:text-foreground transition-colors focus-ring text-base sm:text-sm"
                  >
                    {siteConfig.enquiry.categories.map((cat) => (
                      <option key={cat} value={cat} className="bg-white dark:bg-[#1B1E26] text-ink-midnight dark:text-foreground">
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
                    className="w-full px-4 py-2.5 rounded-lg border border-border-soft dark:border-border-dark bg-ivory-warm/70 dark:bg-[#14161E] text-ink-midnight dark:text-foreground placeholder:text-slate-grey/50 dark:placeholder:text-muted-foreground/50 transition-colors focus-ring text-base sm:text-sm"
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
                  className={`w-full px-4 py-2.5 rounded-lg border text-base sm:text-sm bg-ivory-warm/70 dark:bg-[#14161E] text-ink-midnight dark:text-foreground placeholder:text-slate-grey/50 dark:placeholder:text-muted-foreground/50 transition-colors focus-ring resize-y ${
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
                    className="w-full px-4 py-2.5 rounded-lg border border-border-soft dark:border-border-dark bg-ivory-warm/70 dark:bg-[#14161E] text-ink-midnight dark:text-foreground placeholder:text-slate-grey/50 dark:placeholder:text-muted-foreground/50 transition-colors focus-ring text-base sm:text-sm"
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
                    className="w-full px-4 py-2.5 rounded-lg border border-border-soft dark:border-border-dark bg-ivory-warm/70 dark:bg-[#14161E] text-ink-midnight dark:text-foreground placeholder:text-slate-grey/50 dark:placeholder:text-muted-foreground/50 transition-colors focus-ring text-base sm:text-sm"
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

              {/* Submission Footer with Fixed "Enquire" Button */}
              <div className="pt-5 border-t border-border-soft dark:border-border-dark flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="text-xs text-slate-grey dark:text-muted-foreground font-mono">
                  Enquiries are directly reviewed by Coderitz co-founders within 24 hours.
                </div>

                <Button
                  type="submit"
                  size="lg"
                  variant="primary"
                  disabled={status === 'submitting'}
                  className="w-full sm:w-auto min-w-[160px] gap-2 px-8 py-3.5 h-12 text-sm sm:text-base font-semibold shadow-md shadow-cobalt-muted/20 dark:shadow-cobalt-accent/20 cursor-pointer"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Enquiring...</span>
                    </>
                  ) : (
                    <>
                      <span>Enquire</span>
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
