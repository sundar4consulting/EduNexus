import { Router } from 'express';
import prisma from '../config/database.js';
import { getKarmaLevel } from '../utils/karma.js';

const router = Router();

// GET /api/leaderboard
router.get('/', async (req, res, next) => {
  try {
    const { period = 'all', branch, limit = 50 } = req.query;
    const where = {};
    if (branch) where.branch = branch;

    const users = await prisma.user.findMany({
      where,
      select: {
        id: true, name: true, avatarUrl: true, branch: true,
        karmaPoints: true, xp: true, level: true, currentStreak: true,
        college: { select: { name: true } },
        _count: {
          select: { certificates: true, codeSubmissions: true },
        },
      },
      orderBy: { karmaPoints: 'desc' },
      take: parseInt(limit),
    });

    const leaderboard = users.map((user, index) => ({
      rank: index + 1,
      ...user,
      karmaLevel: getKarmaLevel(user.karmaPoints),
    }));

    res.json(leaderboard);
  } catch (error) {
    next(error);
  }
});

export default router;
