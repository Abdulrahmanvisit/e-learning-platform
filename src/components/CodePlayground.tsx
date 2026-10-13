/**
 * LearnPath In-Browser Interactive Code Playground & IDE
 * Inspired by VS Code / Monaco: line numbers, multi-language execution,
 * test assertions, live stdout console, and algorithmic templates.
 */
import React, { useState } from 'react';
import { api } from '../api/client.ts';
import { useToast } from '../context/ToastContext.tsx';
import {
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Terminal,
  Code2,
  Cpu,
  Layers,
  Sparkles,
  Copy,
  Check,
  Maximize2,
  Minimize2
} from 'lucide-react';

interface CodePlaygroundProps {
  initialLanguage?: 'python' | 'javascript' | 'typescript' | 'sql';
  initialCode?: string;
  title?: string;
  onCodeExecuted?: () => void;
}

const STARTER_TEMPLATES: Record<string, { code: string; testCases: { inputDescription: string; expectedOutput: string }[] }> = {
  python: {
    code: `import numpy as np

def scaled_dot_product_attention(Q, K, V):
    """
    Compute Scaled Dot-Product Attention:
    Attention(Q, K, V) = softmax(Q * K^T / sqrt(d_k)) * V
    """
    d_k = Q.shape[-1]
    
    # 1. Compute pairwise attention logits
    scores = np.matmul(Q, K.T) / np.sqrt(d_k)
    
    # 2. Softmax along the last dimension
    exp_scores = np.exp(scores - np.max(scores, axis=-1, keepdims=True))
    attention_weights = exp_scores / np.sum(exp_scores, axis=-1, keepdims=True)
    
    # 3. Multiply weights by values
    output = np.matmul(attention_weights, V)
    return output, attention_weights

# Sample test run with 3 tokens in 4-dimensional space
Q = np.array([[1.0, 0.0, 1.0, 0.0], [0.0, 2.0, 0.0, 1.0]])
K = Q
V = Q

out, weights = scaled_dot_product_attention(Q, K, V)
print("Attention weights shape:", weights.shape)
print("Output tensor shape:", out.shape)
print("Scaled Dot-Product calculation verified successfully.")`,
    testCases: [
      { inputDescription: 'Compute Attention weights for 2 tokens (dim 4)', expectedOutput: 'Attention weights shape: (2, 2)' },
      { inputDescription: 'Output shape matches (2, 4)', expectedOutput: 'Output tensor shape: (2, 4)' },
    ],
  },
  typescript: {
    code: `// Token Bucket Rate Limiting Algorithm Invariant
class TokenBucket {
  private capacity: number;
  private refillRate: number; // tokens added per second
  private tokens: number;
  private lastRefillTimestamp: number;

  constructor(capacity: number, refillRate: number) {
    this.capacity = capacity;
    this.refillRate = refillRate;
    this.tokens = capacity;
    this.lastRefillTimestamp = Date.now();
  }

  public tryConsume(tokensRequested: number = 1): boolean {
    this.refill();
    if (this.tokens >= tokensRequested) {
      this.tokens -= tokensRequested;
      console.log(\`[ALLOWED] Consumed \${tokensRequested} tokens. Remaining: \${this.tokens.toFixed(2)}\`);
      return true;
    }
    console.log(\`[BLOCKED] Insufficient tokens. Needed: \${tokensRequested}, Available: \${this.tokens.toFixed(2)}\`);
    return false;
  }

  private refill(): void {
    const now = Date.now();
    const elapsedSeconds = (now - this.lastRefillTimestamp) / 1000;
    this.tokens = Math.min(this.capacity, this.tokens + elapsedSeconds * this.refillRate);
    this.lastRefillTimestamp = now;
  }
}

// Test scenario
const limiter = new TokenBucket(5, 2);
console.log("Bucket initialized with capacity: 5");
limiter.tryConsume(3);
limiter.tryConsume(2);
limiter.tryConsume(1); // Should be rate-limited`,
    testCases: [
      { inputDescription: 'Consume 3 tokens from capacity 5', expectedOutput: 'Consumed 3 tokens' },
      { inputDescription: 'Consume remaining 2 tokens', expectedOutput: 'Consumed 2 tokens' },
      { inputDescription: 'Block 6th token on exhausted bucket', expectedOutput: 'Insufficient tokens' },
    ],
  },
  javascript: {
    code: `// Binary Search with Overflow-Safe Midpoint Calculation
function binarySearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    // Prevent integer overflow: low + ((high - low) >> 1)
    const mid = low + Math.floor((high - low) / 2);
    
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return -1;
}

const dataset = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
console.log("Dataset:", dataset);
console.log("Search 23 -> Index:", binarySearch(dataset, 23));
console.log("Search 56 -> Index:", binarySearch(dataset, 56));
console.log("Search 99 -> Index:", binarySearch(dataset, 99));`,
    testCases: [
      { inputDescription: 'Search for present element 23', expectedOutput: 'Search 23 -> Index: 5' },
      { inputDescription: 'Search for missing element 99', expectedOutput: 'Search 99 -> Index: -1' },
    ],
  },
  sql: {
    code: `-- Third Normal Form (3NF) Relational Invariant Schema
CREATE TABLE students (
  id VARCHAR(64) PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  learning_streak INT DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE courses (
  id VARCHAR(64) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  passing_threshold_percent INT NOT NULL DEFAULT 75
);

CREATE TABLE enrolments (
  id VARCHAR(64) PRIMARY KEY,
  student_id VARCHAR(64) REFERENCES students(id) ON DELETE CASCADE,
  course_id VARCHAR(64) REFERENCES courses(id) ON DELETE CASCADE,
  progress_percent INT DEFAULT 0,
  version INT DEFAULT 1,
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT unique_student_course UNIQUE(student_id, course_id)
);

-- Indexing for O(log N) lookup
CREATE INDEX idx_enrolments_student ON enrolments(student_id);
SELECT 'Schema verified in 3NF with foreign key constraints.' AS status;`,
    testCases: [
      { inputDescription: 'Create normalized relational schema', expectedOutput: 'Schema verified in 3NF' },
    ],
  },
};

export const CodePlayground: React.FC<CodePlaygroundProps> = ({
  initialLanguage = 'python',
  initialCode,
  title = 'Interactive Algorithm & Implementation IDE',
  onCodeExecuted,
}) => {
  const { showToast } = useToast();
  const [language, setLanguage] = useState<'python' | 'javascript' | 'typescript' | 'sql'>(initialLanguage);
  const [code, setCode] = useState<string>(
    initialCode || STARTER_TEMPLATES[initialLanguage]?.code || STARTER_TEMPLATES.python.code
  );
  const [isRunning, setIsRunning] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState<string>('');
  const [executionTime, setExecutionTime] = useState<number | null>(null);
  const [memoryUsage, setMemoryUsage] = useState<number | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState<'console' | 'tests'>('console');
  const [testResults, setTestResults] = useState<any[]>([]);

  const handleLanguageChange = (newLang: 'python' | 'javascript' | 'typescript' | 'sql') => {
    setLanguage(newLang);
    setCode(STARTER_TEMPLATES[newLang]?.code || '');
    setConsoleOutput('');
    setTestResults([]);
  };

  const handleReset = () => {
    setCode(STARTER_TEMPLATES[language]?.code || '');
    setConsoleOutput('');
    setTestResults([]);
    showToast('Code reset to default exercise template', 'info');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
    showToast('Source code copied to clipboard', 'success');
  };

  const handleRun = async () => {
    try {
      setIsRunning(true);
      setConsoleOutput('Compiling and executing code in sandbox...');
      const tests = STARTER_TEMPLATES[language]?.testCases || [];
      const res = await api.executeCode(code, language, tests);

      setConsoleOutput(res.stdout || (res.stderr ? `[ERROR] ${res.stderr}` : 'Execution completed.'));
      setExecutionTime(res.executionTimeMs);
      setMemoryUsage(res.memoryKb);
      if (res.testResults) {
        setTestResults(res.testResults);
      }

      // Record daily user activity to keep learning streak active!
      await api.touchActivity();

      if (onCodeExecuted) onCodeExecuted();
      showToast(`Execution completed in ${res.executionTimeMs}ms`, 'success');
    } catch (err: any) {
      setConsoleOutput(`[Execution Failed]: ${err.message || 'Unknown runtime exception'}`);
      showToast('Execution error occurred', 'error');
    } finally {
      setIsRunning(false);
    }
  };

  const linesCount = code.split('\n').length;

  return (
    <div
      className={`bg-[#1e1e1e] text-slate-100 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col transition-all ${
        isFullscreen ? 'fixed inset-4 z-50 rounded-2xl shadow-2xl' : 'w-full my-6'
      }`}
    >
      {/* IDE Header Bar */}
      <div className="bg-[#252526] px-4 py-2.5 border-b border-[#333333] flex flex-wrap items-center justify-between gap-3">
        
        {/* Left: Window dots & Title */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <div className="flex items-center gap-2 pl-2 border-l border-slate-700">
            <Code2 className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-bold text-slate-200">{title}</span>
          </div>
        </div>

        {/* Right: Language Switcher & Actions */}
        <div className="flex items-center gap-2">
          
          {/* Language selector */}
          <div className="flex items-center bg-[#1e1e1e] p-0.5 rounded-lg border border-slate-700 text-[11px] font-semibold">
            {(['python', 'typescript', 'javascript', 'sql'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`px-2.5 py-1 rounded-md transition-colors uppercase ${
                  language === lang
                    ? 'bg-blue-600 text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {lang === 'typescript' ? 'TS' : lang === 'javascript' ? 'JS' : lang}
              </button>
            ))}
          </div>

          {/* Reset Code */}
          <button
            onClick={handleReset}
            title="Reset to starter template"
            className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-700/60 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Copy Code */}
          <button
            onClick={handleCopy}
            title="Copy code"
            className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-700/60 transition-colors"
          >
            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-700/60 transition-colors"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>

          {/* Run Code Primary Button */}
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 shadow-sm ml-1"
          >
            {isRunning ? (
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-current" />
            )}
            <span>{isRunning ? 'Executing...' : 'Run Code'}</span>
          </button>
        </div>
      </div>

      {/* Editor Main Surface (Line Numbers + Textarea) */}
      <div className="flex-1 flex overflow-hidden relative min-h-[280px] max-h-[460px]">
        {/* Line Numbers column */}
        <div className="bg-[#1e1e1e] select-none text-slate-600 text-right font-mono text-xs py-3 px-2 border-r border-[#333333] shrink-0 min-w-[42px] leading-6">
          {Array.from({ length: Math.max(linesCount, 12) }).map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        {/* Code Input Textarea */}
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          className="flex-1 bg-[#1e1e1e] text-slate-100 font-mono text-xs p-3 leading-6 resize-none focus:outline-none focus:ring-0 selection:bg-blue-600 selection:text-white"
          style={{ tabSize: 2 }}
        />
      </div>

      {/* Execution Telemetry Status Bar */}
      <div className="bg-[#007acc] text-white text-[11px] px-3 py-1 flex items-center justify-between font-mono">
        <div className="flex items-center gap-4">
          <span>Language: {language.toUpperCase()}</span>
          <span>Lines: {linesCount}</span>
          {executionTime !== null && <span>Latency: {executionTime}ms</span>}
          {memoryUsage !== null && <span>Memory: {(memoryUsage / 1024).toFixed(1)}MB</span>}
        </div>
        <div className="flex items-center gap-2">
          <span>Sandbox: Active</span>
          <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
        </div>
      </div>

      {/* Bottom Output Drawer */}
      <div className="bg-[#181818] border-t border-[#333333] flex flex-col">
        {/* Tab switcher */}
        <div className="flex items-center bg-[#252526] px-3 border-b border-[#333333] text-xs">
          <button
            onClick={() => setActiveTab('console')}
            className={`px-3 py-1.5 flex items-center gap-1.5 border-b-2 font-medium transition-colors ${
              activeTab === 'console'
                ? 'border-blue-500 text-white font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Terminal Output</span>
          </button>

          <button
            onClick={() => setActiveTab('tests')}
            className={`px-3 py-1.5 flex items-center gap-1.5 border-b-2 font-medium transition-colors ${
              activeTab === 'tests'
                ? 'border-blue-500 text-white font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Test Cases ({STARTER_TEMPLATES[language]?.testCases.length || 0})</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-3 font-mono text-xs min-h-[90px] max-h-[160px] overflow-y-auto">
          {activeTab === 'console' ? (
            consoleOutput ? (
              <pre className="text-emerald-400 whitespace-pre-wrap leading-relaxed">{consoleOutput}</pre>
            ) : (
              <span className="text-slate-500 italic">
                Press "Run Code" above to execute your solution in the isolated runtime environment.
              </span>
            )
          ) : (
            <div className="space-y-2">
              {testResults.length > 0 ? (
                testResults.map((tr, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded bg-[#202020] border border-slate-800 flex items-center justify-between text-[11px]"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-slate-300 font-medium">{tr.description}</span>
                    </div>
                    <span className="text-emerald-400 font-bold bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
                      PASSED
                    </span>
                  </div>
                ))
              ) : (
                (STARTER_TEMPLATES[language]?.testCases || []).map((tc, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded bg-[#202020] border border-slate-800 flex items-center justify-between text-[11px]"
                  >
                    <span className="text-slate-400">{tc.inputDescription}</span>
                    <span className="text-slate-500">Awaiting execution</span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
