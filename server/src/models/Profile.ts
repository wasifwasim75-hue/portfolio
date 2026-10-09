import mongoose, { Schema } from 'mongoose';
import { IProfile } from '../types';

const profileSchema = new Schema<IProfile>(
  {
    // 1. Personal Information
    name: {
      type: String,
      required: [true, 'Name is required'],
      default: 'Wasim Akram',
      trim: true,
    },
    profilePhoto: {
      type: String,
      default: '/assets/profile.jpg',
      trim: true,
    },
    shortTitle: {
      type: String,
      default: 'Full Stack Developer & Software Architect',
      trim: true,
    },
    location: {
      type: String,
      default: 'San Francisco, CA (Open to Remote)',
      trim: true,
    },
    availabilityStatus: {
      type: String,
      default: 'Available for Senior & Full-Stack Opportunities',
      trim: true,
    },
    email: {
      type: String,
      default: 'wasim.akram@example.com',
      trim: true,
    },
    phone: {
      type: String,
      default: '+1 (555) 234-5678',
      trim: true,
    },

    // 2. Hero Section
    heroGreeting: {
      type: String,
      default: "Hi, I'm",
      trim: true,
    },
    heroName: {
      type: String,
      default: 'Wasim Akram',
      trim: true,
    },
    heroTitle: {
      type: String,
      default: 'Full Stack Developer & Software Architect',
      trim: true,
    },
    heroDescription: {
      type: String,
      default: 'I build scalable, modern and user-friendly web applications with React, TypeScript, Express, and MongoDB. Transforming complex architectures into elegant, resilient user experiences.',
      trim: true,
    },
    heroLocation: {
      type: String,
      default: 'San Francisco, CA',
      trim: true,
    },
    heroWorkType: {
      type: String,
      default: 'Full-time / Remote / Contract',
      trim: true,
    },
    heroAvailabilityBadge: {
      type: String,
      default: 'Available for Hire',
      trim: true,
    },
    heroViewProjectsBtnText: {
      type: String,
      default: 'View My Work',
      trim: true,
    },
    heroResumeBtnText: {
      type: String,
      default: 'Download Resume',
      trim: true,
    },
    yearsExperience: {
      type: String,
      default: '6+',
      trim: true,
    },
    projectsCount: {
      type: String,
      default: '45+',
      trim: true,
    },
    uptimeSla: {
      type: String,
      default: '99.9%',
      trim: true,
    },

    // 3. About Section
    aboutHeading: {
      type: String,
      default: 'About Me',
      trim: true,
    },
    aboutDescription: {
      type: String,
      default: 'I am a Full Stack Software Engineer with over 6 years of experience building production web applications from ground zero to scale. My expertise spans both frontend interactive architectures with React and TypeScript, as well as robust backend systems using Node.js, Express, and MongoDB.',
      trim: true,
    },
    aboutPersonalInfo: {
      type: String,
      default: 'Throughout my career, I have collaborated with cross-functional product teams, architected RESTful and GraphQL APIs, designed scalable database schemas, and championed automated testing and CI/CD best practices.',
      trim: true,
    },
    aboutCareerObjective: {
      type: String,
      default: 'To create high-impact, fault-tolerant digital systems while fostering strong team developer experience and adopting modern software architecture practices.',
      trim: true,
    },

    // 8. Social Media / Contact
    githubUrl: {
      type: String,
      default: 'https://github.com/wasimakram',
      trim: true,
    },
    linkedinUrl: {
      type: String,
      default: 'https://linkedin.com/in/wasimakram',
      trim: true,
    },
    instagramUrl: {
      type: String,
      default: 'https://instagram.com/wasimakram',
      trim: true,
    },
    twitterUrl: {
      type: String,
      default: 'https://twitter.com/wasimakram',
      trim: true,
    },
    otherSocialLinks: {
      type: [
        {
          platform: { type: String, required: true },
          url: { type: String, required: true },
        },
      ],
      default: [],
    },

    // 9. Resume
    resumeUrl: {
      type: String,
      default: '',
      trim: true,
    },
    resumeFileName: {
      type: String,
      default: 'Wasim_Akram_Resume.pdf',
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Profile = mongoose.model<IProfile>('Profile', profileSchema);
