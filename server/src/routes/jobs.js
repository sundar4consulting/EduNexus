import { Router } from 'express';
import prisma from '../config/database.js';
import { authenticate, optionalAuth } from '../middleware/auth.js';

const router = Router();

// GET /api/jobs
router.get('/', optionalAuth, async (req, res, next) => {
  try {
    const { type, location, search, page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const where = { status: 'active' };
    if (type) where.jobType = type;
    if (location) where.location = { contains: location, mode: 'insensitive' };
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { companyName: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [jobs, total] = await Promise.all([
      prisma.job.findMany({ where, skip, take: parseInt(limit), orderBy: { postedAt: 'desc' } }),
      prisma.job.count({ where }),
    ]);

    res.json({
      jobs,
      pagination: { page: parseInt(page), limit: parseInt(limit), total, pages: Math.ceil(total / parseInt(limit)) },
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/jobs/:id
router.get('/:id', optionalAuth, async (req, res, next) => {
  try {
    const job = await prisma.job.findUnique({ where: { id: req.params.id } });
    if (!job) return res.status(404).json({ error: 'Job not found.' });

    let applied = false;
    if (req.user) {
      const app = await prisma.jobApplication.findUnique({
        where: { jobId_userId: { jobId: job.id, userId: req.user.id } },
      });
      applied = !!app;
    }

    res.json({ ...job, applied });
  } catch (error) {
    next(error);
  }
});

// POST /api/jobs/:id/apply
router.post('/:id/apply', authenticate, async (req, res, next) => {
  try {
    const { resumeUrl, coverNote } = req.body;
    const application = await prisma.jobApplication.create({
      data: {
        jobId: req.params.id,
        userId: req.user.id,
        resumeUrl,
        coverNote,
      },
    });
    res.status(201).json(application);
  } catch (error) {
    next(error);
  }
});

export default router;
