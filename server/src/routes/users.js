import { Router } from 'express';
import prisma from '../config/database.js';
import { authenticate } from '../middleware/auth.js';
import { getKarmaLevel } from '../utils/karma.js';

const router = Router();

// GET /api/users/profile/:id
router.get('/profile/:id', async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      select: {
        id: true, name: true, email: true, avatarUrl: true, role: true,
        branch: true, yearOfStudy: true, bio: true, linkedinUrl: true,
        githubUrl: true, karmaPoints: true, xp: true, level: true,
        currentStreak: true, longestStreak: true, subscriptionTier: true,
        createdAt: true,
        badges: { include: { badge: true } },
        _count: {
          select: {
            enrollments: true,
            certificates: true,
            codeSubmissions: true,
            forumPosts: true,
          },
        },
      },
    });
    if (!user) return res.status(404).json({ error: 'User not found.' });

    const karmaLevel = getKarmaLevel(user.karmaPoints);
    res.json({ ...user, karmaLevel });
  } catch (error) {
    next(error);
  }
});

// PUT /api/users/profile
router.put('/profile', authenticate, async (req, res, next) => {
  try {
    const { name, bio, branch, yearOfStudy, linkedinUrl, githubUrl, phone } = req.body;
    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: { name, bio, branch, yearOfStudy, linkedinUrl, githubUrl, phone },
      select: {
        id: true, name: true, email: true, avatarUrl: true, role: true,
        branch: true, yearOfStudy: true, bio: true, linkedinUrl: true,
        githubUrl: true, karmaPoints: true, xp: true, level: true,
        subscriptionTier: true,
      },
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// GET /api/users/dashboard
router.get('/dashboard', authenticate, async (req, res, next) => {
  try {
    const userId = req.user.id;

    const [enrollments, recentActivity, karmaLogs, stats] = await Promise.all([
      prisma.enrollment.findMany({
        where: { userId },
        include: { course: { select: { id: true, title: true, thumbnailUrl: true, category: true } } },
        orderBy: { enrolledAt: 'desc' },
        take: 6,
      }),
      prisma.lessonProgress.findMany({
        where: { userId, completed: true },
        include: { lesson: { select: { title: true, type: true } } },
        orderBy: { completedAt: 'desc' },
        take: 10,
      }),
      prisma.karmaLog.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 20,
      }),
      prisma.user.findUnique({
        where: { id: userId },
        select: {
          karmaPoints: true, xp: true, level: true,
          currentStreak: true, longestStreak: true,
          _count: {
            select: {
              enrollments: true,
              certificates: true,
              codeSubmissions: true,
              quizAttempts: true,
            },
          },
        },
      }),
    ]);

    const karmaLevel = getKarmaLevel(stats.karmaPoints);

    res.json({
      enrollments,
      recentActivity,
      karmaLogs,
      stats: { ...stats, karmaLevel },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
