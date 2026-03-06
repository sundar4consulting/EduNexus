import { Router } from 'express';
import prisma from '../config/database.js';
import { authenticate, optionalAuth } from '../middleware/auth.js';

const router = Router();

// GET /api/courses
router.get('/', optionalAuth, async (req, res, next) => {
  try {
    const { category, difficulty, tier, search, page = 1, limit = 12 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = { isPublished: true };
    if (category) where.category = category;
    if (difficulty) where.difficulty = difficulty;
    if (tier) where.tierRequired = tier.toUpperCase();
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { tags: { has: search.toLowerCase() } },
      ];
    }

    const [courses, total] = await Promise.all([
      prisma.course.findMany({
        where,
        include: {
          instructor: { select: { id: true, name: true, avatarUrl: true } },
          _count: { select: { enrollments: true, modules: true } },
        },
        skip,
        take: parseInt(limit),
        orderBy: { enrolledCount: 'desc' },
      }),
      prisma.course.count({ where }),
    ]);

    res.json({
      courses,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/courses/:slug
router.get('/:slug', optionalAuth, async (req, res, next) => {
  try {
    const course = await prisma.course.findUnique({
      where: { slug: req.params.slug },
      include: {
        instructor: { select: { id: true, name: true, avatarUrl: true, bio: true } },
        modules: {
          orderBy: { sortOrder: 'asc' },
          include: {
            lessons: { orderBy: { sortOrder: 'asc' } },
          },
        },
        _count: { select: { enrollments: true } },
      },
    });

    if (!course) return res.status(404).json({ error: 'Course not found.' });

    let enrollment = null;
    if (req.user) {
      enrollment = await prisma.enrollment.findUnique({
        where: { userId_courseId: { userId: req.user.id, courseId: course.id } },
      });
    }

    res.json({ ...course, enrollment });
  } catch (error) {
    next(error);
  }
});

// POST /api/courses/:id/enroll
router.post('/:id/enroll', authenticate, async (req, res, next) => {
  try {
    const courseId = req.params.id;
    const userId = req.user.id;

    const existing = await prisma.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId } },
    });
    if (existing) {
      return res.status(409).json({ error: 'Already enrolled.' });
    }

    const enrollment = await prisma.enrollment.create({
      data: { userId, courseId },
    });

    await prisma.course.update({
      where: { id: courseId },
      data: { enrolledCount: { increment: 1 } },
    });

    res.status(201).json(enrollment);
  } catch (error) {
    next(error);
  }
});

// GET /api/courses/categories/list
router.get('/categories/list', async (_req, res, next) => {
  try {
    const categories = await prisma.course.groupBy({
      by: ['category'],
      _count: { category: true },
      where: { isPublished: true },
    });
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

export default router;
