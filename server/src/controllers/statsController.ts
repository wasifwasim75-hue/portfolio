import { Request, Response, NextFunction } from 'express';
import { StatsService } from '../services/statsService';
import { sendSuccess } from '../utils/apiResponse';

export class StatsController {
  public static async getStats(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const stats = await StatsService.getDashboardStats();
      sendSuccess(res, 'Dashboard statistics retrieved successfully', stats);
    } catch (error) {
      next(error);
    }
  }
}
