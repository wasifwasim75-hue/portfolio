import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { connectDB } from '../config/db';
import { User } from '../models/User';
import { Project } from '../models/Project';
import { Skill } from '../models/Skill';
import { Experience } from '../models/Experience';
import { Education } from '../models/Education';
import { Contact } from '../models/Contact';
import { Profile } from '../models/Profile';

export const seedDatabase = async (force: boolean = false): Promise<void> => {
  try {
    const existingProjects = await Project.countDocuments();
    if (!force && existingProjects > 0) {
      console.log(`[Seed] Database already contains ${existingProjects} projects. Skipping auto-seed.`);
      return;
    }

    console.log('🌱 Seeding database...');

    if (force) {
      await Promise.all([
        User.deleteMany({}),
        Project.deleteMany({}),
        Skill.deleteMany({}),
        Experience.deleteMany({}),
        Education.deleteMany({}),
        Contact.deleteMany({}),
        Profile.deleteMany({}),
      ]);
    }

    // 0. Seed Profile
    const existingProfile = await Profile.findOne();
    if (!existingProfile) {
      await Profile.create({
        name: 'Wasim Akram',
        profilePhoto: '/assets/profile.jpg',
        shortTitle: 'Full Stack Developer & Software Architect',
        location: 'San Francisco, CA (Open to Remote)',
        availabilityStatus: 'Available for Senior & Full-Stack Opportunities',
        email: 'wasim.akram@example.com',
        phone: '+1 (555) 234-5678',

        heroGreeting: "Hi, I'm",
        heroName: 'Wasim Akram',
        heroTitle: 'Full Stack Developer & Software Architect',
        heroDescription:
          'I build scalable, modern and user-friendly web applications with React, TypeScript, Express, and MongoDB. Transforming complex architectures into elegant, resilient user experiences.',
        heroLocation: 'San Francisco, CA',
        heroWorkType: 'Full-time / Remote / Contract',
        heroAvailabilityBadge: 'Available for Hire',
        heroViewProjectsBtnText: 'View My Work',
        heroResumeBtnText: 'Download Resume',
        yearsExperience: '6+',
        projectsCount: '45+',
        uptimeSla: '99.9%',

        aboutHeading: 'About Me',
        aboutDescription:
          'I am a Full Stack Software Engineer with over 6 years of experience building production web applications from ground zero to scale. My expertise spans both frontend interactive architectures with React and TypeScript, as well as robust backend systems using Node.js, Express, and MongoDB.',
        aboutPersonalInfo:
          'Throughout my career, I have collaborated with cross-functional product teams, architected RESTful and GraphQL APIs, designed scalable database schemas, and championed automated testing and CI/CD best practices.',
        aboutCareerObjective:
          'To create high-impact, fault-tolerant digital systems while fostering strong team developer experience and adopting modern software architecture practices.',

        githubUrl: 'https://github.com/wasimakram',
        linkedinUrl: 'https://linkedin.com/in/wasimakram',
        instagramUrl: 'https://instagram.com/wasimakram',
        twitterUrl: 'https://twitter.com/wasimakram',
        otherSocialLinks: [],
        resumeUrl: '',
        resumeFileName: 'Wasim_Akram_Resume.pdf',
      });
      console.log('   [Seed] Default profile seeded');
    }

    // 1. Seed Admin User
    const existingAdmin = await User.findOne({ email: 'admin@portfolio.com' });
    if (!existingAdmin) {
      await User.create({
        name: 'Wasim Akram',
        email: 'admin@portfolio.com',
        password: 'admin123456',
        role: 'admin',
      });
      console.log('   [Seed] Admin user created: admin@portfolio.com (admin123456)');
    }

    // 2. Seed Skills
    const skillCount = await Skill.countDocuments();
    if (skillCount === 0) {
      await Skill.create([
        // Frontend
        { name: 'React.js', category: 'Frontend', proficiency: 95, icon: 'bi-filetype-jsx' },
        { name: 'TypeScript', category: 'Frontend', proficiency: 92, icon: 'bi-filetype-tsx' },
        { name: 'JavaScript (ES6+)', category: 'Frontend', proficiency: 95, icon: 'bi-filetype-js' },
        { name: 'HTML5 & CSS3', category: 'Frontend', proficiency: 90, icon: 'bi-filetype-html' },
        { name: 'Bootstrap 5', category: 'Frontend', proficiency: 90, icon: 'bi-bootstrap' },
        { name: 'Tailwind CSS', category: 'Frontend', proficiency: 85, icon: 'bi-palette' },
        { name: 'Next.js', category: 'Frontend', proficiency: 88, icon: 'bi-lightning-charge' },
        { name: 'Redux / Zustand', category: 'Frontend', proficiency: 85, icon: 'bi-boxes' },

        // Backend
        { name: 'Node.js', category: 'Backend', proficiency: 92, icon: 'bi-hdd-network' },
        { name: 'Express.js', category: 'Backend', proficiency: 94, icon: 'bi-server' },
        { name: 'REST APIs', category: 'Backend', proficiency: 96, icon: 'bi-arrow-left-right' },
        { name: 'GraphQL', category: 'Backend', proficiency: 78, icon: 'bi-diagram-3' },
        { name: 'Microservices', category: 'Backend', proficiency: 82, icon: 'bi-grid-3x3' },
        { name: 'Authentication (JWT/OAuth)', category: 'Backend', proficiency: 90, icon: 'bi-shield-lock' },

        // Database
        { name: 'MongoDB', category: 'Database', proficiency: 92, icon: 'bi-database' },
        { name: 'Mongoose ODM', category: 'Database', proficiency: 94, icon: 'bi-database-check' },
        { name: 'PostgreSQL', category: 'Database', proficiency: 84, icon: 'bi-database-fill' },
        { name: 'Redis', category: 'Database', proficiency: 80, icon: 'bi-speedometer2' },

        // Tools
        { name: 'Git & GitHub', category: 'Tools', proficiency: 95, icon: 'bi-git' },
        { name: 'VS Code', category: 'Tools', proficiency: 98, icon: 'bi-code-square' },
        { name: 'Swagger / OpenAPI', category: 'Tools', proficiency: 90, icon: 'bi-file-earmark-code' },
        { name: 'Docker', category: 'Tools', proficiency: 80, icon: 'bi-box-seam' },
        { name: 'Postman', category: 'Tools', proficiency: 92, icon: 'bi-send' },
        { name: 'Vite / Webpack', category: 'Tools', proficiency: 88, icon: 'bi-cpu' },
      ]);
      console.log('   [Seed] Skills seeded');
    }

    // 3. Seed Projects
    const pCount = await Project.countDocuments();
    if (pCount === 0) {
      await Project.create([
        {
          title: 'CloudSync AI - Enterprise Workspace',
          description:
            'Next-generation collaborative workspace featuring real-time document editing, AI-assisted code suggestions, team workspaces, and cloud file synchronizations.',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
          technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'Bootstrap 5'],
          githubUrl: 'https://github.com/developer/cloudsync-ai',
          liveUrl: 'https://cloudsync-ai-demo.dev',
          featured: true,
          order: 1,
        },
        {
          title: 'DevNexus - Developer Community & Code Hub',
          description:
            'A modern developer community portal allowing engineers to share verified code snippets, create technical articles, participate in discussions, and track trending tech topics.',
          image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
          technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Bootstrap 5', 'JWT'],
          githubUrl: 'https://github.com/developer/devnexus-platform',
          liveUrl: 'https://devnexus-community.dev',
          featured: true,
          order: 2,
        },
        {
          title: 'FinEdge - Real-Time Financial Analytics',
          description:
            'High-throughput financial analytics dashboard visualizing stock and crypto ticker feeds, portfolio performance projections, order book heatmaps, and customizable alerts.',
          image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
          technologies: ['React', 'TypeScript', 'Chart.js', 'Express', 'MongoDB', 'WebSockets', 'Bootstrap 5'],
          githubUrl: 'https://github.com/developer/finedge-analytics',
          liveUrl: 'https://finedge-demo.dev',
          featured: true,
          order: 3,
        },
        {
          title: 'TaskFlow Pro - Agile Sprint & Kanban Board',
          description:
            'Streamlined agile task management tool supporting custom Kanban boards, sprint tracking, drag-and-drop workflow automation, and productivity velocity metrics.',
          image: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&w=800&q=80',
          technologies: ['React', 'TypeScript', 'Bootstrap 5', 'Express', 'Mongoose', 'REST API'],
          githubUrl: 'https://github.com/developer/taskflow-pro',
          liveUrl: 'https://taskflow-pro-demo.dev',
          featured: false,
          order: 4,
        },
        {
          title: 'ShopEase - Headless Multi-Vendor Commerce',
          description:
            'Full-featured eCommerce storefront with dynamic product filtering, cart persistence, automated tax calculations, Stripe checkout integration, and merchant inventory portal.',
          image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&q=80',
          technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe API', 'Bootstrap 5'],
          githubUrl: 'https://github.com/developer/shopease-commerce',
          liveUrl: 'https://shopease-demo.dev',
          featured: false,
          order: 5,
        },
        {
          title: 'PulseAPI - Automated API Monitoring Suite',
          description:
            'Automated REST & GraphQL uptime monitor with synthetic transaction tests, latency percentiles, error rate alerting, and automated Swagger/OpenAPI documentation validation.',
          image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&q=80',
          technologies: ['Node.js', 'Express', 'TypeScript', 'MongoDB', 'Swagger', 'Cron'],
          githubUrl: 'https://github.com/developer/pulseapi-monitor',
          liveUrl: 'https://pulseapi-demo.dev',
          featured: true,
          order: 6,
        },
      ]);
      console.log('   [Seed] Projects seeded');
    }

    // 4. Seed Experiences
    const expCount = await Experience.countDocuments();
    if (expCount === 0) {
      await Experience.create([
        {
          company: 'Apex Cloud Systems',
          position: 'Lead Full Stack Engineer',
          startDate: 'Jan 2023',
          endDate: 'Present',
          current: true,
          description:
            'Spearheading full-stack architecture for enterprise web products serving 150K+ daily active users. Built microservices with Node.js and Express, designed resilient MongoDB data models, and engineered reusable React/TypeScript component systems with high performance and accessibility standards.',
          technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Bootstrap 5', 'Docker'],
        },
        {
          company: 'Vanguard Software Labs',
          position: 'Full Stack Developer',
          startDate: 'Jul 2021',
          endDate: 'Dec 2022',
          current: false,
          description:
            'Developed key product features for data visualization and client analytics dashboards. Implemented RESTful APIs with Express and Mongoose, integrated authentication pipelines with JWT/bcrypt, and reduced average page load times by 40% through code splitting and memoization.',
          technologies: ['React', 'JavaScript', 'Node.js', 'Express', 'MongoDB', 'REST APIs'],
        },
        {
          company: 'PixelCraft Digital',
          position: 'Frontend Developer',
          startDate: 'Aug 2019',
          endDate: 'Jun 2021',
          current: false,
          description:
            'Engineered mobile-responsive interfaces and interactive web applications using React, Bootstrap, and modern CSS. Collaborated with UX designers to translate wireframes into pixel-perfect, accessible client applications.',
          technologies: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Bootstrap', 'Git'],
        },
      ]);
      console.log('   [Seed] Experience records seeded');
    }

    // 5. Seed Education
    const eduCount = await Education.countDocuments();
    if (eduCount === 0) {
      await Education.create([
        {
          institution: 'University of California, Berkeley',
          degree: 'B.S. in Computer Science',
          startYear: '2015',
          endYear: '2019',
          description:
            'Graduated Magna Cum Laude. Coursework in Data Structures, Algorithms, Distributed Computing, Database Systems, Computer Networks, and Human-Computer Interaction.',
        },
        {
          institution: 'Stanford Center for Professional Development',
          degree: 'Full-Stack Software Architecture Certification',
          startYear: '2020',
          endYear: '2021',
          description:
            'Specialized professional program focusing on scalable cloud microservices, REST API design, advanced MongoDB data patterns, and modern reactive frontend frameworks.',
        },
      ]);
      console.log('   [Seed] Education records seeded');
    }

    // 6. Seed Sample Contact
    const contactCount = await Contact.countDocuments();
    if (contactCount === 0) {
      await Contact.create({
        name: 'Elena Rostova',
        email: 'elena@technext-ventures.com',
        subject: 'Senior Full Stack Role & Collaboration',
        message:
          'Hi Alex, we were extremely impressed by your portfolio and open source work. We have an exciting full-stack engineering initiative involving React, TypeScript, and Node.js microservices. Would love to connect!',
        read: false,
      });
      console.log('   [Seed] Sample contact message seeded');
    }

    console.log('✅ Seeding complete!');
  } catch (error) {
    console.error('❌ Database seeding error:', error);
    throw error;
  }
};

// If run directly from CLI
if (require.main === module) {
  (async () => {
    try {
      await connectDB();
      await seedDatabase(true); // force reset on explicit npm run seed
      await mongoose.disconnect();
      process.exit(0);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  })();
}
