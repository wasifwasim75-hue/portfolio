import mongoose from 'mongoose';

export const connectDB = async (): Promise<string> => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

  try {
    // Attempt standard MongoDB connection (with short timeout so if local daemon isn't running it falls back quickly)
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`[MongoDB] Connected successfully: ${conn.connection.host}`);
    return conn.connection.host;
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.warn(`[MongoDB] Primary connection failed (${errorMsg}). Attempting dev in-memory fallback...`);

    try {
      // Dynamic import to avoid memory overhead if not needed
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create({
        instance: {
          dbName: 'portfolio',
        },
      });
      const memUri = mongod.getUri();
      const conn = await mongoose.connect(memUri);
      console.log(`[MongoDB] Connected to in-memory instance: ${conn.connection.host} (${memUri})`);

      process.on('SIGINT', async () => {
        await mongoose.disconnect();
        await mongod.stop();
        process.exit(0);
      });

      return memUri;
    } catch (memErr) {
      console.error('[MongoDB] In-memory database initialization failed:', memErr);
      throw new Error(`Failed to establish MongoDB connection: ${errorMsg}`);
    }
  }
};
