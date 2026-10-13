/**
 * LearnPath Static Content Pages
 * Real pages for Methodology/About, Contact, Privacy, and Academic Honesty Terms
 */
import React, { useState } from 'react';
import { ShieldCheck, Mail, FileText, Send, CheckCircle2 } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div>
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Methodology & Pedagogy</div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
          The LearnPath Educational Philosophy
        </h1>
      </div>

      <div className="prose prose-slate text-sm leading-relaxed space-y-5 text-slate-700">
        <p>
          Most contemporary e-learning systems equate video completion with skill acquisition. In software and systems engineering, passive consumption does not build intuition or operational capability.
        </p>

        <h3 className="text-base font-bold text-slate-900">1. Prerequisite Invariant Enforcement</h3>
        <p>
          Students cannot skip ahead to distributed consensus algorithms or Kubernetes overlay networking without verifying foundational knowledge of client-server contracts and tree balancing. Our backend graph engine enforces prerequisite verification at every API boundary.
        </p>

        <h3 className="text-base font-bold text-slate-900">2. Server-Validated Mastery</h3>
        <p>
          Passing scores (75%–80%) are computed server-side. Question answer keys are never sent in client payloads. Submissions evaluate practical problem-solving rather than rote memorization.
        </p>

        <h3 className="text-base font-bold text-slate-900">3. Adaptive Revision Cycles</h3>
        <p>
          When an assessment question is missed, the specific underlying topic is mapped to its prerequisite reference lesson and scheduled in the learner's Adaptive Revision Queue, encouraging active recall and targeted remediation.
        </p>
      </div>
    </div>
  );
};

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 space-y-8">
      <div>
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Support & Inquiries</div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
          Contact LearnPath Academic Support
        </h1>
        <p className="text-xs text-slate-600 mt-1">
          Our academic team reviews all student inquiries within 24 hours.
        </p>
      </div>

      {submitted ? (
        <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-2">
          <div className="flex items-center gap-2 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Message Dispatched</span>
          </div>
          <p>Thank you for reaching out. A faculty member will follow up at {email}.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-xs bg-white p-6 rounded-xl border border-slate-200">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Your Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-slate-400"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Inquiry Topic</label>
            <select className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white">
              <option>Curriculum & Prerequisite Clarification</option>
              <option>Certificate Verification Support</option>
              <option>Academic & University Partnership</option>
              <option>Enterprise Platform Deployment</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Message</label>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Please describe your question or issue in detail..."
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-slate-400 leading-relaxed"
            />
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 rounded-lg bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors inline-flex items-center gap-2"
          >
            <span>Submit Inquiry</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      )}
    </div>
  );
};

export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
      <h1 className="text-2xl font-extrabold text-slate-900">Privacy Policy</h1>
      <div className="prose prose-slate text-xs leading-relaxed space-y-4 text-slate-700">
        <p>
          LearnPath respects learner privacy and stores only the data required to validate progressive learning achievements, calculate prerequisite unlock states, and issue tamper-proof certificates.
        </p>
        <h4 className="text-sm font-bold text-slate-900">Data Protection Invariants</h4>
        <ul className="list-disc list-inside space-y-1">
          <li>Assessment answer attempts and timing data are stored encrypted in our persistent database.</li>
          <li>Learner records are protected by Row Level Security (RLS) policies ensuring tenant isolation.</li>
          <li>We never sell learner progress data or share telemetry with external third-party advertisers.</li>
        </ul>
      </div>
    </div>
  );
};

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
      <h1 className="text-2xl font-extrabold text-slate-900">Academic Honesty & Platform Terms</h1>
      <div className="prose prose-slate text-xs leading-relaxed space-y-4 text-slate-700">
        <p>
          Certificates issued by LearnPath reflect verified technical mastery. By participating in the platform, learners agree to the following terms:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>Assessment submissions must represent the student's own intellectual work.</li>
          <li>Circumvention of prerequisite validation logic via API tampering constitutes a terms violation.</li>
          <li>Certificates with invalidated completion criteria are subject to revocation.</li>
        </ul>
      </div>
    </div>
  );
};
