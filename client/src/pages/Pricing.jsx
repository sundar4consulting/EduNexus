import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Zap, Crown, Building2, Sparkles, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../store';

const plans = [
  {
    name: 'Free',
    price: '₹0',
    period: 'forever',
    description: 'Get started with core features',
    color: 'from-gray-500/20 to-gray-600/20',
    borderColor: 'border-white/5',
    icon: Zap,
    features: [
      { text: '5 Free Courses', included: true },
      { text: 'Basic Coding Problems', included: true },
      { text: 'Community Forum Access', included: true },
      { text: 'Leaderboard Access', included: true },
      { text: 'Events Registration', included: true },
      { text: 'AI-Powered Learning', included: false },
      { text: 'Premium Courses', included: false },
      { text: 'Placement Preparation', included: false },
      { text: 'Certificates', included: false },
      { text: 'Priority Support', included: false },
    ],
  },
  {
    name: 'Pro',
    price: '₹299',
    period: '/month',
    description: 'Unlock your full potential',
    color: 'from-primary-500/20 to-primary-600/20',
    borderColor: 'border-primary-500/30',
    icon: Crown,
    popular: true,
    features: [
      { text: 'All Free Features', included: true },
      { text: '100+ Premium Courses', included: true },
      { text: 'Advanced Coding Lab', included: true },
      { text: 'AI Learning Assistant', included: true },
      { text: 'Skill Assessments', included: true },
      { text: 'Resume Builder', included: true },
      { text: 'Course Certificates', included: true },
      { text: 'Mock Interviews', included: true },
      { text: 'Placement Module', included: false },
      { text: 'Institution Dashboard', included: false },
    ],
  },
  {
    name: 'Elite',
    price: '₹599',
    period: '/month',
    description: 'Everything for placement success',
    color: 'from-amber-500/20 to-yellow-500/20',
    borderColor: 'border-amber-500/30',
    icon: Sparkles,
    features: [
      { text: 'All Pro Features', included: true },
      { text: 'Full Placement Module', included: true },
      { text: '1-on-1 Mentoring', included: true },
      { text: 'Company-Specific Prep', included: true },
      { text: 'All Certifications', included: true },
      { text: 'Advanced Analytics', included: true },
      { text: 'Priority Job Access', included: true },
      { text: 'Group Study Rooms', included: true },
      { text: 'Career Counseling', included: true },
      { text: 'Offline Downloads', included: true },
    ],
  },
  {
    name: 'Institution',
    price: 'Custom',
    period: '',
    description: 'For colleges and universities',
    color: 'from-emerald-500/20 to-teal-500/20',
    borderColor: 'border-emerald-500/30',
    icon: Building2,
    features: [
      { text: 'All Elite Features', included: true },
      { text: 'Admin Dashboard', included: true },
      { text: 'Student Analytics', included: true },
      { text: 'Custom Course Upload', included: true },
      { text: 'Faculty Accounts', included: true },
      { text: 'LMS Integration', included: true },
      { text: 'White-label Option', included: true },
      { text: 'API Access', included: true },
      { text: 'Dedicated Support', included: true },
      { text: 'Bulk Licensing', included: true },
    ],
  },
];

export default function Pricing() {
  const { isAuthenticated, user } = useAuthStore();
  const [annual, setAnnual] = useState(false);

  return (
    <div className="space-y-10 py-4">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold font-display text-white">
          Simple, transparent <span className="gradient-text">pricing</span>
        </h1>
        <p className="text-white/40 mt-3 max-w-lg mx-auto">
          Choose the plan that fits your goals. Upgrade anytime to unlock more features.
        </p>

        {/* Billing toggle */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <span className={`text-sm ${!annual ? 'text-white' : 'text-white/40'}`}>Monthly</span>
          <button
            onClick={() => setAnnual(!annual)}
            className="w-12 h-6 rounded-full bg-white/10 relative transition-colors"
          >
            <div className={`w-5 h-5 rounded-full bg-primary-500 absolute top-0.5 transition-transform ${
              annual ? 'translate-x-6' : 'translate-x-0.5'
            }`} />
          </button>
          <span className={`text-sm ${annual ? 'text-white' : 'text-white/40'}`}>
            Annual <span className="text-xs text-emerald-400 font-medium">Save 20%</span>
          </span>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`glass-card p-6 relative overflow-hidden border ${plan.borderColor} ${
              plan.popular ? 'ring-1 ring-primary-500/30' : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0">
                <div className="bg-primary-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">
                  POPULAR
                </div>
              </div>
            )}

            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4`}>
              <plan.icon size={20} className="text-white" />
            </div>

            <h3 className="text-xl font-bold text-white">{plan.name}</h3>
            <p className="text-xs text-white/40 mt-0.5">{plan.description}</p>

            <div className="mt-4 mb-6">
              <span className="text-3xl font-bold text-white">
                {plan.price === 'Custom' ? 'Custom' : annual && plan.price !== '₹0'
                  ? `₹${Math.round(parseInt(plan.price.replace('₹', '')) * 0.8 * 12)}`
                  : plan.price}
              </span>
              <span className="text-sm text-white/30">
                {plan.price === 'Custom' ? '' : annual && plan.price !== '₹0' ? '/year' : plan.period}
              </span>
            </div>

            <button className={`w-full py-2.5 rounded-xl text-sm font-medium transition-all ${
              plan.popular
                ? 'btn-primary'
                : plan.name === 'Elite'
                ? 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/30'
                : 'bg-white/5 text-white/60 hover:bg-white/10 border border-white/10'
            }`}>
              {plan.price === 'Custom' ? 'Contact Sales' : plan.price === '₹0' ? 'Get Started' : 'Upgrade Now'}
            </button>

            <div className="mt-6 space-y-2.5">
              {plan.features.map((feature, j) => (
                <div key={j} className="flex items-center gap-2">
                  {feature.included ? (
                    <Check size={14} className="text-emerald-400 shrink-0" />
                  ) : (
                    <X size={14} className="text-white/15 shrink-0" />
                  )}
                  <span className={`text-xs ${feature.included ? 'text-white/60' : 'text-white/20'}`}>
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* FAQ section */}
      <div className="glass-card p-8 max-w-2xl mx-auto">
        <h2 className="text-lg font-bold text-white text-center mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: 'Can I switch plans anytime?', a: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.' },
            { q: 'Is there a student discount?', a: 'Our pricing is already student-friendly. Plus, .edu email holders get an extra 10% off.' },
            { q: 'What payment methods do you accept?', a: 'We accept UPI, credit/debit cards, net banking, and wallets via Razorpay. EMI available on Pro & Elite.' },
            { q: 'Can I get a refund?', a: 'Yes, we offer a 7-day refund policy if you\'re not satisfied with your subscription.' },
          ].map((faq, i) => (
            <div key={i} className="p-4 bg-white/3 rounded-xl">
              <h3 className="text-sm font-semibold text-white">{faq.q}</h3>
              <p className="text-xs text-white/40 mt-1">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
