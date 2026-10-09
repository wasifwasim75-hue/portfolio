import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { connectDB } from './config/db';
import { seedDatabase } from './scripts/seed';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    await seedDatabase(false); // Auto-seeds initial data if database is empty

    const server = app.listen(PORT, () => {
      console.log(`===============================================`);
      console.log(`🚀 Portfolio API Server running on port ${PORT}`);
      console.log(`📑 Swagger Documentation: http://localhost:${PORT}/api-docs`);
      console.log(`⚡ Health Check:         http://localhost:${PORT}/api/health`);
      console.log(`===============================================`);
    });

    const shutdown = () => {
      console.log('\nShutting down server gracefully...');
      server.close(() => {
        console.log('HTTP server closed.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
