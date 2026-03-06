import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen, Code2, Trophy, Flame, TrendingUp, Clock, Target,
  ChevronRight, Play, Award, Zap, BarChart3, Calendar, Star
} from 'lucide-react';
import { useAuthStore } from '../store';
import { userAPI, courseAPI } from '../services/api';

const statCards = [
  { label: 'Courses Enrolled', icon: BookOpen, color: 'from-primary-500 to-primary-600', key: 'enrolledCourses' },
  { label: 'Problems Solved', icon: Code2, color: 'from-emerald-500 to-emerald-600', key: 'problemsSolved' },
  { label: 'Current Streak', icon: Flame, color: 'from-orange-500 to-red-500', key: 'streak', suffix: ' days' },
  { label: 'Karma Points', icon: Trophy, color: 'from-amber-500 to-yellow-500', key: 'karma' },
];

export default function Dashboard() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [dashRes, courseRes] = await Promise.all([
          userAPI.getDashboard(),
          courseAPI.getAll({ limit: 4 }),
        ]);
        setStats(dashRes.data);
        setEnrollments(dashRes.data?.recentEnrollments || []);
      } catch {
        // fallback
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const xpPercent = user ? Math.min(((user.xp % 1000) / 1000) * 100, 100) : 0;

  const quickActions = [
    { label: 'Continue Learning', icon: Play, path: '/courses', color: 'bg-primary-500/10 text-primary-400' },
    { label: 'Solve Problems', icon: Code2, path: '/coding-lab', color: 'bg-emerald-500/10 text-emerald-400' },
    { label: 'View Events', icon: Calendar, path: '/events', color: 'bg-amber-500/10 text-amber-400' },
    { label: 'Leaderboard', icon: BarChart3, path: '/leaderboard', color: 'bg-accent-500/10 text-accent-400' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-3 border-primary-500/20 border-t-primary-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-500/10 via-surface-900 to-accent-500/10 border border-white/5 p-6 sm:p-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 rounded-full blur-[80px]" />
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">
              Welcome back, {user?.name?.split(' ')[0]}! 👋
            </h1>
            <p className="text-white/50 mt-1">
              Level {user?.level || 1} • {user?.xp || 0} XP • Keep up the great work!
            </p>
            {/* XP Bar */}
            <div className="mt-3 w-full max-w-xs">
              <div className="flex justify-between text-xs text-white/40 mb-1">
                <span>Level {user?.level || 1}</span>
                <span>{Math.round(xpPercent)}% to Level {(user?.level || 1) + 1}</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${xpPercent}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center gap-2">
              <Flame size={20} className="text-orange-400" />
              <span className="text-lg font-bold text-orange-400">{user?.streak || 0}</span>
              <span className="text-xs text-white/40">day streak</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-5 group hover:border-white/10"
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-3 shadow-lg`}>
              <card.icon size={20} className="text-white" />
            </div>
            <p className="text-2xl font-bold text-white">
              {stats?.[card.key] ?? (card.key === 'karma' ? user?.karma : card.key === 'streak' ? user?.streak : 0)}
              {card.suffix || ''}
            </p>
            <p className="text-xs text-white/40 mt-0.5">{card.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              to={action.path}
              className="glass-card p-4 flex items-center gap-3 hover:border-white/10 transition-all group"
            >
              <div className={`w-10 h-10 rounded-xl ${action.color} flex items-center justify-center`}>
                <action.icon size={20} />
              </div>
              <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                {action.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Enrollments / Continue Learning */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Continue Learning</h2>
            <Link to="/courses" className="text-sm text-primary-400 hover:text-primary-300 flex items-center gap-1">
              View all <ChevronRight size={16} />
            </Link>
          </div>
          <div className="space-y-3">
            {enrollments.length > 0 ? enrollments.map((enr, i) => (
              <motion.div
                key={enr.id || i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-4 flex items-center gap-4 hover:border-white/10 transition-all group"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center shrink-0">
                  <BookOpen size={24} className="text-primary-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-white truncate">{enr.course?.title || 'Course'}</h3>
                  <p className="text-xs text-white/40 mt-0.5">{enr.course?.category || 'General'}</p>
                  <div className="mt-2 h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all"
                      style={{ width: `${enr.progress || 0}%` }}
                    />
                  </div>
                </div>
                <span className="text-xs font-medium text-white/50">{enr.progress || 0}%</span>
              </motion.div>
            )) : (
              <div className="glass-card p-8 text-center">
                <BookOpen size={40} className="text-white/10 mx-auto mb-3" />
                <p className="text-white/40 text-sm">No enrollments yet.</p>
                <Link to="/courses" className="btn-primary text-sm mt-4 inline-flex items-center gap-2">
                  Browse Courses <ArrowRight size={16} />
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Achievements Sidebar */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Achievements</h2>
          <div className="glass-card p-5 space-y-4">
            {[
              { icon: Star, label: 'First Course', desc: 'Enroll in your first course', done: (stats?.enrolledCourses || 0) > 0 },
              { icon: Code2, label: 'Code Warrior', desc: 'Solve 10 coding problems', done: (stats?.problemsSolved || 0) >= 10 },
              { icon: Flame, label: 'On Fire', desc: '7-day learning streak', done: (user?.streak || 0) >= 7 },
              { icon: Award, label: 'Rising Star', desc: 'Reach 500 karma points', done: (user?.karma || 0) >= 500 },
              { icon: Zap, label: 'Level Up', desc: 'Reach Level 5', done: (user?.level || 1) >= 5 },
            ].map((ach, i) => (
              <div key={i} className={`flex items-center gap-3 ${ach.done ? '' : 'opacity-40'}`}>
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                  ach.done ? 'bg-primary-500/20 text-primary-400' : 'bg-white/5 text-white/20'
                }`}>
                  <ach.icon size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{ach.label}</p>
                  <p className="text-[11px] text-white/30">{ach.desc}</p>
                </div>
                {ach.done && <Award size={14} className="text-amber-400 ml-auto" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
