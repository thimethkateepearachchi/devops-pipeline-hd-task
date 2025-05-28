const request = require('supertest');
const app = require('../app'); // Import only the app

describe('GET /', () => {
  it('should return Hello from DevOps Pipeline!', async () => {
    const res = await request(app).get('/');
    expect(res.text).toBe('Hello from DevOps Pipeline!');
    expect(res.statusCode).toBe(200);
  });
});
