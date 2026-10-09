import { Request, Response, NextFunction } from 'express';
import { ProjectService } from '../services/projectService';
import { sendSuccess, sendError } from '../utils/apiResponse';

export class ProjectController {
  public static async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const featured = req.query.featured === 'true' ? true : req.query.featured === 'false' ? false : undefined;
      const projects = await ProjectService.getAllProjects(featured);
      sendSuccess(res, 'Projects retrieved successfully', projects, 200, { count: projects.length });
    } catch (error) {
      next(error);
    }
  }

  public static async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const project = await ProjectService.getProjectById(req.params.id);
      if (!project) {
        sendError(res, 'Project not found', 404);
        return;
      }
      sendSuccess(res, 'Project retrieved successfully', project);
    } catch (error) {
      next(error);
    }
  }

  public static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const project = await ProjectService.createProject(req.body);
      sendSuccess(res, 'Project created successfully', project, 201);
    } catch (error) {
      next(error);
    }
  }

  public static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const updated = await ProjectService.updateProject(req.params.id, req.body);
      if (!updated) {
        sendError(res, 'Project not found', 404);
        return;
      }
      sendSuccess(res, 'Project updated successfully', updated);
    } catch (error) {
      next(error);
    }
  }

  public static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const deleted = await ProjectService.deleteProject(req.params.id);
      if (!deleted) {
        sendError(res, 'Project not found', 404);
        return;
      }
      sendSuccess(res, 'Project deleted successfully', deleted);
    } catch (error) {
      next(error);
    }
  }
}
