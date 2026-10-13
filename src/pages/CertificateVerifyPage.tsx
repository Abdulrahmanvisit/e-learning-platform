/**
 * LearnPath Public Certificate Verification
 * Publicly verifiable credential lookup without authentication required
 */
import React, { useState, useEffect } from 'react';
import { Certificate } from '../types/index.ts';
import { api } from '../api/client.ts';
import { Award, CheckCircle2, AlertCircle, Search, ShieldCheck } from 'lucide-react';

export const CertificateVerifyPage: React.FC<{ initialCode?: string }> = ({ initialCode }) => {
  const [code, setCode] = useState(initialCode || '');
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const verifyCode = async (searchCode: string) => {
    if (!searchCode.trim()) return;
    try {
      setLoading(true);
      setError(null);
      const res = await api.verifyCertificate(searchCode.trim());
      setCertificate(res.certificate);
    } catch (err: any) {
      setError(err.message || 'Certificate code not found or invalid');
      setCertificate(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialCode) {
      verifyCode(initialCode);
    }
  }, [initialCode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    verifyCode(code);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Certificate Verification Registry
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Verify credentials issued by the LearnPath progressive engineering platform. Certificates are issued strictly upon server-evaluated course completion.
        </p>
      </div>

      {/* Code Search Input Form */}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto flex gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter Verification Code (e.g. LP-ABCD-1234)"
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-slate-400 font-mono"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors shrink-0"
        >
          {loading ? 'Verifying...' : 'Verify'}
        </button>
      </form>

      {/* Verification Result */}
      {error && (
        <div className="max-w-md mx-auto p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <div>
            <span className="font-bold block">Verification Failed</span>
            <span>{error}</span>
          </div>
        </div>
      )}

      {certificate && (
        <div className="max-w-2xl mx-auto bg-white rounded-2xl border-2 border-slate-900 p-8 sm:p-12 shadow-lg space-y-8 relative overflow-hidden">
          
          {/* Subtle Watermark-free clean certificate styling */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-6">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-slate-900 flex items-center justify-center text-white font-bold text-xs">
                LP
              </div>
              <span className="text-sm font-bold tracking-tight text-slate-900">LearnPath Academic Registry</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Verified Credential</span>
            </div>
          </div>

          <div className="text-center space-y-4">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">
              Certificate of Technical Mastery
            </p>
            <p className="text-xs text-slate-600">This certifies that</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
              {certificate.recipientName}
            </h2>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              has successfully completed all required modules, prerequisite gates, and rigorous evaluations for
            </p>
            <h3 className="text-lg sm:text-xl font-bold text-indigo-600">
              {certificate.courseTitle}
            </h3>
          </div>

          <div className="border-t border-slate-100 pt-6 grid grid-cols-3 gap-4 text-center text-xs">
            <div>
              <div className="text-slate-400 font-medium">Issue Date</div>
              <div className="font-semibold text-slate-800 mt-0.5">
                {new Date(certificate.issuedAt).toLocaleDateString()}
              </div>
            </div>
            <div>
              <div className="text-slate-400 font-medium">Final Evaluation Score</div>
              <div className="font-semibold text-slate-800 mt-0.5 tabular-nums">
                {certificate.finalScorePercent}%
              </div>
            </div>
            <div>
              <div className="text-slate-400 font-medium">Unique Verification ID</div>
              <div className="font-mono text-slate-800 mt-0.5 text-[11px]">
                {certificate.verificationCode}
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
