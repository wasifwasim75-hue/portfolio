export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  count?: number;
}

export type SkillCategory = 'Frontend' | 'Backend' | 'Database' | 'Tools' | 'Other';

export interface Profile {
  _id?: string;
  // Personal Info
  name: string;
  profilePhoto: string;
  shortTitle: string;
  location: string;
  availabilityStatus: string;
  email: string;
  phone: string;

  // Hero Section
  heroGreeting: string;
  heroName: string;
  heroTitle: string;
  heroDescription: string;
  heroLocation: string;
  heroWorkType: string;
  heroAvailabilityBadge: string;
  heroViewProjectsBtnText: string;
  heroResumeBtnText: string;
  yearsExperience: string;
  projectsCount: string;
  uptimeSla: string;

  // About Section
  aboutHeading: string;
  aboutDescription: string;
  aboutPersonalInfo: string;
  aboutCareerObjective: string;

  // Social Links
  githubUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
  twitterUrl: string;
  otherSocialLinks: { platform: string; url: string }[];

  // Resume
  resumeUrl: string;
  resumeFileName: string;

  createdAt?: string;
  updatedAt?: string;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Experience {
  _id: string;
  company: string;
  position: string;
  duration?: string;
  description: string;
  technologies: string[];
  startDate: string;
  endDate?: string;
  current: boolean;
  certificateUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Education {
  _id: string;
  institution: string;
  degree: string;
  department?: string;
  year?: string;
  cgpa?: string;
  description?: string;
  startYear: string | number;
  endYear?: string | number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Skill {
  _id: string;
  name: string;
  category: SkillCategory;
  proficiency: number;
  icon?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface DashboardStats {
  projectsCount: number;
  featuredProjectsCount: number;
  skillsCount: number;
  experiencesCount: number;
  educationCount: number;
  messagesCount: number;
  unreadMessagesCount: number;
}
