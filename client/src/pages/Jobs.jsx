import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Briefcase, MapPin, Clock, DollarSign, Building2, Search,
  ExternalLink, Filter, ChevronDown, Tag, ArrowRight, Bookmark
} from 'lucide-react';
import { jobAPI } from '../services/api';
import { useAuthStore } from '../store';
import toast from 'react-hot-toast';

const types = ['All', 'INTERNSHIP', 'FULL_TIME', 'PART_TIME', 'FREELANCE'];

export default function Jobs() {
  const { isAuthenticated } = useAuthStore();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [type, setType] = useState('All');
  const [applying, setApplying] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const params = { search };
        if (type !== 'All') params.type = type;
        const res = await jobAPI.getAll(params);
        setJobs(res.data.jobs || res.data || []);
      } catch {
        setJobs([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [search, type]);

  const handleApply = async (jobId) => {
    if (!isAuthenticated) { toast.error('Please login to apply'); return; }
    setApplying(jobId);
    try {
      await jobAPI.apply(jobId, { coverLetter: '' });
      toast.success('Application submitted! 🎉');
      setJobs(prev => prev.map(j => j.id === jobId ? { ...j, hasApplied: true } : j));
    } catch (err) {
      toast.error(err.response?.data?.error || 'Application failed');
    } finally {
      setApplying(null);
    }
  };

  const typeColors = {
    INTERNSHIP: 'text-emerald-400 bg-emerald-500/10',
    FULL_TIME: 'text-primary-400 bg-primary-500/10',
    PART_TIME: 'text-amber-400 bg-amber-500/10',
    FREELANCE: 'text-accent-400 bg-accent-500/10',
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-display text-white">Jobs & Internships</h1>
        <p className="text-white/40 mt-1">Exclusive opportunities for engineering students</p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search companies, roles..."
            className="input-field pl-9 w-full text-sm"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                type === t
                  ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                  : 'bg-white/5 text-white/50 hover:bg-white/10'
              }`}
            >
              {t.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Job Listings */}
      {loading ? (
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="glass-card p-6 animate-pulse">
              <div className="h-5 w-1/3 bg-white/5 rounded mb-3" />
              <div className="h-4 w-2/3 bg-white/5 rounded mb-2" />
              <div className="h-3 w-1/2 bg-white/5 rounded" />
            </div>
          ))}
        </div>
      ) : jobs.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <Briefcase size={48} className="text-white/10 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white/60">No jobs found</h3>
          <p className="text-sm text-white/30 mt-1">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map((job, i) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card p-6 hover:border-white/10 transition-all group"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                {/* Company Logo */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center shrink-0">
                  <Building2 size={22} className="text-white/30" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h2 className="text-base font-bold text-white group-hover:text-primary-400 transition-colors">
                        {job.title}
                      </h2>
                      <p className="text-sm text-white/50">{job.company}</p>
                    </div>
                    <span className={`badge-pill text-[11px] shrink-0 ${typeColors[job.type] || ''}`}>
                      {job.type?.replace('_', ' ')}
                    </span>
                  </div>

                  <p className="text-sm text-white/35 mt-2 line-clamp-2">{job.description}</p>

                  <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-white/30">
                    {job.location && (
                      <span className="flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
                    )}
                    {job.salary && (
                      <span className="flex items-center gap-1"><DollarSign size={12} /> {job.salary}</span>
                    )}
                    {job.deadline && (
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> Apply by {new Date(job.deadline).toLocaleDateString()}
                      </span>
                    )}
                  </div>

                  {job.skills && job.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {job.skills.map((skill) => (
                        <span key={skill} className="text-[10px] text-primary-400/70 bg-primary-500/10 px-2 py-0.5 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Apply button */}
                <div className="sm:self-center shrink-0">
                  {job.hasApplied ? (
                    <span className="text-sm text-emerald-400 font-medium">✓ Applied</span>
                  ) : (
                    <button
                      onClick={() => handleApply(job.id)}
                      disabled={applying === job.id}
                      className="btn-primary text-sm px-5 py-2 whitespace-nowrap"
                    >
                      {applying === job.id ? (
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      ) : 'Apply Now'}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
