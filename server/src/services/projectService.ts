import { Project } from '../models/Project';
import { IProject } from '../types';

export class ProjectService {
  public static async getAllProjects(featuredOnly?: boolean): Promise<IProject[]> {
    const filter = featuredOnly !== undefined ? { featured: featuredOnly } : {};
    return await Project.find(filter).sort({ order: 1, createdAt: -1 });
  }

  public static async getProjectById(id: string): Promise<IProject | null> {
    return await Project.findById(id);
  }

  public static async createProject(data: Partial<IProject>): Promise<IProject> {
    const project = new Project(data);
    return await project.save();
  }

  public static async updateProject(id: string, data: Partial<IProject>): Promise<IProject | null> {
    return await Project.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  public static async deleteProject(id: string): Promise<IProject | null> {
    return await Project.findByIdAndDelete(id);
  }
}
