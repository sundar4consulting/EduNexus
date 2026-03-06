import { Router } from 'express';
import prisma from '../config/database.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

// GET /api/forum
router.get('/', async (req, res, next) => {
  try {
    const { category, page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const where = {};
    if (category) where.category = category;

    const [posts, total] = await Promise.all([
      prisma.forumPost.findMany({
        where,
        include: {
          user: { select: { id: true, name: true, avatarUrl: true, karmaPoints: true } },
          _count: { select: { comments: true } },
        },
        skip,
        take: parseInt(limit),
        orderBy: [{ isPinned: 'desc' }, { createdAt: 'desc' }],
      }),
      prisma.forumPost.count({ where }),
    ]);

    res.json({ posts, pagination: { page: parseInt(page), limit: parseInt(limit), total, pages: Math.ceil(total / parseInt(limit)) } });
  } catch (error) {
    next(error);
  }
});

// POST /api/forum
router.post('/', authenticate, async (req, res, next) => {
  try {
    const { title, content, category, tags } = req.body;
    const post = await prisma.forumPost.create({
      data: {
        userId: req.user.id,
        title,
        content,
        category,
        tags: tags || [],
      },
      include: {
        user: { select: { id: true, name: true, avatarUrl: true } },
      },
    });
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
});

// GET /api/forum/:id
router.get('/:id', async (req, res, next) => {
  try {
    const post = await prisma.forumPost.findUnique({
      where: { id: req.params.id },
      include: {
        user: { select: { id: true, name: true, avatarUrl: true, karmaPoints: true } },
        comments: {
          include: {
            user: { select: { id: true, name: true, avatarUrl: true, karmaPoints: true } },
          },
          orderBy: { createdAt: 'asc' },
        },
      },
    });
    if (!post) return res.status(404).json({ error: 'Post not found.' });
    res.json(post);
  } catch (error) {
    next(error);
  }
});

// POST /api/forum/:id/comments
router.post('/:id/comments', authenticate, async (req, res, next) => {
  try {
    const { content } = req.body;
    const comment = await prisma.forumComment.create({
      data: {
        postId: req.params.id,
        userId: req.user.id,
        content,
      },
      include: {
        user: { select: { id: true, name: true, avatarUrl: true } },
      },
    });
    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
});

export default router;
