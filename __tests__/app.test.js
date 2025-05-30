const request = require('supertest');
const app = require('../app');

describe('GET /', () => {
  it('should return Hello from DevOps Pipeline!', async () => {
    const res = await request(app).get('/');
    expect(res.text).toBe('Hello from DevOps Pipeline!');
    expect(res.statusCode).toBe(200);
  });
});

describe('User API', () => {
  it('GET /users should return users array', async () => {
    const res = await request(app).get('/users');
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.statusCode).toBe(200);
  });

  it('POST /users should create a new user', async () => {
    const res = await request(app)
      .post('/users')
      .send({ username: 'charlie' });
    expect(res.statusCode).toBe(201);
    expect(res.body.username).toBe('charlie');
  });

  it('GET /users/:id should return a user', async () => {
    const res = await request(app).get('/users/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.username).toBeDefined();
  });

  it('PUT /users/:id should update a user', async () => {
    const res = await request(app)
      .put('/users/1')
      .send({ username: 'alice_updated' });
    expect(res.statusCode).toBe(200);
    expect(res.body.username).toBe('alice_updated');
  });

  it('DELETE /users/:id should delete a user', async () => {
    const res = await request(app).delete('/users/2');
    expect(res.statusCode).toBe(204);
  });

  it('POST /login with valid user should return welcome message', async () => {
    const res = await request(app)
      .post('/login')
      .send({ username: 'alice_updated' });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/Welcome, alice_updated!/);
    expect(res.body.token).toBeDefined();
  });

  it('POST /login with invalid user should return 401', async () => {
    const res = await request(app)
      .post('/login')
      .send({ username: 'nonexistent' });
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Invalid credentials');
  });
});
