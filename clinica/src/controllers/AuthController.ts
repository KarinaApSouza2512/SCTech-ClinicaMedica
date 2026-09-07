import { NextFunction, Request, Response } from 'express';
import { LoginDto } from '../dto/LoginDto';
import { RegisterDto } from '../dto/RegisterDto';
import { AuthService } from '../services/AuthService';

type TypedBody<T> = Request<Record<string, string>, unknown, T>;

export class AuthController {
  private readonly authService = new AuthService();

  register = async (
    request: TypedBody<RegisterDto>,
    response: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const user = await this.authService.register(request.body);
      response.status(201).json(user);
    } catch (error) {
      next(error);
    }
  };

  login = async (
    request: TypedBody<LoginDto>,
    response: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.authService.login(request.body);
      response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}
