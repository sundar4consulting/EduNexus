import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User, Mail, BookOpen, Calendar, Award, Trophy, Flame,
  Edit3, Save, X, Camera, MapPin, Code2, Target, Star, Shield
} from 'lucide-react';
import { useAuthStore } from '../store';
import { userAPI } from '../services/api';
import toast from 'react-hot-toast';

export default function Profile() {
  const { user, updateUser } = useAuthStore();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    branch: user?.branch || '',
    yearOfStudy: user?.yearOfStudy || '',
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await userAPI.updateProfile(form);
      updateUser(res.data);
      toast.success('Profile updated!');
      setEditing(false);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  const xpPercent = user ? Math.min(((user.xp % 1000) / 1000) * 100, 100) : 0;

  const stats = [
    { label: 'Karma', value: user?.karma || 0, icon: Trophy, color: 'text-amber-400' },
    { label: 'Level', value: user?.level || 1, icon: Star, color: 'text-primary-400' },
    { label: 'Streak', value: `${user?.streak || 0}d`, icon: Flame, color: 'text-orange-400' },
    { label: 'XP', value: user?.xp || 0, icon: Target, color: 'text-emerald-400' },
  ];

  const badges = user?.badges || [];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="glass-card overflow-hidden">
        {/* Cover */}
        <div className="h-32 sm:h-40 bg-gradient-to-r from-primary-500/20 via-surface-900 to-accent-500/20 relative">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
        </div>

        <div className="px-6 sm:px-8 pb-6 -mt-12 relative">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-3xl font-bold shadow-glow-primary border-4 border-surface-950">
                {user?.name?.charAt(0) || 'U'}
              </div>
              {user?.tier && user.tier !== 'FREE' && (
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center">
                  <Crown size={12} className="text-white" />
                </div>
              )}
            </div>

            <div className="flex-1">
              {editing ? (
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input-field text-lg font-bold w-full max-w-xs"
                />
              ) : (
                <h1 className="text-2xl font-bold font-display text-white">{user?.name}</h1>
              )}
              <div className="flex items-center gap-3 mt-1 text-sm text-white/40">
                <span className="flex items-center gap-1"><Mail size={13} /> {user?.email}</span>
                {user?.college && <span className="flex items-center gap-1"><MapPin size={13} /> {user.college.name}</span>}
              </div>
            </div>

            <button
              onClick={editing ? handleSave : () => setEditing(true)}
              disabled={saving}
              className={editing ? 'btn-primary text-sm px-4 py-2 flex items-center gap-2' : 'bg-white/5 border border-white/10 text-white/60 hover:text-white px-4 py-2 rounded-xl text-sm flex items-center gap-2 transition-all'}
            >
              {saving ? (
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : editing ? (
                <><Save size={14} /> Save</>
              ) : (
                <><Edit3 size={14} /> Edit Profile</>
              )}
            </button>
          </div>

          {/* Bio */}
          <div className="mt-4">
            {editing ? (
              <textarea
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                placeholder="Write a short bio..."
                className="input-field w-full min-h-[80px] resize-y text-sm"
              />
            ) : (
              <p className="text-sm text-white/40">{user?.bio || 'No bio yet. Tell others about yourself!'}</p>
            )}
          </div>

          {/* Branch & Year (editable) */}
          {editing && (
            <div className="flex gap-3 mt-3">
              <input
                type="text"
                value={form.branch}
                onChange={(e) => setForm({ ...form, branch: e.target.value })}
                placeholder="Branch (e.g., CSE)"
                className="input-field text-sm w-40"
              />
              <select
                value={form.yearOfStudy}
                onChange={(e) => setForm({ ...form, yearOfStudy: e.target.value })}
                className="input-field text-sm w-32"
              >
                <option value="">Year</option>
                {[1, 2, 3, 4].map(y => <option key={y} value={y}>{y}</option>)}
              </select>
              <button onClick={() => setEditing(false)} className="text-white/30 hover:text-white/50">
                <X size={18} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-4 text-center"
          >
            <stat.icon size={22} className={`${stat.color} mx-auto mb-2`} />
            <p className="text-xl font-bold text-white">{stat.value}</p>
            <p className="text-xs text-white/30">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* XP Progress */}
      <div className="glass-card p-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-white">Experience Points</h3>
          <span className="text-xs text-white/40">Level {user?.level || 1} → {(user?.level || 1) + 1}</span>
        </div>
        <div className="h-3 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${xpPercent}%` }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-primary-500 via-accent-500 to-neon-cyan rounded-full"
          />
        </div>
        <p className="text-xs text-white/25 mt-1">{user?.xp || 0} / {((user?.level || 1) * 1000)} XP</p>
      </div>

      {/* Badges */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Shield size={18} className="text-primary-400" /> Badges & Achievements
        </h3>
        {badges.length > 0 ? (
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
            {badges.map((badge, i) => (
              <div key={i} className="text-center group">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center mx-auto mb-2 text-2xl group-hover:scale-110 transition-transform">
                  {badge.badge?.icon || '🏆'}
                </div>
                <p className="text-xs font-medium text-white/60 truncate">{badge.badge?.name || badge.name}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Award size={40} className="text-white/10 mx-auto mb-3" />
            <p className="text-sm text-white/30">No badges yet. Keep learning to earn them!</p>
          </div>
        )}
      </div>

      {/* Info Cards */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-white mb-3">Account Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-white/30">Role</span>
              <span className="text-white/60 capitalize">{user?.role?.toLowerCase() || 'Student'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/30">Tier</span>
              <span className={`font-medium ${user?.tier === 'PRO' ? 'text-primary-400' : user?.tier === 'ELITE' ? 'text-amber-400' : 'text-white/60'}`}>
                {user?.tier || 'FREE'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/30">Branch</span>
              <span className="text-white/60">{user?.branch || '—'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/30">Year</span>
              <span className="text-white/60">{user?.yearOfStudy || '—'}</span>
            </div>
          </div>
        </div>
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-white mb-3">Activity Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-white/30">Member since</span>
              <span className="text-white/60">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/30">Total Karma</span>
              <span className="text-amber-400 font-medium">{user?.karma || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/30">Best Streak</span>
              <span className="text-orange-400">{user?.streak || 0} days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/30">Problems Solved</span>
              <span className="text-emerald-400">{user?.problemsSolved || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Crown({ size, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M2 20h20M4 17l2-12 5 5 2-6 2 6 5-5 2 12H4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
