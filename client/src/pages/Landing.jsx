import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen, Code2, Trophy, Brain, Briefcase, Users, Calendar, Award,
  Zap, ArrowRight, Star, TrendingUp, Play, ChevronRight, Sparkles,
  GraduationCap, Shield, CheckCircle2
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true },
};

const stats = [
  { value: '200+', label: 'Courses', icon: BookOpen },
  { value: '50K+', label: 'Students', icon: Users },
  { value: '500+', label: 'Problems', icon: Code2 },
  { value: '95%', label: 'Placement Rate', icon: TrendingUp },
];

const features = [
  { icon: BookOpen, title: 'Structured Learning Paths', desc: 'DAG-based learning paths with prerequisites, milestones, and personalized pacing.', color: 'from-blue-500 to-cyan-500' },
  { icon: Code2, title: 'Coding Lab & Judge', desc: 'Browser-based IDE with multi-language support, test cases, and AI-powered code review.', color: 'from-purple-500 to-pink-500' },
  { icon: Brain, title: 'AI-Powered Features', desc: 'Smart study plans, AI mock interviews, doubt resolution bot, and personalized recommendations.', color: 'from-orange-500 to-red-500' },
  { icon: Trophy, title: 'Gamified Learning', desc: 'Karma points, XP levels, streaks, badges, and leaderboards to keep you motivated.', color: 'from-green-500 to-emerald-500' },
  { icon: Briefcase, title: 'Placement Prep', desc: 'Resume builder, mock drives, company-specific tracks, and direct job applications.', color: 'from-amber-500 to-orange-500' },
  { icon: Calendar, title: 'Events & Hackathons', desc: 'Live webinars, workshops, hackathons, and code sprints with industry experts.', color: 'from-pink-500 to-rose-500' },
];

const courses = [
  { title: 'Python for AI & ML', category: 'AI/ML', students: '12.5K', rating: 4.8, tier: 'Free', difficulty: 'Beginner' },
  { title: 'DSA in C++', category: 'Foundation', students: '18.2K', rating: 4.9, tier: 'Free', difficulty: 'Intermediate' },
  { title: 'Deep Learning with PyTorch', category: 'AI/ML', students: '6.8K', rating: 4.7, tier: 'Pro', difficulty: 'Advanced' },
  { title: 'System Design', category: 'Placement', students: '7.8K', rating: 4.9, tier: 'Pro', difficulty: 'Advanced' },
];

const testimonials = [
  { name: 'Arjun Singh', role: 'SDE @ Google', college: 'IIT Bombay', text: 'EduNexus helped me crack my Google interview. The coding lab and mock interviews were incredible.', avatar: 'AS' },
  { name: 'Meera Iyer', role: 'ML Engineer @ Amazon', college: 'NIT Trichy', text: 'The AI/ML path is the best I\'ve seen. Well-structured, practical, and the mentorship was invaluable.', avatar: 'MI' },
  { name: 'Karthik Menon', role: 'Data Scientist @ Flipkart', college: 'BITS Pilani', text: 'From zero to placed in 6 months. The gamification kept me consistent, and the community is amazing.', avatar: 'KM' },
];

export default function Landing() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 pb-16">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[120px] animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent-500/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-cyan/5 rounded-full blur-[150px]" />
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(108,71,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(108,71,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-300 text-sm font-medium mb-8"
            >
              <Sparkles size={16} className="text-neon-cyan" />
              <span>AI-Powered Learning Platform for Engineers</span>
              <ChevronRight size={14} />
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black font-display leading-[1.1] mb-6"
            >
              <span className="text-white">Level Up Your</span>
              <br />
              <span className="gradient-text">Engineering Career</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Master AI/ML, crack placements, and build your career with structured learning paths,
              gamified challenges, and industry mentorship — all in one platform.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              <Link to="/register" className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-500" />
                <div className="relative flex items-center gap-2 px-8 py-4 bg-surface-950 rounded-xl text-white font-semibold text-lg">
                  Start Learning Free
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
              <Link to="/courses" className="flex items-center gap-2 px-8 py-4 text-white/70 hover:text-white font-medium text-lg transition-colors">
                <Play size={20} className="text-primary-400" />
                Explore Courses
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8"
            >
              {stats.map((stat, i) => (
                <div key={i} className="glass-card p-4 sm:p-6 text-center card-hover">
                  <stat.icon size={24} className="text-primary-400 mx-auto mb-2" />
                  <p className="text-2xl sm:text-3xl font-bold font-display gradient-text">{stat.value}</p>
                  <p className="text-sm text-white/40 mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-12 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-white/30 mb-8 tracking-wider uppercase">
            Trusted by students from top engineering colleges
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-40">
            {['IIT Bombay', 'NIT Trichy', 'BITS Pilani', 'VIT Vellore', 'IIT Delhi', 'NIT Warangal', 'IIIT Hyderabad'].map((college) => (
              <span key={college} className="text-lg font-semibold text-white/60 font-display">{college}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="section-title mb-4">
              Everything You Need to <span className="gradient-text">Succeed</span>
            </h2>
            <p className="section-subtitle mx-auto">
              A complete ecosystem combining structured learning, practice, mentorship, and placement preparation.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature, i) => (
              <motion.div
                key={i}
                variants={{ initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.5 }}
                className="group glass-card p-8 card-hover relative overflow-hidden"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon size={24} className="text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{feature.desc}</p>
                {/* Hover glow */}
                <div className={`absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-full blur-3xl transition-opacity duration-500`} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="py-24 relative bg-surface-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="flex items-end justify-between mb-12">
            <div>
              <h2 className="section-title mb-3">
                Popular <span className="gradient-text">Courses</span>
              </h2>
              <p className="section-subtitle">Start your journey with our highest-rated courses</p>
            </div>
            <Link to="/courses" className="hidden md:flex items-center gap-2 text-primary-400 hover:text-primary-300 font-medium transition-colors">
              View All <ArrowRight size={18} />
            </Link>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group glass-card overflow-hidden card-hover"
              >
                {/* Image placeholder */}
                <div className="h-40 bg-gradient-to-br from-primary-600/20 to-accent-600/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.03)_25%,rgba(255,255,255,0.03)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.03)_75%)] bg-[length:20px_20px]" />
                  <div className="absolute top-3 left-3">
                    <span className={`badge-pill ${course.tier === 'Free' ? 'tier-free' : 'tier-pro'} border`}>
                      {course.tier}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className={`badge-pill border ${
                      course.difficulty === 'Beginner' ? 'difficulty-easy' :
                      course.difficulty === 'Intermediate' ? 'difficulty-medium' : 'difficulty-hard'
                    }`}>
                      {course.difficulty}
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                    <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
                      <Play size={24} className="text-white ml-1" />
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <span className="tag mb-3">{course.category}</span>
                  <h3 className="font-semibold text-white mb-3 group-hover:text-primary-300 transition-colors">
                    {course.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-white/40">
                    <div className="flex items-center gap-1">
                      <Star size={12} className="text-amber-400 fill-amber-400" />
                      <span className="text-white/70 font-medium">{course.rating}</span>
                    </div>
                    <span>{course.students} students</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="section-title mb-4">
              Hear From Our <span className="gradient-text">Alumni</span>
            </h2>
            <p className="section-subtitle mx-auto">
              Students who transformed their careers with EduNexus
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-8 card-hover"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={16} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-white/70 leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-sm font-bold text-white">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-white">{t.name}</p>
                    <p className="text-xs text-white/40">{t.role} • {t.college}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="relative rounded-3xl overflow-hidden"
          >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-600" />
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_25%,rgba(255,255,255,0.05)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.05)_75%)] bg-[length:30px_30px]" />

            <div className="relative p-12 sm:p-16 text-center">
              <GraduationCap size={48} className="text-white/80 mx-auto mb-6" />
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-white mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-lg text-white/70 max-w-xl mx-auto mb-8">
                Join 50,000+ engineering students building their future with EduNexus.
                Start for free, upgrade when you're ready.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/register"
                  className="px-8 py-4 bg-white text-primary-600 font-bold rounded-xl hover:bg-white/90 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5"
                >
                  Create Free Account
                </Link>
                <Link
                  to="/pricing"
                  className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all"
                >
                  View Pricing
                </Link>
              </div>

              <div className="flex items-center justify-center gap-6 mt-8 text-sm text-white/60">
                <span className="flex items-center gap-1.5"><CheckCircle2 size={14} /> No credit card required</span>
                <span className="flex items-center gap-1.5"><Shield size={14} /> 7-day money back guarantee</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
