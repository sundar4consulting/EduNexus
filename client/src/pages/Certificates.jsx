import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Download, ExternalLink, Shield, Calendar, CheckCircle2 } from 'lucide-react';
import { useAuthStore } from '../store';

// Mock certificates data since API would return user's certificates
const mockCertificates = [
  {
    id: 1,
    title: 'Data Structures & Algorithms',
    issueDate: '2024-12-15',
    verificationCode: 'EDN-DSA-2024-A7K9',
    grade: 'A+',
    course: 'Advanced DSA Masterclass',
  },
  {
    id: 2,
    title: 'Full-Stack Web Development',
    issueDate: '2024-11-20',
    verificationCode: 'EDN-FSD-2024-B3M2',
    grade: 'A',
    course: 'MERN Stack Bootcamp',
  },
  {
    id: 3,
    title: 'Machine Learning Fundamentals',
    issueDate: '2024-10-05',
    verificationCode: 'EDN-ML-2024-C8P1',
    grade: 'B+',
    course: 'ML & Deep Learning with Python',
  },
];

export default function Certificates() {
  const { user } = useAuthStore();
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCertificates(mockCertificates);
      setLoading(false);
    }, 500);
  }, []);

  const gradeColors = {
    'A+': 'text-amber-400 bg-amber-500/10',
    'A': 'text-emerald-400 bg-emerald-500/10',
    'B+': 'text-primary-400 bg-primary-500/10',
    'B': 'text-blue-400 bg-blue-500/10',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500/10 via-surface-900 to-primary-500/10 border border-white/5 p-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px]" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <Award size={18} className="text-amber-400" />
            <span className="text-xs font-medium text-amber-400">Verified Credentials</span>
          </div>
          <h1 className="text-3xl font-bold font-display text-white">My Certificates</h1>
          <p className="text-white/40 mt-1">Showcase your achievements with blockchain-verified certificates</p>
        </div>
      </div>

      {/* Certificates Grid */}
      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="glass-card p-6 animate-pulse">
              <div className="h-32 bg-white/5 rounded-xl mb-4" />
              <div className="h-5 w-2/3 bg-white/5 rounded mb-2" />
              <div className="h-3 w-1/2 bg-white/5 rounded" />
            </div>
          ))}
        </div>
      ) : certificates.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <Award size={48} className="text-white/10 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white/60">No certificates yet</h3>
          <p className="text-sm text-white/30 mt-1">Complete courses to earn verified certificates!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {certificates.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card overflow-hidden group hover:border-white/10 transition-all"
            >
              {/* Certificate preview */}
              <div className="relative h-44 bg-gradient-to-br from-surface-900 via-primary-500/5 to-surface-900 flex items-center justify-center border-b border-white/5">
                {/* Decorative border */}
                <div className="absolute inset-3 border-2 border-white/5 rounded-lg" />
                <div className="absolute inset-4 border border-white/3 rounded-lg" />

                <div className="text-center z-10">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center mx-auto mb-2 shadow-lg">
                    <Award size={20} className="text-white" />
                  </div>
                  <p className="text-[10px] text-white/30 uppercase tracking-widest">Certificate of Completion</p>
                  <h3 className="text-sm font-bold text-white mt-1">{cert.title}</h3>
                  <p className="text-[11px] text-white/30 mt-1">{user?.name || 'Student'}</p>
                </div>

                {/* Grade badge */}
                <div className="absolute top-3 right-3">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${gradeColors[cert.grade] || gradeColors['B']}`}>
                    {cert.grade}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-base font-semibold text-white">{cert.title}</h3>
                <p className="text-xs text-white/40 mt-0.5">{cert.course}</p>

                <div className="flex items-center gap-3 mt-3 text-xs text-white/30">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} /> {new Date(cert.issueDate).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Shield size={12} className="text-emerald-400" /> Verified
                  </span>
                </div>

                {/* Verification code */}
                <div className="mt-3 p-2.5 bg-surface-950 rounded-lg flex items-center justify-between">
                  <code className="text-xs text-white/40 font-mono">{cert.verificationCode}</code>
                  <CheckCircle2 size={14} className="text-emerald-400" />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-4">
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-primary-500/10 text-primary-400 text-xs font-medium hover:bg-primary-500/20 transition-all">
                    <Download size={13} /> Download
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white/5 text-white/50 text-xs font-medium hover:bg-white/10 transition-all">
                    <ExternalLink size={13} /> Share
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
