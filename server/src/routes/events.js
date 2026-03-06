import { Router } from 'express';
import prisma from '../config/database.js';
import { authenticate, optionalAuth } from '../middleware/auth.js';

const router = Router();

// GET /api/events
router.get('/', optionalAuth, async (req, res, next) => {
  try {
    const { type, status, tier } = req.query;
    const where = {};
    if (type) where.type = type;
    if (status) where.status = status.toUpperCase();
    if (tier) where.tierRequired = tier.toUpperCase();

    const events = await prisma.event.findMany({
      where,
      orderBy: { startTime: 'asc' },
      take: 50,
    });

    res.json(events);
  } catch (error) {
    next(error);
  }
});

// GET /api/events/:slug
router.get('/:slug', optionalAuth, async (req, res, next) => {
  try {
    const event = await prisma.event.findUnique({
      where: { slug: req.params.slug },
      include: {
        registrations: req.user
          ? { where: { userId: req.user.id }, take: 1 }
          : false,
      },
    });
    if (!event) return res.status(404).json({ error: 'Event not found.' });
    res.json(event);
  } catch (error) {
    next(error);
  }
});

// POST /api/events/:id/register
router.post('/:id/register', authenticate, async (req, res, next) => {
  try {
    const eventId = req.params.id;
    const userId = req.user.id;

    const event = await prisma.event.findUnique({ where: { id: eventId } });
    if (!event) return res.status(404).json({ error: 'Event not found.' });

    if (event.maxParticipants && event.currentRegistrations >= event.maxParticipants) {
      return res.status(400).json({ error: 'Event is full.' });
    }

    const registration = await prisma.eventRegistration.create({
      data: { eventId, userId },
    });

    await prisma.event.update({
      where: { id: eventId },
      data: { currentRegistrations: { increment: 1 } },
    });

    res.status(201).json(registration);
  } catch (error) {
    next(error);
  }
});

export default router;
