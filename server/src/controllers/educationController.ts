import { Request, Response, NextFunction } from 'express';
import { EducationService } from '../services/educationService';
import { sendSuccess, sendError } from '../utils/apiResponse';

export class EducationController {
  public static async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const records = await EducationService.getAllEducation();
      sendSuccess(res, 'Education records retrieved successfully', records, 200, { count: records.length });
    } catch (error) {
      next(error);
    }
  }

  public static async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const record = await EducationService.getEducationById(req.params.id);
      if (!record) {
        sendError(res, 'Education record not found', 404);
        return;
      }
      sendSuccess(res, 'Education record retrieved successfully', record);
    } catch (error) {
      next(error);
    }
  }

  public static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const record = await EducationService.createEducation(req.body);
      sendSuccess(res, 'Education record created successfully', record, 201);
    } catch (error) {
      next(error);
    }
  }

  public static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const updated = await EducationService.updateEducation(req.params.id, req.body);
      if (!updated) {
        sendError(res, 'Education record not found', 404);
        return;
      }
      sendSuccess(res, 'Education record updated successfully', updated);
    } catch (error) {
      next(error);
    }
  }

  public static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const deleted = await EducationService.deleteEducation(req.params.id);
      if (!deleted) {
        sendError(res, 'Education record not found', 404);
        return;
      }
      sendSuccess(res, 'Education record deleted successfully', deleted);
    } catch (error) {
      next(error);
    }
  }
}
