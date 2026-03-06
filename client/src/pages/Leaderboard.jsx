import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Flame, Star, TrendingUp, Crown, ChevronUp, Search } from 'lucide-react';
import { leaderboardAPI } from '../services/api';
import { useAuthStore } from '../store';

const periods = ['all', 'weekly', 'monthly'];

export default function Leaderboard() {
  const { user } = useAuthStore();
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('all');

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await leaderboardAPI.getGlobal({ period });
        setLeaders(res.data.leaderboard || res.data || []);
      } catch {
        setLeaders([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [period]);

  const rankMedals = ['🥇', '🥈', '🥉'];
  const rankColors = [
    'from-amber-500/20 to-yellow-500/20 border-amber-500/30',
    'from-gray-300/20 to-gray-400/20 border-gray-400/30',
    'from-amber-700/20 to-orange-700/20 border-amber-700/30',
  ];

  const tierBg = {
    FREE: 'bg-gray-500/10 text-gray-400',
    PRO: 'bg-primary-500/10 text-primary-400',
    ELITE: 'bg-amber-500/10 text-amber-400',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500/10 via-surface-900 to-primary-500/10 border border-white/5 p-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px]" />
        <div className="relative flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Crown size={18} className="text-amber-400" />
              <span className="text-xs font-medium text-amber-400">Global Rankings</span>
            </div>
            <h1 className="text-3xl font-bold font-display text-white">Leaderboard</h1>
            <p className="text-white/40 mt-1">Top performers ranked by karma points</p>
          </div>
          <div className="flex items-center gap-1 bg-white/5 rounded-xl p-1">
            {periods.map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-4 py-2 rounded-lg text-xs font-medium capitalize transition-all ${
                  period === p ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/60'
                }`}
              >
                {p === 'all' ? 'All Time' : p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Top 3 Podium */}
      {!loading && leaders.length >= 3 && (
        <div className="grid grid-cols-3 gap-4">
          {[1, 0, 2].map((idx) => {
            const leader = leaders[idx];
            if (!leader) return null;
            return (
              <motion.div
                key={leader.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15 }}
                className={`glass-card p-5 text-center border ${rankColors[idx]} ${idx === 0 ? 'sm:-mt-4' : ''}`}
              >
                <div className="text-3xl mb-2">{rankMedals[idx]}</div>
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-lg mx-auto mb-2">
                  {leader.name?.charAt(0)}
                </div>
                <h3 className="text-sm font-bold text-white truncate">{leader.name}</h3>
                <p className="text-xs text-white/30">{leader.college?.name || 'Independent'}</p>
                <div className="mt-3 flex items-center justify-center gap-1.5">
                  <Trophy size={14} className="text-amber-400" />
                  <span className="text-lg font-bold text-amber-400">{leader.karma?.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-center gap-2 mt-1 text-xs text-white/30">
                  <span>Lvl {leader.level}</span>
                  <span>•</span>
                  <span className="flex items-center gap-0.5"><Flame size={11} className="text-orange-400" />{leader.streak}d</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Full Rankings Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left text-xs font-medium text-white/30 px-5 py-3 w-16">Rank</th>
                <th className="text-left text-xs font-medium text-white/30 px-5 py-3">Student</th>
                <th className="text-left text-xs font-medium text-white/30 px-5 py-3 hidden sm:table-cell">College</th>
                <th className="text-center text-xs font-medium text-white/30 px-5 py-3">Level</th>
                <th className="text-center text-xs font-medium text-white/30 px-5 py-3 hidden sm:table-cell">Streak</th>
                <th className="text-right text-xs font-medium text-white/30 px-5 py-3">Karma</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(10)].map((_, i) => (
                  <tr key={i} className="border-b border-white/3">
                    <td colSpan={6} className="p-4"><div className="h-4 bg-white/5 rounded animate-pulse" /></td>
                  </tr>
                ))
              ) : leaders.map((leader, i) => (
                <motion.tr
                  key={leader.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className={`border-b border-white/3 hover:bg-white/3 transition-colors ${
                    leader.id === user?.id ? 'bg-primary-500/5' : ''
                  }`}
                >
                  <td className="px-5 py-3">
                    {i < 3 ? (
                      <span className="text-xl">{rankMedals[i]}</span>
                    ) : (
                      <span className="text-sm font-bold text-white/40">#{i + 1}</span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500/40 to-accent-500/40 flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {leader.name?.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">
                          {leader.name}
                          {leader.id === user?.id && <span className="text-xs text-primary-400 ml-2">(You)</span>}
                        </p>
                        <p className="text-[11px] text-white/25">{leader.branch || 'CSE'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 hidden sm:table-cell">
                    <span className="text-xs text-white/30">{leader.college?.name || '—'}</span>
                  </td>
                  <td className="px-5 py-3 text-center">
                    <span className="text-xs font-bold text-primary-400 bg-primary-500/10 px-2 py-0.5 rounded-full">
                      {leader.level}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-center hidden sm:table-cell">
                    <span className="flex items-center justify-center gap-1 text-xs text-white/40">
                      <Flame size={12} className="text-orange-400" /> {leader.streak}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <span className="text-sm font-bold text-amber-400">{leader.karma?.toLocaleString()}</span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
