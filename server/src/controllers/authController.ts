import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService';
import { AuthRequest } from '../types';
import { sendSuccess, sendError } from '../utils/apiResponse';

export class AuthController {
  public static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      sendSuccess(res, 'Login successful', result);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      sendError(res, message, 401);
    }
  }

  public static async getMe(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        sendError(res, 'Not authenticated', 401);
        return;
      }
      const user = await AuthService.getUserById(req.user.id);
      if (!user) {
        sendError(res, 'User not found', 404);
        return;
      }
      sendSuccess(res, 'User profile retrieved successfully', user);
    } catch (error) {
      next(error);
    }
  }

  public static async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, email, password, role } = req.body;
      const user = await AuthService.register({ name, email, password, role });
      sendSuccess(
        res,
        'Admin account created successfully',
        {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        },
        201
      );
    } catch (error) {
      next(error);
    }
  }
}
