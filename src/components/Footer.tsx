/**
 * LearnPath Platform Footer
 * Professional, clean LMS footer with relevant curriculum, platform standards, and institutional links.
 */
import React from 'react';
import { BookOpen, Layers, Compass, Award, ShieldCheck, Mail, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#17365D] text-slate-300 border-t border-blue-950 mt-20">
      
      {/* Top accent line */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-blue-400 to-indigo-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand & Platform Mission */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-extrabold text-sm shadow-xs">
                LP
              </div>
              <div>
                <span className="text-base font-bold text-white tracking-tight">LearnPath Academy</span>
                <span className="text-[11px] block text-blue-200 font-medium">Progressive E-Learning & Prerequisite Mastery</span>
              </div>
            </div>

            <p className="text-xs text-blue-100/80 max-w-md leading-relaxed">
              A modern progressive e-learning platform engineered to eliminate course abandonment through mathematical progress calculation, prerequisite dependency graphs (DAG), cognitive resumption pointers, and adaptive revision queues.
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs text-blue-200">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Server-Authoritative Progress</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Verifiable Digital Credentials</span>
              </div>
            </div>
          </div>

          {/* Curricula & Features */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Learning Curricula
            </h4>
            <ul className="space-y-2.5 text-xs text-blue-100/80">
              <li>
                <button
                  onClick={() => onNavigate('catalogue')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5 text-blue-300" />
                  <span>Course Catalogue</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('paths')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Layers className="w-3.5 h-3.5 text-blue-300" />
                  <span>Structured Learning Paths</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('pretest')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Compass className="w-3.5 h-3.5 text-blue-300" />
                  <span>Diagnostic Placement</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('verify')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Award className="w-3.5 h-3.5 text-blue-300" />
                  <span>Credential Verification</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Institutional & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Platform & Support
            </h4>
            <ul className="space-y-2.5 text-xs text-blue-100/80">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  About the Platform
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Contact Support
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('privacy')} className="hover:text-white transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('terms')} className="hover:text-white transition-colors">
                  Terms of Service & Honor Code
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-blue-900/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-blue-200/70">
          <p>© 2026 LearnPath Academy. Progressive Learning Progress Tracking Platform.</p>
          <div className="flex items-center gap-4">
            <span>Discrete Metric Enforcement</span>
            <span>·</span>
            <span>Directed Acyclic Graph (DAG) Gating</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
