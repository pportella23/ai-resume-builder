import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../config/database';
import { AppError } from '../middleware/errorHandler';
import { hashPassword, verifyPassword } from '../utils/password';
import { generateTokens } from '../utils/jwt';
import { authenticate, AuthRequest } from '../middleware/auth';
import { asyncHandler } from '../utils/asyncHandler';
import logger from '../config/logger';

const router = Router();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// POST /api/auth/register
router.post(
  '/register',
  asyncHandler(async (req, res) => {
    const { email, password, name } = registerSchema.parse(req.body);

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new AppError(409, 'User with this email already exists');
    }

    const passwordHash = await hashPassword(password);

    const user = await prisma.user.create({
      data: { email, passwordHash, name },
      select: {
        id: true,
        email: true,
        name: true,
        subscriptionStatus: true,
        createdAt: true,
      },
    });

    const { accessToken, refreshToken } = generateTokens({
      userId: user.id,
      email: user.email,
      name: user.name,
    });

    logger.info({ userId: user.id }, 'User registered successfully');

    res.status(201).json({
      success: true,
      data: { user, accessToken, refreshToken },
    });
  })
);

// POST /api/auth/login
router.post(
  '/login',
  asyncHandler(async (req, res) => {
    const { email, password } = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.passwordHash) {
      throw new AppError(401, 'Invalid email or password');
    }

    const isValidPassword = await verifyPassword(password, user.passwordHash);
    if (!isValidPassword) {
      throw new AppError(401, 'Invalid email or password');
    }

    const { accessToken, refreshToken } = generateTokens({
      userId: user.id,
      email: user.email,
      name: user.name,
    });

    logger.info({ userId: user.id }, 'User logged in successfully');

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          subscriptionStatus: user.subscriptionStatus,
        },
        accessToken,
        refreshToken,
      },
    });
  })
);

// GET /api/auth/me
router.get(
  '/me',
  authenticate,
  asyncHandler(async (req: AuthRequest, res) => {
    if (!req.user) {
      throw new AppError(401, 'User not authenticated');
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        avatarUrl: true,
        subscriptionStatus: true,
        usageCount: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new AppError(404, 'User not found');
    }

    res.json({ success: true, data: { user } });
  })
);

export default router;
