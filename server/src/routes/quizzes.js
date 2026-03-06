import { Router } from 'express';
import prisma from '../config/database.js';
import { authenticate, optionalAuth } from '../middleware/auth.js';
import { awardKarma } from '../utils/karma.js';

const router = Router();

// GET /api/quizzes
router.get('/', optionalAuth, async (req, res, next) => {
  try {
    const { courseId, type } = req.query;
    const where = { isPublished: true };
    if (courseId) where.courseId = courseId;
    if (type) where.type = type.toUpperCase();

    const quizzes = await prisma.quiz.findMany({
      where,
      include: {
        course: { select: { id: true, title: true } },
        _count: { select: { questions: true, attempts: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(quizzes);
  } catch (error) {
    next(error);
  }
});

// GET /api/quizzes/:id
router.get('/:id', authenticate, async (req, res, next) => {
  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id: req.params.id },
      include: {
        questions: { orderBy: { sortOrder: 'asc' } },
        course: { select: { id: true, title: true } },
      },
    });

    if (!quiz) return res.status(404).json({ error: 'Quiz not found.' });
    res.json(quiz);
  } catch (error) {
    next(error);
  }
});

// POST /api/quizzes/:id/attempt
router.post('/:id/attempt', authenticate, async (req, res, next) => {
  try {
    const { answers, completedAt } = req.body;
    const quizId = req.params.id;
    const userId = req.user.id;

    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: { questions: true },
    });

    if (!quiz) return res.status(404).json({ error: 'Quiz not found.' });

    // Calculate score
    let score = 0;
    let maxScore = 0;
    const gradedAnswers = answers.map((answer) => {
      const question = quiz.questions.find((q) => q.id === answer.questionId);
      if (!question) return { ...answer, isCorrect: false };

      maxScore += question.points;
      const isCorrect = question.correctAnswer === answer.selectedAnswer;
      if (isCorrect) score += question.points;

      return { ...answer, isCorrect };
    });

    const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
    const passed = percentage >= quiz.passingScorePercent;

    const attempt = await prisma.quizAttempt.create({
      data: {
        quizId,
        userId,
        score,
        maxScore,
        percentage,
        passed,
        answers: gradedAnswers,
        completedAt: completedAt || new Date(),
      },
    });

    // Award karma
    let karmaAwarded = 0;
    if (percentage >= 80) {
      karmaAwarded = await awardKarma(userId, percentage === 100 ? 'QUIZ_PERFECT' : 'QUIZ_SCORE_80');
    }

    res.status(201).json({ ...attempt, karmaAwarded });
  } catch (error) {
    next(error);
  }
});

export default router;
