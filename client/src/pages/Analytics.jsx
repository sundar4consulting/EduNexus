import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3, Clock, TrendingUp, Target, BookOpen, Code2, Trophy, Flame, Brain
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import { useAuthStore } from '../store';
import { userAPI } from '../services/api';

const weeklyData = [
  { day: 'Mon', hours: 2.5, problems: 3 },
  { day: 'Tue', hours: 1.8, problems: 2 },
  { day: 'Wed', hours: 3.2, problems: 5 },
  { day: 'Thu', hours: 2.1, problems: 1 },
  { day: 'Fri', hours: 4.0, problems: 4 },
  { day: 'Sat', hours: 5.5, problems: 7 },
  { day: 'Sun', hours: 3.0, problems: 3 },
];

const skillData = [
  { subject: 'DSA', A: 80 },
  { subject: 'Web Dev', A: 65 },
  { subject: 'AI/ML', A: 45 },
  { subject: 'System Design', A: 55 },
  { subject: 'Databases', A: 70 },
  { subject: 'DevOps', A: 35 },
];

const performanceData = [
  { month: 'Jan', score: 65 },
  { month: 'Feb', score: 72 },
  { month: 'Mar', score: 68 },
  { month: 'Apr', score: 78 },
  { month: 'May', score: 85 },
  { month: 'Jun', score: 82 },
];

const difficultyBreakdown = [
  { name: 'Easy', value: 45, color: '#10b981' },
  { name: 'Medium', value: 35, color: '#f59e0b' },
  { name: 'Hard', value: 20, color: '#ef4444' },
];

export default function Analytics() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await userAPI.getDashboard();
        setStats(res.data);
      } catch {
        // use defaults
      }
    })();
  }, []);

  const summaryCards = [
    { label: 'Total Study Hours', value: '127h', icon: Clock, color: 'from-primary-500 to-primary-600', change: '+12%' },
    { label: 'Problems Solved', value: stats?.problemsSolved || 42, icon: Code2, color: 'from-emerald-500 to-emerald-600', change: '+8%' },
    { label: 'Quiz Accuracy', value: '78%', icon: Target, color: 'from-amber-500 to-yellow-500', change: '+5%' },
    { label: 'Karma Earned', value: user?.karma || 0, icon: Trophy, color: 'from-accent-500 to-pink-500', change: '+15%' },
  ];

  const customTooltip = ({ active, payload, label }) => {
    if (active && payload?.length) {
      return (
        <div className="bg-surface-900 border border-white/10 rounded-xl px-3 py-2 shadow-xl">
          <p className="text-xs text-white/60 font-medium">{label}</p>
          {payload.map((p, i) => (
            <p key={i} className="text-xs text-white/40">
              {p.name}: <span className="text-white font-medium">{p.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold font-display text-white flex items-center gap-3">
          <BarChart3 size={28} className="text-primary-400" /> Analytics
        </h1>
        <p className="text-white/40 mt-1">Track your learning progress and performance</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center`}>
                <card.icon size={18} className="text-white" />
              </div>
              <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                {card.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-white">{card.value}</p>
            <p className="text-xs text-white/35 mt-0.5">{card.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Weekly Study Time */}
        <div className="glass-card p-6">
          <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
            <Clock size={16} className="text-primary-400" /> Weekly Study Time
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="studyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6c47ff" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6c47ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" stroke="rgba(255,255,255,0.2)" fontSize={12} />
                <YAxis stroke="rgba(255,255,255,0.2)" fontSize={12} />
                <Tooltip content={customTooltip} />
                <Area
                  type="monotone"
                  dataKey="hours"
                  stroke="#6c47ff"
                  strokeWidth={2}
                  fill="url(#studyGrad)"
                  name="Hours"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skill Radar */}
        <div className="glass-card p-6">
          <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
            <Brain size={16} className="text-accent-400" /> Skill Assessment
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={skillData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="subject" stroke="rgba(255,255,255,0.3)" fontSize={11} />
                <PolarRadiusAxis stroke="rgba(255,255,255,0.1)" fontSize={10} />
                <Radar
                  name="Skill"
                  dataKey="A"
                  stroke="#ff2d7a"
                  fill="#ff2d7a"
                  fillOpacity={0.15}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quiz Performance */}
        <div className="glass-card p-6 lg:col-span-2">
          <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
            <TrendingUp size={16} className="text-emerald-400" /> Quiz Performance Trend
          </h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.2)" fontSize={12} />
                <YAxis stroke="rgba(255,255,255,0.2)" fontSize={12} />
                <Tooltip content={customTooltip} />
                <Bar dataKey="score" name="Score" radius={[6, 6, 0, 0]}>
                  {performanceData.map((_, i) => (
                    <Cell key={i} fill={`rgba(108, 71, 255, ${0.4 + i * 0.1})`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Difficulty Breakdown */}
        <div className="glass-card p-6">
          <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
            <Target size={16} className="text-amber-400" /> Problem Difficulty
          </h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={difficultyBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  dataKey="value"
                  stroke="none"
                >
                  {difficultyBreakdown.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={customTooltip} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-2">
            {difficultyBreakdown.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5 text-xs">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-white/40">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Streak Calendar placeholder */}
      <div className="glass-card p-6">
        <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
          <Flame size={16} className="text-orange-400" /> Learning Streak
        </h3>
        <div className="grid grid-cols-7 gap-1.5">
          {[...Array(35)].map((_, i) => {
            const intensity = Math.random();
            return (
              <div
                key={i}
                className={`aspect-square rounded-sm ${
                  intensity > 0.7 ? 'bg-primary-500' :
                  intensity > 0.4 ? 'bg-primary-500/40' :
                  intensity > 0.2 ? 'bg-primary-500/15' :
                  'bg-white/5'
                }`}
                title={`Day ${i + 1}`}
              />
            );
          })}
        </div>
        <div className="flex items-center justify-end gap-2 mt-3">
          <span className="text-[10px] text-white/25">Less</span>
          {[5, 15, 40, 100].map((o) => (
            <div key={o} className={`w-3 h-3 rounded-sm ${
              o === 5 ? 'bg-white/5' : o === 15 ? 'bg-primary-500/15' : o === 40 ? 'bg-primary-500/40' : 'bg-primary-500'
            }`} />
          ))}
          <span className="text-[10px] text-white/25">More</span>
        </div>
      </div>
    </div>
  );
}
