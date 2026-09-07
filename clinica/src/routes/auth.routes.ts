import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { LoginDto } from '../dto/LoginDto';
import { RegisterDto } from '../dto/RegisterDto';
import { validateDto } from '../middlewares/validateDto';

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post('/register', validateDto(RegisterDto), authController.register);
authRoutes.post('/login', validateDto(LoginDto), authController.login);

export { authRoutes };
