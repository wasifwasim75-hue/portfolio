import { Request } from 'express';
import { Document, Types } from 'mongoose';

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  count?: number;
}

export type SkillCategory = 'Frontend' | 'Backend' | 'Database' | 'Tools' | 'Other';

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  createdAt: Date;
  updatedAt: Date;
  comparePassword(enteredPassword: string): Promise<boolean>;
}

export interface IProject extends Document {
  _id: Types.ObjectId;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  order?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IExperience extends Document {
  _id: Types.ObjectId;
  company: string;
  position: string;
  duration?: string;
  description: string;
  technologies: string[];
  startDate: string;
  endDate?: string;
  current: boolean;
  certificateUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IEducation extends Document {
  _id: Types.ObjectId;
  institution: string;
  degree: string;
  department?: string;
  year?: string;
  cgpa?: string;
  description?: string;
  startYear: string | number;
  endYear?: string | number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISkill extends Document {
  _id: Types.ObjectId;
  name: string;
  category: SkillCategory;
  proficiency: number;
  icon?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IContact extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProfile extends Document {
  _id: Types.ObjectId;
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

  createdAt: Date;
  updatedAt: Date;
}

export interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

export interface AuthRequest extends Request {
  user?: JwtPayload;
}
