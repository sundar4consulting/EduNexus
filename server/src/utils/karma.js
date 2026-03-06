import prisma from '../config/database.js';

const KARMA_ACTIONS = {
  COMPLETE_LESSON: 5,
  COMPLETE_COURSE: 50,
  COMPLETE_LEARNING_PATH: 200,
  DAILY_LOGIN: 2,
  STREAK_7_DAY: 20,
  STREAK_30_DAY: 100,
  QUIZ_SCORE_80: 10,
  QUIZ_PERFECT: 25,
  WIN_CODING_CHALLENGE: 30,
  HACKATHON_PARTICIPATE: 50,
  HACKATHON_TOP_3: 150,
  COMMUNITY_HELP: 15,
  REFER_FRIEND: 25,
  SUBMIT_ASSIGNMENT: 10,
  PUBLISH_BLOG: 20,
  UPVOTE_RECEIVED: 2,
  BUG_REPORT: 30,
};

export const awardKarma = async (userId, action, metadata = {}) => {
  const points = KARMA_ACTIONS[action];
  if (!points) return;

  await prisma.$transaction([
    prisma.user.update({
      where: { id: userId },
      data: { karmaPoints: { increment: points } },
    }),
    prisma.karmaLog.create({
      data: {
        userId,
        action,
        points,
        metadata,
      },
    }),
  ]);

  return points;
};

export const getKarmaLevel = (karmaPoints) => {
  if (karmaPoints >= 10000) return { name: 'Legend', color: '#FFD700', emoji: '🏆' };
  if (karmaPoints >= 5000) return { name: 'Master', color: '#EF4444', emoji: '🔴' };
  if (karmaPoints >= 1500) return { name: 'Expert', color: '#F97316', emoji: '🟠' };
  if (karmaPoints >= 500) return { name: 'Achiever', color: '#A855F7', emoji: '🟣' };
  if (karmaPoints >= 100) return { name: 'Learner', color: '#3B82F6', emoji: '🔵' };
  return { name: 'Beginner', color: '#22C55E', emoji: '🟢' };
};

export { KARMA_ACTIONS };
