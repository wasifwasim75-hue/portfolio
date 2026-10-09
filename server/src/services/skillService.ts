import { Skill } from '../models/Skill';
import { ISkill, SkillCategory } from '../types';

export class SkillService {
  public static async getAllSkills(category?: SkillCategory): Promise<ISkill[]> {
    const filter = category ? { category } : {};
    return await Skill.find(filter).sort({ category: 1, proficiency: -1 });
  }

  public static async getSkillById(id: string): Promise<ISkill | null> {
    return await Skill.findById(id);
  }

  public static async createSkill(data: Partial<ISkill>): Promise<ISkill> {
    const skill = new Skill(data);
    return await skill.save();
  }

  public static async updateSkill(id: string, data: Partial<ISkill>): Promise<ISkill | null> {
    return await Skill.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  public static async deleteSkill(id: string): Promise<ISkill | null> {
    return await Skill.findByIdAndDelete(id);
  }

  public static async getSkillsGrouped(): Promise<Record<string, ISkill[]>> {
    const skills = await Skill.find().sort({ proficiency: -1 });
    const grouped: Record<string, ISkill[]> = {
      Frontend: [],
      Backend: [],
      Database: [],
      Tools: [],
      Other: [],
    };

    for (const skill of skills) {
      if (!grouped[skill.category]) {
        grouped[skill.category] = [];
      }
      grouped[skill.category].push(skill);
    }

    return grouped;
  }
}
