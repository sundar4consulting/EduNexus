import { Link } from 'react-router-dom';
import { GraduationCap, Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';

const footerLinks = {
  Platform: [
    { label: 'Courses', href: '/courses' },
    { label: 'Learning Paths', href: '/learning-paths' },
    { label: 'Coding Lab', href: '/coding-lab' },
    { label: 'Events', href: '/events' },
    { label: 'Job Board', href: '/jobs' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
    { label: 'Partners', href: '/partners' },
  ],
  Resources: [
    { label: 'Documentation', href: '/docs' },
    { label: 'API Reference', href: '/api' },
    { label: 'Community', href: '/community' },
    { label: 'Status', href: '/status' },
    { label: 'Changelog', href: '/changelog' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Refund Policy', href: '/refund' },
    { label: 'Cookie Policy', href: '/cookies' },
  ],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-surface-950">
      {/* Gradient top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <GraduationCap size={18} className="text-white" />
              </div>
              <span className="text-lg font-bold font-display">
                Edu<span className="gradient-text">Nexus</span>
              </span>
            </Link>
            <p className="text-sm text-white/40 leading-relaxed mb-4">
              AI-Powered EdTech Platform for Engineering Students across India.
            </p>
            <div className="flex items-center gap-3">
              {[Github, Twitter, Linkedin, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-white/40 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} EduNexus. All rights reserved.
          </p>
          <p className="text-xs text-white/30 flex items-center gap-1">
            Made with <Heart size={12} className="text-accent-500" /> in India
          </p>
        </div>
      </div>
    </footer>
  );
}
