import { Response } from 'express';
import { ApiResponse } from '../types';

export const sendSuccess = <T>(
  res: Response,
  message: string,
  data?: T,
  statusCode: number = 200,
  extra?: Record<string, unknown>
): Response => {
  const payload: ApiResponse<T> & Record<string, unknown> = {
    success: true,
    message,
    ...(data !== undefined ? { data } : {}),
    ...(extra || {}),
  };
  return res.status(statusCode).json(payload);
};

export const sendError = (
  res: Response,
  message: string,
  statusCode: number = 500,
  error?: string | unknown
): Response => {
  const errorDetails = error instanceof Error ? error.message : typeof error === 'string' ? error : undefined;
  const payload: ApiResponse<null> = {
    success: false,
    message,
    ...(errorDetails ? { error: errorDetails } : {}),
  };
  return res.status(statusCode).json(payload);
};
