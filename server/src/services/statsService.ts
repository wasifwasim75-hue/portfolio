import { Project } from '../models/Project';
import { Skill } from '../models/Skill';
import { Experience } from '../models/Experience';
import { Education } from '../models/Education';
import { Contact } from '../models/Contact';

export interface DashboardStats {
  projectsCount: number;
  featuredProjectsCount: number;
  skillsCount: number;
  experiencesCount: number;
  educationCount: number;
  messagesCount: number;
  unreadMessagesCount: number;
}

export class StatsService {
  public static async getDashboardStats(): Promise<DashboardStats> {
    const [
      projectsCount,
      featuredProjectsCount,
      skillsCount,
      experiencesCount,
      educationCount,
      messagesCount,
      unreadMessagesCount,
    ] = await Promise.all([
      Project.countDocuments(),
      Project.countDocuments({ featured: true }),
      Skill.countDocuments(),
      Experience.countDocuments(),
      Education.countDocuments(),
      Contact.countDocuments(),
      Contact.countDocuments({ read: false }),
    ]);

    return {
      projectsCount,
      featuredProjectsCount,
      skillsCount,
      experiencesCount,
      educationCount,
      messagesCount,
      unreadMessagesCount,
    };
  }
}
