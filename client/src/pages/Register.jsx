import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, GraduationCap, ArrowRight, Github, Chrome } from 'lucide-react';
import { useAuthStore } from '../store';
import toast from 'react-hot-toast';

const branches = ['CSE', 'IT', 'ECE', 'EEE', 'ME', 'CE', 'AI/ML', 'Data Science'];

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', branch: '', yearOfStudy: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuthStore();
  const navigate = useNavigate();

  const updateForm = (key, value) => setForm({ ...form, [key]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register({
        ...form,
        yearOfStudy: form.yearOfStudy ? parseInt(form.yearOfStudy) : undefined,
      });
      toast.success('Account created! Welcome to EduNexus 🎉');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-accent-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/3 w-[400px] h-[400px] bg-primary-500/8 rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        <div className="glass-card p-8 sm:p-10">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-500 to-primary-500 flex items-center justify-center mx-auto mb-4 shadow-glow-accent">
              <GraduationCap size={28} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold font-display text-white">Create your account</h1>
            <p className="text-sm text-white/40 mt-1">Join 50,000+ engineering students</p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all">
              <Chrome size={18} /> Google
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all">
              <Github size={18} /> GitHub
            </button>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-white/30">or continue with email</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/60 mb-1.5">Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => updateForm('name', e.target.value)}
                className="input-field"
                placeholder="Rahul Verma"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/60 mb-1.5">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => updateForm('email', e.target.value)}
                className="input-field"
                placeholder="you@college.edu"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/60 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => updateForm('password', e.target.value)}
                  className="input-field pr-12"
                  placeholder="Min 6 characters"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-white/60 mb-1.5">Branch</label>
                <select
                  value={form.branch}
                  onChange={(e) => updateForm('branch', e.target.value)}
                  className="input-field"
                >
                  <option value="">Select</option>
                  {branches.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/60 mb-1.5">Year</label>
                <select
                  value={form.yearOfStudy}
                  onChange={(e) => updateForm('yearOfStudy', e.target.value)}
                  className="input-field"
                >
                  <option value="">Select</option>
                  {[1, 2, 3, 4].map((y) => <option key={y} value={y}>{y}st Year</option>)}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-accent w-full flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>Create Account <ArrowRight size={18} /></>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-white/40 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-400 hover:text-primary-300 font-medium">
              Sign in
            </Link>
          </p>

          <p className="text-center text-[11px] text-white/20 mt-4">
            By creating an account, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
