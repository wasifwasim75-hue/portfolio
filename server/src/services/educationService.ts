import { Education } from '../models/Education';
import { IEducation } from '../types';

export class EducationService {
  public static async getAllEducation(): Promise<IEducation[]> {
    return await Education.find().sort({ startYear: -1 });
  }

  public static async getEducationById(id: string): Promise<IEducation | null> {
    return await Education.findById(id);
  }

  public static async createEducation(data: Partial<IEducation>): Promise<IEducation> {
    const education = new Education(data);
    return await education.save();
  }

  public static async updateEducation(id: string, data: Partial<IEducation>): Promise<IEducation | null> {
    return await Education.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  public static async deleteEducation(id: string): Promise<IEducation | null> {
    return await Education.findByIdAndDelete(id);
  }
}
