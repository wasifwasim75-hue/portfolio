import mongoose, { Schema } from 'mongoose';
import { IEducation } from '../types';

const educationSchema = new Schema<IEducation>(
  {
    institution: {
      type: String,
      required: [true, 'Institution / College name is required'],
      trim: true,
    },
    degree: {
      type: String,
      required: [true, 'Degree is required'],
      trim: true,
    },
    department: {
      type: String,
      default: '',
      trim: true,
    },
    year: {
      type: String,
      default: '',
      trim: true,
    },
    cgpa: {
      type: String,
      default: '',
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    startYear: {
      type: Schema.Types.Mixed,
      required: [true, 'Start year is required'],
    },
    endYear: {
      type: Schema.Types.Mixed,
      default: 'Present',
    },
  },
  {
    timestamps: true,
  }
);

export const Education = mongoose.model<IEducation>('Education', educationSchema);
