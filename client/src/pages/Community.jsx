import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MessageSquare, ThumbsUp, MessageCircle, Plus, Search,
  TrendingUp, Clock, Tag, ChevronUp, Send, ArrowRight, User
} from 'lucide-react';
import { forumAPI } from '../services/api';
import { useAuthStore } from '../store';
import toast from 'react-hot-toast';

const categories = ['All', 'general', 'doubt', 'discussion', 'resource', 'announcement'];

export default function Community() {
  const { isAuthenticated, user } = useAuthStore();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '', category: 'general' });
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, [search, category]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (category !== 'All') params.category = category;
      const res = await forumAPI.getPosts(params);
      setPosts(res.data.posts || res.data || []);
    } catch {
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) { toast.error('Please login first'); return; }
    setPosting(true);
    try {
      await forumAPI.createPost(newPost);
      toast.success('Post created!');
      setShowNewPost(false);
      setNewPost({ title: '', content: '', category: 'general' });
      fetchPosts();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to create post');
    } finally {
      setPosting(false);
    }
  };

  const handleUpvote = async (postId) => {
    if (!isAuthenticated) { toast.error('Please login to upvote'); return; }
    try {
      await forumAPI.upvotePost(postId);
      setPosts(prev => prev.map(p =>
        p.id === postId ? { ...p, upvotes: (p.upvotes || 0) + 1 } : p
      ));
    } catch {
      // Already upvoted possibly
    }
  };

  const catColors = {
    general: 'text-blue-400 bg-blue-500/10',
    doubt: 'text-amber-400 bg-amber-500/10',
    discussion: 'text-primary-400 bg-primary-500/10',
    resource: 'text-emerald-400 bg-emerald-500/10',
    announcement: 'text-accent-400 bg-accent-500/10',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display text-white">Community</h1>
          <p className="text-white/40 mt-1">Discuss, share, and learn together</p>
        </div>
        <button
          onClick={() => setShowNewPost(!showNewPost)}
          className="btn-primary text-sm px-5 py-2.5 flex items-center gap-2 self-start"
        >
          <Plus size={16} /> New Post
        </button>
      </div>

      {/* New Post Form */}
      {showNewPost && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6"
        >
          <h2 className="text-lg font-semibold text-white mb-4">Create a Post</h2>
          <form onSubmit={handleCreatePost} className="space-y-4">
            <input
              type="text"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              placeholder="Post title..."
              className="input-field w-full"
              required
            />
            <textarea
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              placeholder="Write your post content..."
              className="input-field w-full min-h-[120px] resize-y"
              required
            />
            <div className="flex items-center justify-between">
              <select
                value={newPost.category}
                onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                className="input-field w-40 text-sm"
              >
                {categories.filter(c => c !== 'All').map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => setShowNewPost(false)} className="text-sm text-white/40 hover:text-white/60 px-4 py-2">
                  Cancel
                </button>
                <button type="submit" disabled={posting} className="btn-primary text-sm px-5 py-2 flex items-center gap-2">
                  {posting ? (
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : (
                    <><Send size={14} /> Post</>
                  )}
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      )}

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search posts..."
            className="input-field pl-9 w-full text-sm"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                category === c
                  ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                  : 'bg-white/5 text-white/50 hover:bg-white/10'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Posts List */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="glass-card p-5 animate-pulse">
              <div className="h-5 w-2/3 bg-white/5 rounded mb-2" />
              <div className="h-3 w-full bg-white/5 rounded mb-1" />
              <div className="h-3 w-1/2 bg-white/5 rounded" />
            </div>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <MessageSquare size={48} className="text-white/10 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white/60">No posts yet</h3>
          <p className="text-sm text-white/30 mt-1">Be the first to start a discussion!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card p-5 hover:border-white/10 transition-all group"
            >
              <div className="flex gap-4">
                {/* Upvote */}
                <div className="flex flex-col items-center gap-1 shrink-0">
                  <button
                    onClick={() => handleUpvote(post.id)}
                    className="p-1 rounded-lg hover:bg-white/5 text-white/30 hover:text-primary-400 transition-colors"
                  >
                    <ChevronUp size={18} />
                  </button>
                  <span className="text-sm font-bold text-white/60">{post.upvotes || 0}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full capitalize ${catColors[post.category] || catColors.general}`}>
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-white group-hover:text-primary-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-white/35 mt-1 line-clamp-2">{post.content}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-white/25">
                    <span className="flex items-center gap-1">
                      <User size={12} /> {post.author?.name || 'Anonymous'}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle size={12} /> {post._count?.comments || post.comments?.length || 0} comments
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Recently'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
