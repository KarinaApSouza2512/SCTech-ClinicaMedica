import { Router } from 'express';
import { AdminController } from '../controllers/AdminController';
import { Role } from '../enums/Role';
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';

const adminRoutes = Router();
const adminController = new AdminController();

adminRoutes.get('/ping', authMiddleware, roleMiddleware(Role.ADMIN), adminController.ping);

export { adminRoutes };
