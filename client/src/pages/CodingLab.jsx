import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Code2, Play, CheckCircle2, Clock, Tag, Filter, ChevronDown,
  Terminal, Zap, ArrowRight, Send, RotateCcw
} from 'lucide-react';
import { problemAPI } from '../services/api';
import { useAuthStore } from '../store';
import toast from 'react-hot-toast';

const difficulties = ['All', 'easy', 'medium', 'hard'];
const languages = ['python', 'javascript', 'cpp', 'java'];

export default function CodingLab() {
  const { isAuthenticated } = useAuthStore();
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [difficulty, setDifficulty] = useState('All');
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('python');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const params = {};
        if (difficulty !== 'All') params.difficulty = difficulty;
        const res = await problemAPI.getAll(params);
        setProblems(res.data.problems || res.data || []);
      } catch {
        setProblems([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [difficulty]);

  const selectProblem = async (problem) => {
    setSelected(problem);
    setCode(problem.starterCode || `# Write your solution here\n\ndef solution():\n    pass`);
    setResult(null);
  };

  const handleSubmit = async () => {
    if (!isAuthenticated) { toast.error('Please login to submit'); return; }
    if (!code.trim()) { toast.error('Please write some code'); return; }
    setSubmitting(true);
    setResult(null);
    try {
      const res = await problemAPI.submit(selected.id, { code, language });
      setResult(res.data);
      if (res.data.passed) toast.success('All test cases passed! 🎉');
      else toast.error('Some test cases failed');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  const diffColors = {
    easy: 'text-emerald-400 bg-emerald-500/10',
    medium: 'text-amber-400 bg-amber-500/10',
    hard: 'text-red-400 bg-red-500/10',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display text-white flex items-center gap-3">
            <Terminal size={28} className="text-emerald-400" /> Coding Lab
          </h1>
          <p className="text-white/40 mt-1">Solve problems, earn karma, and sharpen your skills</p>
        </div>
        <div className="flex items-center gap-2">
          {difficulties.map((d) => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                difficulty === d
                  ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                  : 'bg-white/5 text-white/50 hover:bg-white/10'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-6 min-h-[70vh]">
        {/* Problem List */}
        <div className="lg:col-span-2 space-y-2">
          {loading ? (
            [...Array(5)].map((_, i) => (
              <div key={i} className="glass-card p-4 animate-pulse">
                <div className="h-4 w-2/3 bg-white/5 rounded mb-2" />
                <div className="h-3 w-1/3 bg-white/5 rounded" />
              </div>
            ))
          ) : problems.length === 0 ? (
            <div className="glass-card p-8 text-center">
              <Code2 size={40} className="text-white/10 mx-auto mb-3" />
              <p className="text-white/40 text-sm">No problems found</p>
            </div>
          ) : problems.map((problem, i) => (
            <motion.button
              key={problem.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => selectProblem(problem)}
              className={`w-full text-left glass-card p-4 hover:border-white/10 transition-all ${
                selected?.id === problem.id ? 'border-primary-500/30 bg-primary-500/5' : ''
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-white truncate">{problem.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full capitalize ${diffColors[problem.difficulty] || ''}`}>
                      {problem.difficulty}
                    </span>
                    {problem.tags?.map((tag) => (
                      <span key={tag} className="text-[10px] text-white/30 bg-white/5 px-1.5 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-white/20">
                  <Zap size={12} /> {problem.karma || 10}
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Editor Panel */}
        <div className="lg:col-span-3 flex flex-col">
          {selected ? (
            <>
              {/* Problem Description */}
              <div className="glass-card p-5 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-bold text-white">{selected.title}</h2>
                  <span className={`badge-pill capitalize ${diffColors[selected.difficulty] || ''}`}>
                    {selected.difficulty}
                  </span>
                </div>
                <div className="text-sm text-white/50 leading-relaxed whitespace-pre-wrap">
                  {selected.description}
                </div>
                {selected.examples && (
                  <div className="mt-4 space-y-2">
                    {selected.examples.map((ex, i) => (
                      <div key={i} className="bg-surface-950 rounded-lg p-3 text-xs font-mono">
                        <p className="text-white/40">Input: <span className="text-white/70">{ex.input}</span></p>
                        <p className="text-white/40">Output: <span className="text-emerald-400">{ex.output}</span></p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Code Editor */}
              <div className="glass-card flex-1 flex flex-col overflow-hidden">
                {/* Editor toolbar */}
                <div className="flex items-center justify-between p-3 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    {languages.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setLanguage(lang)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                          language === lang ? 'bg-primary-500/20 text-primary-400' : 'text-white/40 hover:text-white/60'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setCode(selected.starterCode || '')}
                    className="text-white/30 hover:text-white/60 transition-colors"
                    title="Reset code"
                  >
                    <RotateCcw size={14} />
                  </button>
                </div>

                {/* Code area */}
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="flex-1 bg-transparent text-sm font-mono text-white/80 p-4 resize-none focus:outline-none placeholder-white/20 min-h-[250px]"
                  placeholder="Write your solution..."
                  spellCheck={false}
                />

                {/* Submit bar */}
                <div className="flex items-center justify-between p-3 border-t border-white/5">
                  <div className="text-xs text-white/30">
                    {language} • {code.split('\n').length} lines
                  </div>
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="btn-primary text-sm px-5 py-2 flex items-center gap-2"
                  >
                    {submitting ? (
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                      <><Send size={14} /> Submit</>
                    )}
                  </button>
                </div>
              </div>

              {/* Result */}
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`glass-card p-4 mt-4 border-l-4 ${
                    result.passed ? 'border-l-emerald-500' : 'border-l-red-500'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {result.passed ? (
                      <CheckCircle2 size={18} className="text-emerald-400" />
                    ) : (
                      <Code2 size={18} className="text-red-400" />
                    )}
                    <span className={`font-semibold text-sm ${result.passed ? 'text-emerald-400' : 'text-red-400'}`}>
                      {result.passed ? 'All Tests Passed!' : 'Tests Failed'}
                    </span>
                  </div>
                  <p className="text-xs text-white/40">
                    {result.testCasesPassed || 0}/{result.totalTestCases || 0} test cases passed
                    {result.karma && ` • +${result.karma} karma earned`}
                  </p>
                </motion.div>
              )}
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center glass-card">
              <div className="text-center">
                <Code2 size={48} className="text-white/10 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white/40">Select a problem</h3>
                <p className="text-sm text-white/20 mt-1">Choose a problem from the list to start coding</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
