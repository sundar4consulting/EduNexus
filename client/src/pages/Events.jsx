import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar, MapPin, Users, Clock, ExternalLink, Search,
  Wifi, Video, Building2, Tag, ChevronRight
} from 'lucide-react';
import { eventAPI } from '../services/api';
import { useAuthStore } from '../store';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

const typeIcons = {
  HACKATHON: '🏆',
  WORKSHOP: '🔧',
  WEBINAR: '💻',
  MEETUP: '🤝',
  CONFERENCE: '🎤',
};

const statusColors = {
  UPCOMING: 'text-emerald-400 bg-emerald-500/10',
  ONGOING: 'text-amber-400 bg-amber-500/10',
  COMPLETED: 'text-white/40 bg-white/5',
  CANCELLED: 'text-red-400 bg-red-500/10',
};

export default function Events() {
  const { isAuthenticated } = useAuthStore();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [registering, setRegistering] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await eventAPI.getAll({ search });
        setEvents(res.data.events || res.data || []);
      } catch {
        setEvents([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [search]);

  const handleRegister = async (eventId) => {
    if (!isAuthenticated) { toast.error('Please login to register'); return; }
    setRegistering(eventId);
    try {
      await eventAPI.register(eventId);
      toast.success('Registered successfully! 🎉');
      setEvents((prev) =>
        prev.map((e) => e.id === eventId ? { ...e, isRegistered: true } : e)
      );
    } catch (err) {
      toast.error(err.response?.data?.error || 'Registration failed');
    } finally {
      setRegistering(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display text-white">Events & Hackathons</h1>
          <p className="text-white/40 mt-1">Participate in workshops, hackathons, and tech meetups</p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search events..."
            className="input-field pl-9 w-full text-sm"
          />
        </div>
      </div>

      {/* Events Grid */}
      {loading ? (
        <div className="grid md:grid-cols-2 gap-5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="glass-card p-6 animate-pulse space-y-4">
              <div className="h-5 w-1/3 bg-white/5 rounded" />
              <div className="h-4 w-2/3 bg-white/5 rounded" />
              <div className="h-3 w-1/2 bg-white/5 rounded" />
            </div>
          ))}
        </div>
      ) : events.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <Calendar size={48} className="text-white/10 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white/60">No upcoming events</h3>
          <p className="text-sm text-white/30 mt-1">Check back soon for new events!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {events.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card overflow-hidden hover:border-white/10 transition-all group"
            >
              {/* Event accent bar */}
              <div className="h-1 bg-gradient-to-r from-primary-500 to-accent-500" />

              <div className="p-6">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{typeIcons[event.type] || '📅'}</span>
                    <div>
                      <span className="text-[11px] font-medium text-primary-400 bg-primary-500/10 px-2 py-0.5 rounded-full">
                        {event.type}
                      </span>
                    </div>
                  </div>
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${statusColors[event.status] || statusColors.UPCOMING}`}>
                    {event.status}
                  </span>
                </div>

                <h2 className="text-lg font-bold text-white group-hover:text-primary-400 transition-colors">
                  {event.title}
                </h2>
                <p className="text-sm text-white/40 mt-2 line-clamp-2">{event.description}</p>

                <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-white/30">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={13} />
                    {event.startDate ? format(new Date(event.startDate), 'MMM dd, yyyy') : 'TBA'}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} />
                    {event.startDate ? format(new Date(event.startDate), 'hh:mm a') : 'TBA'}
                  </span>
                  {event.location && (
                    <span className="flex items-center gap-1.5">
                      {event.isOnline ? <Wifi size={13} /> : <MapPin size={13} />}
                      {event.location}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5">
                    <Users size={13} />
                    {event._count?.registrations || 0} registered
                  </span>
                </div>

                {event.tags && event.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {event.tags.map((tag) => (
                      <span key={tag} className="text-[10px] text-white/30 bg-white/5 px-2 py-0.5 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-3 mt-5">
                  {event.isRegistered ? (
                    <span className="text-sm text-emerald-400 font-medium flex items-center gap-1.5">
                      ✓ Registered
                    </span>
                  ) : event.status !== 'COMPLETED' && event.status !== 'CANCELLED' ? (
                    <button
                      onClick={() => handleRegister(event.id)}
                      disabled={registering === event.id}
                      className="btn-primary text-sm px-5 py-2"
                    >
                      {registering === event.id ? (
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      ) : 'Register Now'}
                    </button>
                  ) : null}
                  {event.link && (
                    <a href={event.link} target="_blank" rel="noopener"
                      className="text-sm text-white/40 hover:text-white/60 flex items-center gap-1">
                      Details <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
