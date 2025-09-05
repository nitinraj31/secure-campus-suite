import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import logger from '../utils/logger';

const router = express.Router();

// Health check endpoint
router.get('/health', async (req: Request, res: Response) => {
  try {
    // Check database connection
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';

    // Check memory usage
    const memUsage = process.memoryUsage();
    const memoryUsage = {
      rss: `${Math.round(memUsage.rss / 1024 / 1024)} MB`,
      heapTotal: `${Math.round(memUsage.heapTotal / 1024 / 1024)} MB`,
      heapUsed: `${Math.round(memUsage.heapUsed / 1024 / 1024)} MB`,
      external: `${Math.round(memUsage.external / 1024 / 1024)} MB`
    };

    // Check uptime
    const uptime = process.uptime();
    const uptimeFormatted = `${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m ${Math.floor(uptime % 60)}s`;

    const healthData = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: uptimeFormatted,
      memory: memoryUsage,
      database: {
        status: dbStatus,
        name: mongoose.connection.name || 'unknown'
      },
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '1.0.0'
    };

    logger.info('Health check requested', { status: 'healthy' });

    res.status(200).json({
      success: true,
      data: healthData
    });
  } catch (error) {
    logger.error('Health check failed', { error: (error as Error).message });

    res.status(503).json({
      success: false,
      message: 'Service unhealthy',
      error: process.env.NODE_ENV === 'development' ? (error as Error).message : 'Internal server error'
    });
  }
});

// Readiness check endpoint
router.get('/ready', async (req: Request, res: Response) => {
  try {
    // Check if database is ready
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database not ready'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Service is ready to accept requests',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      message: 'Service not ready',
      error: process.env.NODE_ENV === 'development' ? (error as Error).message : 'Internal server error'
    });
  }
});

// Metrics endpoint (basic)
router.get('/metrics', async (req: Request, res: Response) => {
  try {
    const metrics = {
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      cpu: process.cpuUsage(),
      platform: process.platform,
      nodeVersion: process.version,
      pid: process.pid
    };

    res.status(200).json({
      success: true,
      data: metrics
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve metrics',
      error: process.env.NODE_ENV === 'development' ? (error as Error).message : 'Internal server error'
    });
  }
});

export default router;
