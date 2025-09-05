import request from 'supertest';
import app from '../../src/server';

describe('Health Routes', () => {
  describe('GET /health', () => {
    it('should return healthy status', async () => {
      const response = await request(app).get('/health');
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.status).toBe('healthy');
    });
  });

  describe('GET /ready', () => {
    it('should return ready status', async () => {
      const response = await request(app).get('/ready');
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Service is ready to accept requests');
    });
  });

  describe('GET /metrics', () => {
    it('should return metrics data', async () => {
      const response = await request(app).get('/metrics');
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('uptime');
      expect(response.body.data).toHaveProperty('memory');
      expect(response.body.data).toHaveProperty('cpu');
    });
  });
});
