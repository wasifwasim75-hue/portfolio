import mongoose, { Schema } from 'mongoose';
import { ISkill } from '../types';

const skillSchema = new Schema<ISkill>(
  {
    name: {
      type: String,
      required: [true, 'Skill name is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Skill category is required'],
      enum: ['Frontend', 'Backend', 'Database', 'Tools', 'Other'],
      default: 'Frontend',
    },
    proficiency: {
      type: Number,
      required: [true, 'Proficiency percentage is required'],
      min: [1, 'Proficiency must be at least 1%'],
      max: [100, 'Proficiency cannot exceed 100%'],
      default: 80,
    },
    icon: {
      type: String,
      trim: true,
      default: 'bi-code-slash',
    },
  },
  {
    timestamps: true,
  }
);

export const Skill = mongoose.model<ISkill>('Skill', skillSchema);
