import { Router } from 'express';
import prisma from '../config/database.js';
import { optionalAuth } from '../middleware/auth.js';

const router = Router();

// GET /api/learning-paths
router.get('/', optionalAuth, async (req, res, next) => {
  try {
    const { category, difficulty } = req.query;
    const where = { isPublished: true };
    if (category) where.category = category;
    if (difficulty) where.difficulty = difficulty;

    const paths = await prisma.learningPath.findMany({
      where,
      include: {
        creator: { select: { id: true, name: true, avatarUrl: true } },
        pathCourses: {
          include: {
            course: {
              select: { id: true, title: true, thumbnailUrl: true, difficulty: true, estimatedHours: true },
            },
          },
          orderBy: { sortOrder: 'asc' },
        },
      },
      orderBy: { enrolledCount: 'desc' },
    });

    res.json(paths);
  } catch (error) {
    next(error);
  }
});

// GET /api/learning-paths/:slug
router.get('/:slug', optionalAuth, async (req, res, next) => {
  try {
    const path = await prisma.learningPath.findUnique({
      where: { slug: req.params.slug },
      include: {
        creator: { select: { id: true, name: true, avatarUrl: true } },
        pathCourses: {
          include: {
            course: {
              include: {
                modules: { include: { lessons: true } },
                _count: { select: { enrollments: true } },
              },
            },
          },
          orderBy: { sortOrder: 'asc' },
        },
      },
    });

    if (!path) return res.status(404).json({ error: 'Learning path not found.' });
    res.json(path);
  } catch (error) {
    next(error);
  }
});

export default router;
