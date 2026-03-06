import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Clock, Users, Star, Play, Lock, CheckCircle2,
  ChevronDown, ChevronRight, Award, Zap, ArrowLeft, FileText, Code2
} from 'lucide-react';
import { courseAPI } from '../services/api';
import { useAuthStore } from '../store';
import toast from 'react-hot-toast';

export default function CourseDetail() {
  const { slug } = useParams();
  const { user, isAuthenticated } = useAuthStore();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [openModules, setOpenModules] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const res = await courseAPI.getBySlug(slug);
        setCourse(res.data);
        // Open first module by default
        if (res.data?.modules?.[0]) {
          setOpenModules({ [res.data.modules[0].id]: true });
        }
      } catch {
        setCourse(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  const handleEnroll = async () => {
    if (!isAuthenticated) { toast.error('Please login first'); return; }
    setEnrolling(true);
    try {
      await courseAPI.enroll(course.id);
      toast.success('Enrolled successfully! 🎉');
      setCourse(prev => ({ ...prev, isEnrolled: true }));
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to enroll');
    } finally {
      setEnrolling(false);
    }
  };

  const toggleModule = (id) => {
    setOpenModules((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const lessonIcon = (type) => {
    switch (type) {
      case 'VIDEO': return <Play size={14} className="text-primary-400" />;
      case 'CODING': return <Code2 size={14} className="text-emerald-400" />;
      default: return <FileText size={14} className="text-blue-400" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-3 border-primary-500/20 border-t-primary-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-white">Course not found</h2>
        <Link to="/courses" className="text-primary-400 text-sm mt-2 inline-block">← Back to courses</Link>
      </div>
    );
  }

  const tierColors = { FREE: 'tier-free', PRO: 'tier-pro', ELITE: 'tier-elite' };
  const totalLessons = course.modules?.reduce((sum, m) => sum + (m.lessons?.length || 0), 0) || 0;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Breadcrumb */}
      <Link to="/courses" className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white/60 transition-colors">
        <ArrowLeft size={16} /> Back to Courses
      </Link>

      {/* Hero Section */}
      <div className="glass-card overflow-hidden">
        <div className="relative h-48 sm:h-56 bg-gradient-to-br from-primary-500/20 via-surface-900 to-accent-500/20 flex items-center justify-center">
          <BookOpen size={64} className="text-white/5" />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-950/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className={`badge-pill ${tierColors[course.tier] || 'tier-free'}`}>{course.tier}</span>
              <span className="badge-pill bg-white/10 text-white/60 capitalize">{course.difficulty}</span>
              <span className="badge-pill bg-primary-500/10 text-primary-400">{course.category}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">{course.title}</h1>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <p className="text-white/50 leading-relaxed">{course.description}</p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 mt-6 text-sm text-white/40">
            <span className="flex items-center gap-1.5"><Clock size={16} /> {course.duration || 8} hours</span>
            <span className="flex items-center gap-1.5"><BookOpen size={16} /> {totalLessons} lessons</span>
            <span className="flex items-center gap-1.5"><Users size={16} /> {course._count?.enrollments || 0} students</span>
            <span className="flex items-center gap-1.5"><Star size={16} className="text-amber-400" /> {course.rating || '4.5'}</span>
          </div>

          {/* Instructor */}
          {course.instructor && (
            <div className="flex items-center gap-3 mt-6 p-4 bg-white/3 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-sm">
                {course.instructor.name?.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium text-white">{course.instructor.name}</p>
                <p className="text-xs text-white/40">Instructor</p>
              </div>
            </div>
          )}

          {/* Enroll Button */}
          <div className="mt-6">
            {course.isEnrolled ? (
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 size={20} />
                <span className="font-medium">You're enrolled in this course</span>
              </div>
            ) : (
              <button
                onClick={handleEnroll}
                disabled={enrolling}
                className="btn-primary px-8 py-3 text-base flex items-center gap-2"
              >
                {enrolling ? (
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <><Zap size={18} /> Enroll Now — {course.tier === 'FREE' ? 'Free' : 'Pro'}</>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Learning Outcomes */}
      {course.outcomes && course.outcomes.length > 0 && (
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Award size={20} className="text-primary-400" /> What You'll Learn
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {course.outcomes.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-emerald-400 mt-0.5 shrink-0" />
                <span className="text-sm text-white/60">{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modules & Lessons */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Course Content</h2>
        <div className="space-y-2">
          {course.modules?.map((mod, mIdx) => (
            <div key={mod.id} className="glass-card overflow-hidden">
              <button
                onClick={() => toggleModule(mod.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-white/3 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-primary-500/10 text-primary-400 flex items-center justify-center text-xs font-bold">
                    {mIdx + 1}
                  </span>
                  <div className="text-left">
                    <h3 className="text-sm font-semibold text-white">{mod.title}</h3>
                    <p className="text-xs text-white/30">{mod.lessons?.length || 0} lessons</p>
                  </div>
                </div>
                <ChevronDown
                  size={16}
                  className={`text-white/30 transition-transform ${openModules[mod.id] ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {openModules[mod.id] && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-white/5">
                      {mod.lessons?.map((lesson, lIdx) => (
                        <div
                          key={lesson.id}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-white/3 transition-colors border-b border-white/3 last:border-0"
                        >
                          <span className="text-xs text-white/20 w-5">{lIdx + 1}</span>
                          {lessonIcon(lesson.type)}
                          <span className="text-sm text-white/60 flex-1">{lesson.title}</span>
                          <span className="text-xs text-white/20">{lesson.duration || 10} min</span>
                          {lesson.isFree ? (
                            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">FREE</span>
                          ) : !course.isEnrolled ? (
                            <Lock size={12} className="text-white/20" />
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
