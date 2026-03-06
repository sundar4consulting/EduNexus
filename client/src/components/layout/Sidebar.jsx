import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, BookOpen, Route as RouteIcon, Code2, Calendar, Trophy,
  Briefcase, MessageSquare, Award, BarChart3, CreditCard, Users, Sparkles, X
} from 'lucide-react';
import { useAuthStore, useUIStore } from '../../store';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'Courses', icon: BookOpen, path: '/courses' },
  { label: 'Learning Paths', icon: RouteIcon, path: '/learning-paths' },
  { label: 'Coding Lab', icon: Code2, path: '/coding-lab' },
  { label: 'Events', icon: Calendar, path: '/events' },
  { label: 'Leaderboard', icon: Trophy, path: '/leaderboard' },
  { label: 'Jobs', icon: Briefcase, path: '/jobs' },
  { label: 'Community', icon: MessageSquare, path: '/community' },
  { label: 'Certificates', icon: Award, path: '/certificates' },
  { label: 'Analytics', icon: BarChart3, path: '/analytics' },
];

const bottomItems = [
  { label: 'Pricing', icon: CreditCard, path: '/pricing' },
  { label: 'AI Assistant', icon: Sparkles, path: '/ai-assistant' },
];

export default function Sidebar() {
  const location = useLocation();
  const { user } = useAuthStore();
  const { sidebarOpen, setSidebarOpen } = useUIStore();

  const streakDays = user?.currentStreak || 0;
  const xpToNext = ((user?.level || 1) * 500) - (user?.xp || 0) % 500;
  const xpPercent = Math.min(100, (((user?.xp || 0) % 500) / 500) * 100);

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-50 w-[260px] bg-surface-900/95 backdrop-blur-xl border-r border-white/5
        transition-transform duration-300 ease-in-out pt-18
        lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Mobile close button */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden absolute top-5 right-4 p-1.5 text-white/40 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>

        <div className="flex flex-col h-[calc(100%-4.5rem)] px-3 py-4">
          {/* User stats mini card */}
          <div className="glass-card p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">🔥</span>
                <span className="text-sm font-semibold text-white">{streakDays} day streak</span>
              </div>
              <span className="text-xs font-medium text-white/40">Lv.{user?.level || 1}</span>
            </div>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${xpPercent}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
            <p className="text-[10px] text-white/30 mt-1.5">{xpToNext} XP to Level {(user?.level || 1) + 1}</p>
          </div>

          {/* Nav items */}
          <nav className="flex-1 space-y-0.5 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`nav-link text-sm ${isActive ? 'active' : ''}`}
                >
                  <item.icon size={18} className={isActive ? 'text-primary-400' : ''} />
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-indicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-primary-500 rounded-r-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Bottom items */}
          <div className="border-t border-white/5 pt-3 space-y-0.5">
            {bottomItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`nav-link text-sm ${location.pathname === item.path ? 'active' : ''}`}
              >
                <item.icon size={18} className={item.label === 'AI Assistant' ? 'text-neon-cyan' : ''} />
                <span>{item.label}</span>
                {item.label === 'AI Assistant' && (
                  <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20">
                    NEW
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* Upgrade CTA for free users */}
          {user?.subscriptionTier === 'FREE' && (
            <div className="mt-3 p-4 rounded-xl bg-gradient-to-br from-primary-600/20 to-accent-600/20 border border-primary-500/20">
              <p className="text-sm font-semibold text-white mb-1">Upgrade to Pro</p>
              <p className="text-xs text-white/50 mb-3">Unlock all courses, AI features & more</p>
              <Link
                to="/pricing"
                className="block text-center text-sm font-semibold py-2 rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 text-white hover:shadow-glow-primary transition-all"
              >
                ₹299/mo
              </Link>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
