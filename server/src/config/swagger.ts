import { Application } from 'express';
import swaggerUi from 'swagger-ui-express';

export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Full-Stack Developer Portfolio REST API',
    version: '1.0.0',
    description:
      'Production-ready REST API for personal portfolio management with MongoDB, Express, TypeScript, and JWT Authentication.',
    contact: {
      name: 'Portfolio Admin',
      email: 'admin@portfolio.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Local Development Server',
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter your JWT token obtained from /api/auth/login',
      },
    },
    schemas: {
      StandardResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'Operation completed successfully' },
        },
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          message: { type: 'string', example: 'Error description message' },
        },
      },
      Project: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '65f123456789abcdef012345' },
          title: { type: 'string', example: 'AI Cloud Platform' },
          description: { type: 'string', example: 'High performance enterprise AI dashboard' },
          image: { type: 'string', example: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71' },
          technologies: {
            type: 'array',
            items: { type: 'string' },
            example: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
          },
          githubUrl: { type: 'string', example: 'https://github.com/developer/project' },
          liveUrl: { type: 'string', example: 'https://project-demo.com' },
          featured: { type: 'boolean', example: true },
          order: { type: 'number', example: 1 },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      Experience: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '65f123456789abcdef012346' },
          company: { type: 'string', example: 'TechCorp Global' },
          position: { type: 'string', example: 'Senior Full Stack Engineer' },
          description: { type: 'string', example: 'Architected scalable microservices and responsive user interfaces.' },
          technologies: {
            type: 'array',
            items: { type: 'string' },
            example: ['React', 'Node.js', 'TypeScript', 'AWS'],
          },
          startDate: { type: 'string', example: 'Jan 2023' },
          endDate: { type: 'string', example: 'Present' },
          current: { type: 'boolean', example: true },
        },
      },
      Education: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '65f123456789abcdef012347' },
          institution: { type: 'string', example: 'Stanford University' },
          degree: { type: 'string', example: 'B.S. in Computer Science' },
          description: { type: 'string', example: 'Focus on Distributed Systems and Software Architecture' },
          startYear: { type: 'string', example: '2019' },
          endYear: { type: 'string', example: '2023' },
        },
      },
      Skill: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '65f123456789abcdef012348' },
          name: { type: 'string', example: 'React.js' },
          category: {
            type: 'string',
            enum: ['Frontend', 'Backend', 'Database', 'Tools', 'Other'],
            example: 'Frontend',
          },
          proficiency: { type: 'number', minimum: 1, maximum: 100, example: 95 },
          icon: { type: 'string', example: 'bi-code-slash' },
        },
      },
      Contact: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '65f123456789abcdef012349' },
          name: { type: 'string', example: 'Sarah Connor' },
          email: { type: 'string', example: 'sarah@example.com' },
          subject: { type: 'string', example: 'Project Collaboration Opportunity' },
          message: { type: 'string', example: 'We would love to discuss a full-stack web project with you.' },
          read: { type: 'boolean', example: false },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
    },
  },
  paths: {
    '/api/health': {
      get: {
        summary: 'API Health Check',
        tags: ['Health'],
        responses: {
          200: {
            description: 'API is healthy and operational',
          },
        },
      },
    },
    '/api/projects': {
      get: {
        summary: 'Get all portfolio projects',
        tags: ['Projects'],
        parameters: [
          {
            name: 'featured',
            in: 'query',
            required: false,
            schema: { type: 'boolean' },
            description: 'Filter projects by featured flag',
          },
        ],
        responses: {
          200: {
            description: 'List of portfolio projects',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean' },
                    message: { type: 'string' },
                    count: { type: 'number' },
                    data: { type: 'array', items: { $ref: '#/components/schemas/Project' } },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: 'Create a new project (Admin Only)',
        tags: ['Projects'],
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['title', 'description', 'image', 'technologies'],
                properties: {
                  title: { type: 'string' },
                  description: { type: 'string' },
                  image: { type: 'string' },
                  technologies: { type: 'array', items: { type: 'string' } },
                  githubUrl: { type: 'string' },
                  liveUrl: { type: 'string' },
                  featured: { type: 'boolean' },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'Project created successfully' },
          401: { description: 'Unauthorized' },
        },
      },
    },
    '/api/projects/{id}': {
      get: {
        summary: 'Get project by ID',
        tags: ['Projects'],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Project details' },
          404: { description: 'Project not found' },
        },
      },
      put: {
        summary: 'Update project (Admin Only)',
        tags: ['Projects'],
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Project' },
            },
          },
        },
        responses: {
          200: { description: 'Project updated' },
          401: { description: 'Unauthorized' },
          404: { description: 'Project not found' },
        },
      },
      delete: {
        summary: 'Delete project (Admin Only)',
        tags: ['Projects'],
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Project deleted' },
          401: { description: 'Unauthorized' },
          404: { description: 'Project not found' },
        },
      },
    },
    '/api/experiences': {
      get: {
        summary: 'Get all work experiences',
        tags: ['Experiences'],
        responses: {
          200: { description: 'List of experiences' },
        },
      },
      post: {
        summary: 'Create experience record (Admin Only)',
        tags: ['Experiences'],
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['company', 'position', 'description', 'startDate'],
                properties: {
                  company: { type: 'string' },
                  position: { type: 'string' },
                  description: { type: 'string' },
                  technologies: { type: 'array', items: { type: 'string' } },
                  startDate: { type: 'string' },
                  endDate: { type: 'string' },
                  current: { type: 'boolean' },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'Experience created' },
          401: { description: 'Unauthorized' },
        },
      },
    },
    '/api/experiences/{id}': {
      put: {
        summary: 'Update experience (Admin Only)',
        tags: ['Experiences'],
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Experience updated' },
        },
      },
      delete: {
        summary: 'Delete experience (Admin Only)',
        tags: ['Experiences'],
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Experience deleted' },
        },
      },
    },
    '/api/education': {
      get: {
        summary: 'Get all education records',
        tags: ['Education'],
        responses: {
          200: { description: 'List of education history' },
        },
      },
      post: {
        summary: 'Add education record (Admin Only)',
        tags: ['Education'],
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['institution', 'degree', 'startYear'],
                properties: {
                  institution: { type: 'string' },
                  degree: { type: 'string' },
                  description: { type: 'string' },
                  startYear: { type: 'string' },
                  endYear: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'Education record created' },
        },
      },
    },
    '/api/education/{id}': {
      put: {
        summary: 'Update education record (Admin Only)',
        tags: ['Education'],
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Education updated' },
        },
      },
      delete: {
        summary: 'Delete education record (Admin Only)',
        tags: ['Education'],
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Education deleted' },
        },
      },
    },
    '/api/skills': {
      get: {
        summary: 'Get skills list (optionally filtered by category)',
        tags: ['Skills'],
        parameters: [
          {
            name: 'category',
            in: 'query',
            schema: { type: 'string', enum: ['Frontend', 'Backend', 'Database', 'Tools', 'Other'] },
          },
        ],
        responses: {
          200: { description: 'List of skills' },
        },
      },
      post: {
        summary: 'Add new skill (Admin Only)',
        tags: ['Skills'],
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'category', 'proficiency'],
                properties: {
                  name: { type: 'string' },
                  category: { type: 'string', enum: ['Frontend', 'Backend', 'Database', 'Tools', 'Other'] },
                  proficiency: { type: 'number', minimum: 1, maximum: 100 },
                  icon: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'Skill created' },
        },
      },
    },
    '/api/skills/grouped': {
      get: {
        summary: 'Get skills grouped by categories',
        tags: ['Skills'],
        responses: {
          200: { description: 'Object categorized into Frontend, Backend, Database, Tools' },
        },
      },
    },
    '/api/skills/{id}': {
      put: {
        summary: 'Update skill (Admin Only)',
        tags: ['Skills'],
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Skill updated' },
        },
      },
      delete: {
        summary: 'Delete skill (Admin Only)',
        tags: ['Skills'],
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Skill deleted' },
        },
      },
    },
    '/api/contact': {
      post: {
        summary: 'Submit contact message from portfolio form',
        tags: ['Contact'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'email', 'subject', 'message'],
                properties: {
                  name: { type: 'string', example: 'John Doe' },
                  email: { type: 'string', example: 'johndoe@example.com' },
                  subject: { type: 'string', example: 'Project Inquiry' },
                  message: { type: 'string', example: 'Hello Alex, I would like to build a web application.' },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'Message received and saved' },
          400: { description: 'Validation error' },
        },
      },
      get: {
        summary: 'Get all contact messages (Admin Only)',
        tags: ['Contact'],
        security: [{ BearerAuth: [] }],
        responses: {
          200: { description: 'List of received contact messages' },
          401: { description: 'Unauthorized' },
        },
      },
    },
    '/api/contact/{id}/read': {
      put: {
        summary: 'Mark message as read (Admin Only)',
        tags: ['Contact'],
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Message marked as read' },
        },
      },
    },
    '/api/contact/{id}': {
      delete: {
        summary: 'Delete contact message (Admin Only)',
        tags: ['Contact'],
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Message deleted' },
        },
      },
    },
    '/api/auth/login': {
      post: {
        summary: 'Admin login to receive JWT authentication token',
        tags: ['Authentication'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: { type: 'string', example: 'admin@portfolio.com' },
                  password: { type: 'string', example: 'admin123456' },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'JWT token and admin user profile' },
          401: { description: 'Invalid email or password' },
        },
      },
    },
    '/api/auth/me': {
      get: {
        summary: 'Get authenticated admin profile',
        tags: ['Authentication'],
        security: [{ BearerAuth: [] }],
        responses: {
          200: { description: 'User profile details' },
          401: { description: 'Unauthorized' },
        },
      },
    },
    '/api/stats': {
      get: {
        summary: 'Get dashboard statistics (Admin Only)',
        tags: ['Admin Stats'],
        security: [{ BearerAuth: [] }],
        responses: {
          200: { description: 'Counts of projects, skills, education, messages' },
        },
      },
    },
  },
};

export const setupSwagger = (app: Application): void => {
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
      customSiteTitle: 'Portfolio API Docs | Swagger UI',
      customCss: '.swagger-ui .topbar { display: none }',
    })
  );
};
