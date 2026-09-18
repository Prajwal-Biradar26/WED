import mongoose from 'mongoose';

let memoryServer = null;

export const connectDB = async () => {
  try {
    let mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      console.log('ℹ️ No MONGODB_URI found in environment. Initializing in-memory MongoDB for seamless development...');
      try {
        const { MongoMemoryServer } = await import('mongodb-memory-server');
        memoryServer = await MongoMemoryServer.create();
        mongoUri = memoryServer.getUri();
        console.log(`✅ In-Memory MongoDB started at: ${mongoUri}`);
      } catch (err) {
        console.warn('⚠️ Could not start MongoMemoryServer, falling back to localhost mongodb://127.0.0.1:27017/wedding_invitation');
        mongoUri = 'mongodb://127.0.0.1:27017/wedding_invitation';
      }
    }

    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`🕉️ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    // If external Atlas/local failed and we haven't tried memory server yet, attempt memory server
    if (!memoryServer) {
      try {
        console.log('🔄 Attempting fallback to MongoMemoryServer...');
        const { MongoMemoryServer } = await import('mongodb-memory-server');
        memoryServer = await MongoMemoryServer.create();
        const fallbackUri = memoryServer.getUri();
        const conn = await mongoose.connect(fallbackUri);
        console.log(`✅ Fallback In-Memory MongoDB Connected at: ${fallbackUri}`);
        return conn;
      } catch (memErr) {
        console.error(`❌ Fallback MongoDB Error: ${memErr.message}`);
      }
    }
    throw error;
  }
};

export const closeDB = async () => {
  if (mongoose.connection) {
    await mongoose.connection.close();
  }
  if (memoryServer) {
    await memoryServer.stop();
  }
};
