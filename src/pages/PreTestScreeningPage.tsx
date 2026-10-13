/**
 * LearnPath Diagnostic Technical Knowledge Placement Test
 * Empirical baseline diagnostic evaluating algorithmic, distributed systems, and architectural competence.
 */
import React, { useState } from 'react';
import { ShieldCheck, Award, ArrowRight, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';

interface PreQuestion {
  id: number;
  domain: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const PRE_QUESTIONS: PreQuestion[] = [
  {
    id: 1,
    domain: 'Software & Distributed Systems',
    question: 'When designing a distributed e-learning platform with concurrent lesson completions, why must database transactions enforce ACID isolation rather than dirty reads?',
    options: [
      'To make web pages download faster on 3G networks',
      'To prevent race conditions, lost updates, and phantom data corruption',
      'To reduce the size of CSS stylesheets',
      'Because SQL databases do not support primary keys',
    ],
    correctIndex: 1,
    explanation: 'ACID transactions guarantee serializability or repeatable reads, preventing concurrent workers from overwriting critical state.',
  },
  {
    id: 2,
    domain: 'IoT & Precision Agriculture',
    question: 'What is the primary operational advantage of using low-power wide-area networks (LoRaWAN) for rural farm telemetry?',
    options: [
      'It supports 4K live video streaming',
      'Transmission over 10km+ distances with multi-year battery life on low bandwidth',
      'It requires constant fiber optic cabling',
      'It operates without any antennas',
    ],
    correctIndex: 1,
    explanation: 'LoRaWAN provides long-range, sub-gigahertz telemetry with microamp sleep currents, ideal for remote African soil sensors.',
  },
  {
    id: 3,
    domain: 'Green & Renewable Energy',
    question: 'Which component in a solar microgrid is responsible for converting direct current (DC) from batteries into synchronized alternating current (AC)?',
    options: [
      'The step-down transformer',
      'The grid-tied / off-grid power inverter',
      'The solar panel glass frame',
      'The analog voltmeter',
    ],
    correctIndex: 1,
    explanation: 'The power inverter modulates DC current into clean sinusoidal AC power synchronized with mains voltage and frequency.',
  },
  {
    id: 4,
    domain: 'Manufacturing & Hardware',
    question: 'Which microcontroller protocol uses differential signaling across two twisted wires (CAN_H and CAN_L) for noise-immune vehicle and industrial telemetry?',
    options: [
      'I2C bus',
      'SPI protocol',
      'Controller Area Network (CAN bus)',
      'Universal Serial Bus (USB 2.0)',
    ],
    correctIndex: 2,
    explanation: 'CAN bus uses differential voltage between CAN_H and CAN_L to eliminate electromagnetic interference in harsh electrical environments.',
  },
  {
    id: 5,
    domain: 'Data Analytics & Innovation Management',
    question: 'What metric represents the period required for an innovation venture to recover its initial capital investment from operational net cash flow?',
    options: [
      'Payback Period',
      'Customer Acquisition Cost',
      'Churn Rate',
      'Total Addressable Market',
    ],
    correctIndex: 0,
    explanation: 'The Payback Period calculates the exact timeframe until cumulative revenues offset initial capital expenditure.',
  },
];

export const PreTestScreeningPage: React.FC<{ onNavigate: (view: string, param?: string) => void }> = ({
  onNavigate,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelect = (qId: number, optIdx: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let correct = 0;
    PRE_QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correct++;
      }
    });
    const calculatedScore = Math.round((correct / PRE_QUESTIONS.length) * 100);
    setScore(calculatedScore);
    setSubmitted(true);
  };

  const isPassed = score >= 60;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center mx-auto">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Diagnostic Knowledge Placement & Technical Screening Test
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Evaluates baseline technical acumen across software architecture, networking, concurrency, and algorithms to determine your optimal starting point along the progressive learning paths.
        </p>
      </div>

      {/* Results Banner */}
      {submitted && (
        <div
          className={`p-6 rounded-2xl border space-y-3 ${
            isPassed
              ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
              : 'bg-amber-50 border-amber-200 text-amber-950'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isPassed ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              ) : (
                <AlertCircle className="w-6 h-6 text-amber-600" />
              )}
              <h3 className="text-base font-bold">
                {isPassed
                  ? 'Screening Approved: Ready for Virtual Intensive'
                  : 'Diagnostic Review Recommended'}
              </h3>
            </div>
            <div className="text-lg font-extrabold tabular-nums">Score: {score}%</div>
          </div>

          <p className="text-xs leading-relaxed">
            {isPassed
              ? 'Congratulations! Your baseline diagnostic score meets the placement threshold (60%+). You are cleared to enrol in foundational, intermediate, and advanced curriculum tracks.'
              : 'Your score indicates foundational concepts to review. Study the detailed technical explanations below and retry the placement test.'}
          </p>

          <div className="pt-2 flex items-center gap-3">
            {isPassed ? (
              <button
                onClick={() => onNavigate('catalogue')}
                className="px-5 py-2.5 bg-emerald-800 text-white rounded-lg text-xs font-bold hover:bg-emerald-900 transition-colors inline-flex items-center gap-1.5"
              >
                <span>Proceed to Course Catalogue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => {
                  setSubmitted(false);
                  setSelectedAnswers({});
                }}
                className="px-4 py-2 bg-amber-800 text-white rounded-lg text-xs font-semibold inline-flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry Diagnostic</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Questions */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {PRE_QUESTIONS.map((q, idx) => {
          const isSelected = selectedAnswers[q.id] !== undefined;
          const userChoice = selectedAnswers[q.id];
          const isCorrect = userChoice === q.correctIndex;

          return (
            <div
              key={q.id}
              className="bg-white p-6 rounded-xl border border-slate-200 space-y-4 shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                  {q.domain}
                </span>
                <span className="text-xs text-slate-400 font-medium">Question {idx + 1} of 5</span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 leading-snug">{q.question}</h3>

              <div className="space-y-2">
                {q.options.map((opt, optIdx) => {
                  const chosen = userChoice === optIdx;
                  const optIsKey = optIdx === q.correctIndex;

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleSelect(q.id, optIdx)}
                      disabled={submitted}
                      className={`w-full text-left p-3 rounded-lg border text-xs flex items-center justify-between transition-colors ${
                        submitted
                          ? optIsKey
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-medium'
                            : chosen
                            ? 'bg-rose-50 border-rose-300 text-rose-950'
                            : 'bg-white border-slate-200 text-slate-400'
                          : chosen
                          ? 'bg-emerald-900 border-emerald-900 text-white font-medium'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{opt}</span>
                      {submitted && optIsKey && (
                        <span className="text-emerald-700 font-bold ml-2">✓ Verified Key</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700">
                  <span className="font-bold text-slate-900">Technical Rationale: </span>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}

        {!submitted && (
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={Object.keys(selectedAnswers).length < PRE_QUESTIONS.length}
              className={`px-6 py-3 rounded-xl text-xs font-bold text-white transition-colors shadow-xs ${
                Object.keys(selectedAnswers).length === PRE_QUESTIONS.length
                  ? 'bg-emerald-800 hover:bg-emerald-900'
                  : 'bg-slate-300 cursor-not-allowed text-slate-500'
              }`}
            >
              Submit Diagnostic Evaluation
            </button>
          </div>
        )}
      </form>

    </div>
  );
};
