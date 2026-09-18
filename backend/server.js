import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import { seedSampleWedding } from './utils/seedSampleData.js';

// Route imports
import authRoutes from './routes/authRoutes.js';
import weddingRoutes from './routes/weddingRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import storyRoutes from './routes/storyRoutes.js';
import mediaRoutes from './routes/mediaRoutes.js';
import familyRoutes from './routes/familyRoutes.js';
import rsvpRoutes from './routes/rsvpRoutes.js';
import guestbookRoutes from './routes/guestbookRoutes.js';
import aiRoutes from './routes/aiRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares
app.use(cors({
  origin: '*', // Allow all origins in dev, can configure with FRONTEND_URL
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static directory for uploaded media
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve compiled frontend dist in production if available, else serve raw frontend
const distPath = path.join(__dirname, '../frontend/dist');
const fallbackPath = path.join(__dirname, '../frontend');

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
} else {
  app.use(express.static(fallbackPath));
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Traditional Indian Wedding Invitation Platform API',
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/wedding', weddingRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/story', storyRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/family', familyRoutes);
app.use('/api/rsvp', rsvpRoutes);
app.use('/api/guestbook', guestbookRoutes);
app.use('/api/ai', aiRoutes);

// SPA fallback for all non-API GET requests (handles /, /w/:slug, etc.)
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) {
    return next();
  }
  if (fs.existsSync(path.join(distPath, 'index.html'))) {
    return res.sendFile(path.join(distPath, 'index.html'));
  }
  return res.sendFile(path.join(fallbackPath, 'index.html'));
});

// 404 Route handler for unhandled API routes
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    await seedSampleWedding();

    app.listen(PORT, () => {
      console.log(`\n======================================================`);
      console.log(`🪔 Traditional Indian Wedding Invitation Backend API`);
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`🕉️ Health check: http://localhost:${PORT}/api/health`);
      console.log(`💍 Sample wedding slug: prajwal-and-priya`);
      console.log(`======================================================\n`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
