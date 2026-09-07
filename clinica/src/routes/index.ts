import { Request, Response, Router } from 'express';
import { AppDataSource } from '../database/data-source';
import { authRoutes } from './auth.routes';

export const router = Router();

router.get('/health', (_request: Request, response: Response) => {
  response.json({
    status: 'ok',
    database: AppDataSource.isInitialized ? 'up' : 'down',
    timestamp: new Date().toISOString(),
  });
});

router.use('/auth', authRoutes);
