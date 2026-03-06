import { Router } from 'express';
import prisma from '../config/database.js';
import { authenticate, optionalAuth } from '../middleware/auth.js';

const router = Router();

// GET /api/problems
router.get('/', optionalAuth, async (req, res, next) => {
  try {
    const { difficulty, category, search, page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const where = {};
    if (difficulty) where.difficulty = difficulty;
    if (category) where.category = category;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { tags: { has: search.toLowerCase() } },
      ];
    }

    const [problems, total] = await Promise.all([
      prisma.codingProblem.findMany({
        where,
        select: {
          id: true, title: true, slug: true, difficulty: true,
          category: true, tags: true, companies: true,
          submissionCount: true, acceptanceRate: true,
        },
        skip,
        take: parseInt(limit),
        orderBy: { submissionCount: 'desc' },
      }),
      prisma.codingProblem.count({ where }),
    ]);

    res.json({
      problems,
      pagination: { page: parseInt(page), limit: parseInt(limit), total, pages: Math.ceil(total / parseInt(limit)) },
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/problems/:slug
router.get('/:slug', optionalAuth, async (req, res, next) => {
  try {
    const problem = await prisma.codingProblem.findUnique({
      where: { slug: req.params.slug },
    });
    if (!problem) return res.status(404).json({ error: 'Problem not found.' });

    // Hide hidden test cases
    if (problem.testCases) {
      problem.testCases = problem.testCases.filter((tc) => !tc.is_hidden);
    }

    let userSubmissions = [];
    if (req.user) {
      userSubmissions = await prisma.codeSubmission.findMany({
        where: { problemId: problem.id, userId: req.user.id },
        orderBy: { submittedAt: 'desc' },
        take: 10,
      });
    }

    res.json({ ...problem, userSubmissions });
  } catch (error) {
    next(error);
  }
});

// POST /api/problems/:id/submit
router.post('/:id/submit', authenticate, async (req, res, next) => {
  try {
    const { language, code } = req.body;
    const problemId = req.params.id;

    // In production, this would send to a sandboxed execution engine
    // For now, we create the submission record
    const submission = await prisma.codeSubmission.create({
      data: {
        problemId,
        userId: req.user.id,
        language,
        code,
        status: 'AC', // Placeholder
        testCasesPassed: 0,
        totalTestCases: 0,
      },
    });

    await prisma.codingProblem.update({
      where: { id: problemId },
      data: { submissionCount: { increment: 1 } },
    });

    res.status(201).json(submission);
  } catch (error) {
    next(error);
  }
});

export default router;
