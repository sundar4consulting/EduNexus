import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Bell, Menu, X, ChevronDown, LogOut, User, Settings, Zap,
  GraduationCap
} from 'lucide-react';
import { useAuthStore, useUIStore } from '../../store';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { toggleSidebar, toggleSearch } = useUIStore();
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isLanding = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const getKarmaColor = (points) => {
    if (points >= 10000) return 'text-yellow-400';
    if (points >= 5000) return 'text-red-400';
    if (points >= 1500) return 'text-orange-400';
    if (points >= 500) return 'text-purple-400';
    if (points >= 100) return 'text-blue-400';
    return 'text-green-400';
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || !isLanding
          ? 'bg-surface-950/80 backdrop-blur-2xl border-b border-white/5 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Left */}
          <div className="flex items-center gap-4">
            {isAuthenticated && (
              <button onClick={toggleSidebar} className="lg:hidden p-2 text-white/60 hover:text-white transition-colors">
                <Menu size={22} />
              </button>
            )}
            <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center gap-2.5 group">
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-glow-primary group-hover:shadow-lg transition-all duration-300">
                <GraduationCap size={20} className="text-white" />
                <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-xl font-bold font-display tracking-tight">
                <span className="text-white">Edu</span>
                <span className="gradient-text">Nexus</span>
              </span>
            </Link>
          </div>

          {/* Center — public nav links */}
          {!isAuthenticated && (
            <div className="hidden md:flex items-center gap-1">
              {['Features', 'Pricing', 'Courses', 'Events'].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase()}`}
                  className="px-4 py-2 text-sm text-white/60 hover:text-white font-medium rounded-lg hover:bg-white/5 transition-all duration-200"
                >
                  {item}
                </Link>
              ))}
            </div>
          )}

          {/* Right */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                {/* Search */}
                <button onClick={toggleSearch} className="p-2.5 text-white/50 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                  <Search size={18} />
                </button>

                {/* Notifications */}
                <button className="p-2.5 text-white/50 hover:text-white hover:bg-white/5 rounded-xl transition-all relative">
                  <Bell size={18} />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent-500 rounded-full animate-pulse" />
                </button>

                {/* Karma */}
                <div className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 ${getKarmaColor(user?.karmaPoints || 0)}`}>
                  <Zap size={14} />
                  <span className="text-sm font-semibold">{(user?.karmaPoints || 0).toLocaleString()}</span>
                </div>

                {/* Profile dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-white/5 transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-sm font-bold">
                      {user?.name?.charAt(0) || 'U'}
                    </div>
                    <span className="hidden lg:block text-sm font-medium text-white/80 max-w-[120px] truncate">
                      {user?.name}
                    </span>
                    <ChevronDown size={14} className={`text-white/40 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-64 glass-card p-2 shadow-xl"
                      >
                        <div className="p-3 border-b border-white/5 mb-1">
                          <p className="font-semibold text-sm">{user?.name}</p>
                          <p className="text-xs text-white/40">{user?.email}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="badge-pill bg-primary-500/10 text-primary-400 border border-primary-500/20 text-[10px]">
                              {user?.subscriptionTier}
                            </span>
                            <span className="badge-pill bg-white/5 text-white/50 text-[10px]">
                              Level {user?.level}
                            </span>
                          </div>
                        </div>
                        <Link to="/profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors">
                          <User size={16} /> Profile
                        </Link>
                        <Link to="/settings" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors">
                          <Settings size={16} /> Settings
                        </Link>
                        <hr className="border-white/5 my-1" />
                        <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors w-full">
                          <LogOut size={16} /> Sign out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="px-4 py-2 text-sm text-white/70 hover:text-white font-medium transition-colors">
                  Sign in
                </Link>
                <Link to="/register" className="btn-primary text-sm !px-5 !py-2.5">
                  Get Started Free
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
