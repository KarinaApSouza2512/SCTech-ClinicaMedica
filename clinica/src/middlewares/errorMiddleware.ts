import { NextFunction, Request, Response } from 'express';
import { env } from '../config/env';
import { AppError } from '../utils/AppError';

interface ErrorResponseBody {
  status: 'error';
  statusCode: number;
  message: string;
  details?: unknown;
}

export function notFoundMiddleware(request: Request, _response: Response, next: NextFunction): void {
  next(AppError.notFound(`Rota nao encontrada: ${request.method} ${request.originalUrl}`));
}

export function errorMiddleware(
  error: unknown,
  _request: Request,
  response: Response,
  _next: NextFunction,
): void {
  if (error instanceof AppError) {
    const body: ErrorResponseBody = {
      status: 'error',
      statusCode: error.statusCode,
      message: error.message,
    };

    if (error.details !== undefined) {
      body.details = error.details;
    }

    response.status(error.statusCode).json(body);
    return;
  }

  if (env.nodeEnv === 'development') {
    console.error(error);
  }

  const body: ErrorResponseBody = {
    status: 'error',
    statusCode: 500,
    message: 'Erro interno do servidor',
  };

  response.status(500).json(body);
}
