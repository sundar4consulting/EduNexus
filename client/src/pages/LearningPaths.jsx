import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Route, BookOpen, ChevronRight, Layers, Target, Sparkles } from 'lucide-react';
import { pathAPI } from '../services/api';

const pathGradients = [
  'from-primary-500 to-blue-500',
  'from-emerald-500 to-teal-500',
  'from-amber-500 to-orange-500',
  'from-accent-500 to-pink-500',
];

export default function LearningPaths() {
  const [paths, setPaths] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await pathAPI.getAll();
        setPaths(res.data.paths || res.data || []);
      } catch {
        setPaths([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-3 border-primary-500/20 border-t-primary-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-500/10 via-surface-900 to-emerald-500/10 border border-white/5 p-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 rounded-full blur-[80px]" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={16} className="text-primary-400" />
            <span className="text-xs font-medium text-primary-400">AI-Curated Paths</span>
          </div>
          <h1 className="text-3xl font-bold font-display text-white">Learning Paths</h1>
          <p className="text-white/40 mt-2 max-w-lg">
            Structured roadmaps that guide you from beginner to expert. Follow a curated DAG of courses designed for maximum learning efficiency.
          </p>
        </div>
      </div>

      {/* Paths Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {paths.map((path, i) => (
          <motion.div
            key={path.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link
              to={`/learning-paths/${path.id}`}
              className="glass-card p-6 block group hover:border-white/10 transition-all h-full"
            >
              {/* Path icon */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pathGradients[i % pathGradients.length]} flex items-center justify-center mb-4 shadow-lg group-hover:scale-105 transition-transform`}>
                <Route size={24} className="text-white" />
              </div>

              <h2 className="text-xl font-bold font-display text-white group-hover:text-primary-400 transition-colors">
                {path.title}
              </h2>
              <p className="text-sm text-white/40 mt-2 line-clamp-2">{path.description}</p>

              {/* Stats */}
              <div className="flex items-center gap-4 mt-4 text-xs text-white/30">
                <span className="flex items-center gap-1"><BookOpen size={14} /> {path.courses?.length || path._count?.courses || 0} courses</span>
                <span className="flex items-center gap-1"><Layers size={14} /> {path.difficulty || 'Multi-level'}</span>
                <span className="flex items-center gap-1"><Target size={14} /> {path.estimatedHours || 40}h total</span>
              </div>

              {/* Course nodes preview */}
              {path.courses && path.courses.length > 0 && (
                <div className="mt-5 space-y-2">
                  {path.courses.slice(0, 4).map((pc, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <div className="relative">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          j === 0 ? 'bg-primary-500 text-white' : 'bg-white/10 text-white/40'
                        }`}>
                          {j + 1}
                        </div>
                        {j < Math.min(path.courses.length, 4) - 1 && (
                          <div className="absolute top-6 left-1/2 w-px h-3 bg-white/10 -translate-x-1/2" />
                        )}
                      </div>
                      <span className="text-sm text-white/50">{pc.course?.title || pc.title || `Course ${j + 1}`}</span>
                    </div>
                  ))}
                  {path.courses.length > 4 && (
                    <p className="text-xs text-white/20 pl-9">+{path.courses.length - 4} more courses</p>
                  )}
                </div>
              )}

              <div className="mt-5 flex items-center gap-1 text-sm text-primary-400 font-medium">
                Start Path <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {paths.length === 0 && (
        <div className="glass-card p-12 text-center">
          <Route size={48} className="text-white/10 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white/60">No learning paths available yet</h3>
          <p className="text-sm text-white/30 mt-1">Check back soon for curated learning roadmaps!</p>
        </div>
      )}
    </div>
  );
}
