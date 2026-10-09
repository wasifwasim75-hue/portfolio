import mongoose, { Schema } from 'mongoose';
import { IExperience } from '../types';

const experienceSchema = new Schema<IExperience>(
  {
    company: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    position: {
      type: String,
      required: [true, 'Role / Position is required'],
      trim: true,
    },
    duration: {
      type: String,
      default: '',
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    technologies: {
      type: [String],
      default: [],
    },
    startDate: {
      type: String,
      default: '',
      trim: true,
    },
    endDate: {
      type: String,
      trim: true,
      default: '',
    },
    current: {
      type: Boolean,
      default: false,
    },
    certificateUrl: {
      type: String,
      default: '',
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Experience = mongoose.model<IExperience>('Experience', experienceSchema);
