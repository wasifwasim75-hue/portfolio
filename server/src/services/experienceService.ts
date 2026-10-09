import { Experience } from '../models/Experience';
import { IExperience } from '../types';

export class ExperienceService {
  public static async getAllExperiences(): Promise<IExperience[]> {
    return await Experience.find().sort({ current: -1, startDate: -1 });
  }

  public static async getExperienceById(id: string): Promise<IExperience | null> {
    return await Experience.findById(id);
  }

  public static async createExperience(data: Partial<IExperience>): Promise<IExperience> {
    const experience = new Experience(data);
    return await experience.save();
  }

  public static async updateExperience(id: string, data: Partial<IExperience>): Promise<IExperience | null> {
    return await Experience.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  public static async deleteExperience(id: string): Promise<IExperience | null> {
    return await Experience.findByIdAndDelete(id);
  }
}
