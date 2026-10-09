import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import routes from './routes';
import { setupSwagger } from './config/swagger';
import { errorHandler } from './middleware/errorHandler';

const app: Application = express();

// Security Middlewares
app.use(
  helmet({
    contentSecurityPolicy: false, // Allows Swagger UI and local development assets
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// CORS configuration
const allowedOrigin = process.env.CLIENT_URL || 'http://localhost:5173';
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, postman) or matching origin
      if (!origin || origin === allowedOrigin || origin.startsWith('http://localhost:')) {
        callback(null, true);
      } else {
        callback(null, true); // Dev-friendly permissive CORS
      }
    },
    credentials: true,
  })
);

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploads
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Swagger Documentation at /api-docs
setupSwagger(app);

// Mount API routes
app.use('/api', routes);

// Root greeting endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({
    name: 'Portfolio REST API',
    version: '1.0.0',
    documentation: '/api-docs',
    endpoints: {
      projects: '/api/projects',
      skills: '/api/skills',
      experiences: '/api/experiences',
      education: '/api/education',
      contact: '/api/contact',
      auth: '/api/auth',
      stats: '/api/stats',
      health: '/api/health',
    },
  });
});

// 404 Not Found handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Endpoint ${req.method} ${req.url} does not exist. Refer to /api-docs for documentation.`,
  });
});

// Centralized error handler
app.use(errorHandler);

export default app;
