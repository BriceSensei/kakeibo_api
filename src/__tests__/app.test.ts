import request from 'supertest';
import { app, server } from '../main'; 

// afterAll(() => {
//   server.close(); // Ferme le serveur après tous les tests
// });

describe('GET /metrics', () => {
  it('should return 200 OK for metrics endpoint', async () => {
    const res = await request(app).get('/metrics');
    expect(res.statusCode).toBe(200);
  });
});
