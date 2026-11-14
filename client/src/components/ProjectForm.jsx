import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, Sparkles, HelpCircle } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { Button } from './ui/Button';

export function ProjectForm({ initialCategory = '', onSubmissionSuccess }) {
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
    hp_field: '', // Honeypot field (hidden from genuine users)
    form_load_time: Date.now()
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [statusMessage, setStatusMessage] = useState('');
  const [submittedData, setSubmittedData] = useState(null);

  // Update category when initialCategory prop changes
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
      setStatusMessage('Unable to connect to the server. Please check your internet connection or email us directly.');
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
    <section id="enquiry" className="py-20 md:py-28 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
            <span>05 / Project Request</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white mb-4">
            {siteConfig.enquiry.headline}
          </h2>
          <p className="text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
            {siteConfig.enquiry.supportingText}
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-lg p-6 sm:p-10">
          
          {status === 'success' ? (
            /* Success State */
            <div className="py-8 text-center space-y-5 animate-fade-in">
              <div className="w-14 h-14 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 mx-auto flex items-center justify-center text-neutral-900 dark:text-white">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
                  Enquiry Received
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-md mx-auto leading-relaxed">
                  {statusMessage}
                </p>
              </div>

              {submittedData && (
                <div className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 text-left max-w-md mx-auto font-mono text-xs space-y-1.5">
                  <div className="flex justify-between text-neutral-500">
                    <span>Reference ID:</span>
                    <span className="font-semibold text-neutral-900 dark:text-white">#CR-{submittedData.id}</span>
                  </div>
                  <div className="flex justify-between text-neutral-500">
                    <span>Applicant:</span>
                    <span className="text-neutral-900 dark:text-white">{submittedData.name}</span>
                  </div>
                  <div className="flex justify-between text-neutral-500">
                    <span>Category:</span>
                    <span className="text-neutral-900 dark:text-white">{submittedData.category}</span>
                  </div>
                  <div className="flex justify-between text-neutral-500">
                    <span>Storage Status:</span>
                    <span className="text-emerald-600 dark:text-emerald-400">Recorded ({submittedData.storage})</span>
                  </div>
                </div>
              )}

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button
                  onClick={handleReset}
                  variant="outline"
                  size="sm"
                >
                  Submit Another Enquiry
                </Button>
                <a
                  href="#home"
                  className="text-xs font-mono text-neutral-500 hover:text-neutral-900 dark:hover:text-white underline underline-offset-4"
                >
                  Return to Top
                </a>
              </div>
            </div>
          ) : (
            /* Enquiry Form */
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              
              {/* Error Banner */}
              {status === 'error' && (
                <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 flex items-start gap-3 text-red-800 dark:text-red-300 text-sm">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>{statusMessage}</span>
                </div>
              )}

              {/* Row 1: Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 uppercase mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    className={`w-full px-3.5 py-2.5 rounded-md border text-sm bg-neutral-50/50 dark:bg-neutral-950 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-1 transition-colors ${
                      errors.name
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-neutral-200 dark:border-neutral-800 focus:border-neutral-400 dark:focus:border-neutral-600 focus:ring-neutral-400'
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 uppercase mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className={`w-full px-3.5 py-2.5 rounded-md border text-sm bg-neutral-50/50 dark:bg-neutral-950 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-1 transition-colors ${
                      errors.email
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-neutral-200 dark:border-neutral-800 focus:border-neutral-400 dark:focus:border-neutral-600 focus:ring-neutral-400'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Row 2: Phone / WhatsApp and College / Institution */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="phone" className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 uppercase mb-2">
                    Phone / WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className={`w-full px-3.5 py-2.5 rounded-md border text-sm bg-neutral-50/50 dark:bg-neutral-950 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-1 transition-colors ${
                      errors.phone
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-neutral-200 dark:border-neutral-800 focus:border-neutral-400 dark:focus:border-neutral-600 focus:ring-neutral-400'
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="institution" className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 uppercase mb-2">
                    College / Institution <span className="text-neutral-400 text-[10px] font-normal lowercase">(optional)</span>
                  </label>
                  <input
                    type="text"
                    id="institution"
                    name="institution"
                    value={formData.institution}
                    onChange={handleChange}
                    placeholder="e.g. University College of Engineering"
                    className="w-full px-3.5 py-2.5 rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 focus:ring-1 focus:ring-neutral-400 text-sm transition-colors"
                  />
                </div>
              </div>

              {/* Row 3: Category and Preferred Technology */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="category" className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 uppercase mb-2">
                    Project Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`w-full px-3.5 py-2.5 rounded-md border text-sm bg-neutral-50/50 dark:bg-neutral-950 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 transition-colors ${
                      errors.category
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-neutral-200 dark:border-neutral-800 focus:border-neutral-400 dark:focus:border-neutral-600 focus:ring-neutral-400'
                    }`}
                  >
                    {siteConfig.enquiry.categories.map((cat) => (
                      <option key={cat} value={cat} className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white">
                        {cat}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-xs text-red-500">{errors.category}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="preferred_tech" className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 uppercase mb-2">
                    Preferred Technology <span className="text-neutral-400 text-[10px] font-normal lowercase">(optional)</span>
                  </label>
                  <input
                    type="text"
                    id="preferred_tech"
                    name="preferred_tech"
                    value={formData.preferred_tech}
                    onChange={handleChange}
                    placeholder="e.g. Python / Django, React, ESP32, YOLOv8"
                    className="w-full px-3.5 py-2.5 rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 focus:ring-1 focus:ring-neutral-400 text-sm transition-colors"
                  />
                </div>
              </div>

              {/* Row 4: Project Description */}
              <div>
                <label htmlFor="description" className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 uppercase mb-2">
                  Project Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Tell us what problem your project aims to solve, core modules you need, or the primary guidelines given by your college guide..."
                  className={`w-full px-3.5 py-2.5 rounded-md border text-sm bg-neutral-50/50 dark:bg-neutral-950 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-1 transition-colors resize-y ${
                    errors.description
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-neutral-200 dark:border-neutral-800 focus:border-neutral-400 dark:focus:border-neutral-600 focus:ring-neutral-400'
                  }`}
                />
                {errors.description && (
                  <p className="mt-1 text-xs text-red-500">{errors.description}</p>
                )}
              </div>

              {/* Row 5: Expected Deadline and Additional Requirements */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="deadline" className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 uppercase mb-2">
                    Expected Deadline <span className="text-neutral-400 text-[10px] font-normal lowercase">(optional)</span>
                  </label>
                  <input
                    type="text"
                    id="deadline"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    placeholder="e.g. 3 weeks, End of semester, Nov 30"
                    className="w-full px-3.5 py-2.5 rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 focus:ring-1 focus:ring-neutral-400 text-sm transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="additional_requirements" className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 uppercase mb-2">
                    Additional Requirements <span className="text-neutral-400 text-[10px] font-normal lowercase">(optional)</span>
                  </label>
                  <input
                    type="text"
                    id="additional_requirements"
                    name="additional_requirements"
                    value={formData.additional_requirements}
                    onChange={handleChange}
                    placeholder="e.g. Code walkthrough, Viva prep, Report draft"
                    className="w-full px-3.5 py-2.5 rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 focus:ring-1 focus:ring-neutral-400 text-sm transition-colors"
                  />
                </div>
              </div>

              {/* Honeypot field for anti-spam (visually hidden from human users) */}
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

              {/* Submit Area */}
              <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="text-xs text-neutral-500 font-mono">
                  All requests are reviewed directly by our engineering co-founders.
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={status === 'submitting'}
                  className="w-full sm:w-auto gap-2"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting Enquiry...</span>
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
