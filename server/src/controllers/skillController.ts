import { Request, Response, NextFunction } from 'express';
import { SkillService } from '../services/skillService';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { SkillCategory } from '../types';

export class SkillController {
  public static async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const category = req.query.category as SkillCategory | undefined;
      const skills = await SkillService.getAllSkills(category);
      sendSuccess(res, 'Skills retrieved successfully', skills, 200, { count: skills.length });
    } catch (error) {
      next(error);
    }
  }

  public static async getGrouped(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const grouped = await SkillService.getSkillsGrouped();
      sendSuccess(res, 'Grouped skills retrieved successfully', grouped);
    } catch (error) {
      next(error);
    }
  }

  public static async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const skill = await SkillService.getSkillById(req.params.id);
      if (!skill) {
        sendError(res, 'Skill not found', 404);
        return;
      }
      sendSuccess(res, 'Skill retrieved successfully', skill);
    } catch (error) {
      next(error);
    }
  }

  public static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const skill = await SkillService.createSkill(req.body);
      sendSuccess(res, 'Skill created successfully', skill, 201);
    } catch (error) {
      next(error);
    }
  }

  public static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const updated = await SkillService.updateSkill(req.params.id, req.body);
      if (!updated) {
        sendError(res, 'Skill not found', 404);
        return;
      }
      sendSuccess(res, 'Skill updated successfully', updated);
    } catch (error) {
      next(error);
    }
  }

  public static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const deleted = await SkillService.deleteSkill(req.params.id);
      if (!deleted) {
        sendError(res, 'Skill not found', 404);
        return;
      }
      sendSuccess(res, 'Skill deleted successfully', deleted);
    } catch (error) {
      next(error);
    }
  }
}
