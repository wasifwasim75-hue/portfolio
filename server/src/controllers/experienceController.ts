import { Request, Response, NextFunction } from 'express';
import { ExperienceService } from '../services/experienceService';
import { sendSuccess, sendError } from '../utils/apiResponse';

export class ExperienceController {
  public static async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const experiences = await ExperienceService.getAllExperiences();
      sendSuccess(res, 'Experiences retrieved successfully', experiences, 200, { count: experiences.length });
    } catch (error) {
      next(error);
    }
  }

  public static async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const experience = await ExperienceService.getExperienceById(req.params.id);
      if (!experience) {
        sendError(res, 'Experience record not found', 404);
        return;
      }
      sendSuccess(res, 'Experience retrieved successfully', experience);
    } catch (error) {
      next(error);
    }
  }

  public static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const experience = await ExperienceService.createExperience(req.body);
      sendSuccess(res, 'Experience created successfully', experience, 201);
    } catch (error) {
      next(error);
    }
  }

  public static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const updated = await ExperienceService.updateExperience(req.params.id, req.body);
      if (!updated) {
        sendError(res, 'Experience record not found', 404);
        return;
      }
      sendSuccess(res, 'Experience updated successfully', updated);
    } catch (error) {
      next(error);
    }
  }

  public static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const deleted = await ExperienceService.deleteExperience(req.params.id);
      if (!deleted) {
        sendError(res, 'Experience record not found', 404);
        return;
      }
      sendSuccess(res, 'Experience deleted successfully', deleted);
    } catch (error) {
      next(error);
    }
  }
}
