import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, BookOpen, Clock, Users, Star, ChevronDown, Grid3X3, List, GraduationCap } from 'lucide-react';
import { courseAPI } from '../services/api';

const categories = ['All', 'Foundation', 'AI/ML', 'Full-Stack', 'Cybersecurity', 'Competitive Programming', 'Placement'];
const difficulties = ['All', 'beginner', 'intermediate', 'advanced'];
const tiers = ['All', 'FREE', 'PRO', 'ELITE'];

export default function Courses() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [category, setCategory] = useState('All');
  const [difficulty, setDifficulty] = useState('All');
  const [tier, setTier] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const params = {};
        if (search) params.search = search;
        if (category !== 'All') params.category = category;
        if (difficulty !== 'All') params.difficulty = difficulty;
        if (tier !== 'All') params.tier = tier;
        const res = await courseAPI.getAll(params);
        setCourses(res.data.courses || res.data || []);
      } catch { setCourses([]); }
      setLoading(false);
    })();
  }, [search, category, difficulty, tier]);

  const tierColors = { FREE: 'tier-free', PRO: 'tier-pro', ELITE: 'tier-elite' };
  const diffColors = { beginner: 'difficulty-beginner', intermediate: 'difficulty-intermediate', advanced: 'difficulty-advanced' };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold font-display text-white">Explore Courses</h1>
        <p className="text-white/40 mt-1">200+ curated courses for engineering students</p>
      </div>

      {/* Search & Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses..."
            className="input-field pl-10 w-full"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white/60 hover:text-white hover:bg-white/10 transition-all"
        >
          <Filter size={16} /> Filters <ChevronDown size={14} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>
        <div className="flex items-center gap-1 bg-white/5 rounded-xl p-1">
          <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-white/40'}`}>
            <Grid3X3 size={16} />
          </button>
          <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-white/40'}`}>
            <List size={16} />
          </button>
        </div>
      </div>

      {/* Filter Chips */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="glass-card p-5 space-y-4">
              <div>
                <label className="text-xs font-medium text-white/40 mb-2 block">Category</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCategory(c)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        category === c
                          ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                          : 'bg-white/5 text-white/50 border border-transparent hover:bg-white/10'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-8">
                <div>
                  <label className="text-xs font-medium text-white/40 mb-2 block">Difficulty</label>
                  <div className="flex flex-wrap gap-2">
                    {difficulties.map((d) => (
                      <button
                        key={d}
                        onClick={() => setDifficulty(d)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                          difficulty === d
                            ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                            : 'bg-white/5 text-white/50 border border-transparent hover:bg-white/10'
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-white/40 mb-2 block">Access Tier</label>
                  <div className="flex flex-wrap gap-2">
                    {tiers.map((t) => (
                      <button
                        key={t}
                        onClick={() => setTier(t)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          tier === t
                            ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                            : 'bg-white/5 text-white/50 border border-transparent hover:bg-white/10'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Courses Grid */}
      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="glass-card p-5 animate-pulse space-y-3">
              <div className="h-40 bg-white/5 rounded-xl" />
              <div className="h-4 w-2/3 bg-white/5 rounded" />
              <div className="h-3 w-1/2 bg-white/5 rounded" />
            </div>
          ))}
        </div>
      ) : courses.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <GraduationCap size={48} className="text-white/10 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white/60">No courses found</h3>
          <p className="text-sm text-white/30 mt-1">Try adjusting your filters</p>
        </div>
      ) : (
        <div className={viewMode === 'grid' ? 'grid sm:grid-cols-2 lg:grid-cols-3 gap-5' : 'space-y-3'}>
          {courses.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={`/courses/${course.slug}`}
                className={`glass-card overflow-hidden group hover:border-white/10 transition-all block ${
                  viewMode === 'list' ? 'flex items-center gap-5 p-4' : ''
                }`}
              >
                {/* Thumbnail */}
                <div className={`relative bg-gradient-to-br from-primary-500/10 to-accent-500/10 flex items-center justify-center ${
                  viewMode === 'list' ? 'w-32 h-24 rounded-xl shrink-0' : 'h-44'
                }`}>
                  <BookOpen size={viewMode === 'list' ? 28 : 40} className="text-white/10" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className={`badge-pill ${tierColors[course.tier] || 'tier-free'}`}>
                      {course.tier}
                    </span>
                  </div>
                  {course.difficulty && (
                    <div className="absolute top-3 right-3">
                      <span className={`badge-pill ${diffColors[course.difficulty] || ''}`}>
                        {course.difficulty}
                      </span>
                    </div>
                  )}
                </div>
                <div className={viewMode === 'list' ? 'flex-1 min-w-0' : 'p-5'}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] font-medium text-primary-400 bg-primary-500/10 px-2 py-0.5 rounded-full">
                      {course.category}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-white group-hover:text-primary-400 transition-colors truncate">
                    {course.title}
                  </h3>
                  <p className="text-xs text-white/35 mt-1 line-clamp-2">{course.description}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-white/30">
                    <span className="flex items-center gap-1"><Clock size={12} /> {course.duration || '8'}h</span>
                    <span className="flex items-center gap-1"><Users size={12} /> {course._count?.enrollments || 0}</span>
                    <span className="flex items-center gap-1"><Star size={12} className="text-amber-400" /> {course.rating || '4.5'}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
