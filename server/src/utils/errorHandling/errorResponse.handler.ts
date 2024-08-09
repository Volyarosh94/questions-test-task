import { Response } from 'express';

export function handleErrorResponse(res: Response, error: any): void {
  const statusCode = error.statusCode || 500;
  const errorType = error.error || 'Error';
  const errorMessage = error.message || 'Internal Server Error';

  res.status(statusCode).json({
    statusCode,
    error: errorType,
    message: errorMessage
  });
};
