import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/apiResponse';

export const validateContactInput = (req: Request, res: Response, next: NextFunction): void => {
  const { name, email, subject, message } = req.body;

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    sendError(res, 'Name must be at least 2 characters long.', 400);
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
    sendError(res, 'A valid email address is required.', 400);
    return;
  }

  if (!subject || typeof subject !== 'string' || subject.trim().length < 3) {
    sendError(res, 'Subject must be at least 3 characters long.', 400);
    return;
  }

  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    sendError(res, 'Message must be at least 10 characters long.', 400);
    return;
  }

  next();
};

export const validateLoginInput = (req: Request, res: Response, next: NextFunction): void => {
  const { email, password } = req.body;

  if (!email || !password) {
    sendError(res, 'Email and password are both required.', 400);
    return;
  }

  next();
};
