import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../config/database';
import { AppError } from '../middleware/errorHandler';
import { authenticate, AuthRequest } from '../middleware/auth';
import { asyncHandler } from '../utils/asyncHandler';
import logger from '../config/logger';

const router = Router();

const createResumeSchema = z.object({
  originalContent: z.string().min(1),
  jobDescription: z.string().min(1),
  templateUsed: z.string().default('tech-focused'),
});

// All resume routes require authentication
router.use(authenticate);

// GET /api/resumes - Get all resumes for the user
router.get(
  '/',
  asyncHandler(async (req: AuthRequest, res) => {
    if (!req.user) {
      throw new AppError(401, 'User not authenticated');
    }

    const resumes = await prisma.resume.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        originalContent: true,
        jobDescription: true,
        aiGeneratedContent: true,
        templateUsed: true,
        compatibilityScore: true,
        s3FilePath: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.json({ success: true, data: { resumes } });
  })
);

// GET /api/resumes/:id - Get a specific resume
router.get(
  '/:id',
  asyncHandler(async (req: AuthRequest, res) => {
    if (!req.user) {
      throw new AppError(401, 'User not authenticated');
    }

    const { id } = req.params;

    const resume = await prisma.resume.findFirst({
      where: { id, userId: req.user.id },
      select: {
        id: true,
        originalContent: true,
        jobDescription: true,
        aiGeneratedContent: true,
        templateUsed: true,
        compatibilityScore: true,
        s3FilePath: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!resume) {
      throw new AppError(404, 'Resume not found');
    }

    res.json({ success: true, data: { resume } });
  })
);

// POST /api/resumes - Create a new resume
router.post(
  '/',
  asyncHandler(async (req: AuthRequest, res) => {
    if (!req.user) {
      throw new AppError(401, 'User not authenticated');
    }

    const { originalContent, jobDescription, templateUsed } =
      createResumeSchema.parse(req.body);

    const resume = await prisma.resume.create({
      data: {
        userId: req.user.id,
        originalContent,
        jobDescription,
        templateUsed: templateUsed || 'tech-focused',
      },
      select: {
        id: true,
        originalContent: true,
        jobDescription: true,
        templateUsed: true,
        createdAt: true,
      },
    });

    logger.info({ userId: req.user.id, resumeId: resume.id }, 'Resume created');

    res.status(201).json({ success: true, data: { resume } });
  })
);

// DELETE /api/resumes/:id - Delete a resume
router.delete(
  '/:id',
  asyncHandler(async (req: AuthRequest, res) => {
    if (!req.user) {
      throw new AppError(401, 'User not authenticated');
    }

    const { id } = req.params;

    const resume = await prisma.resume.findFirst({
      where: { id, userId: req.user.id },
    });

    if (!resume) {
      throw new AppError(404, 'Resume not found');
    }

    await prisma.resume.delete({ where: { id } });

    logger.info({ userId: req.user.id, resumeId: id }, 'Resume deleted');

    res.json({ success: true, message: 'Resume deleted successfully' });
  })
);

export default router;
