const request = require('supertest');
const app = require('../src/server');

let server;

beforeAll((done) => {
  server = app.listen(0, done);
});

afterAll((done) => {
  server.close(done);
});

describe('Health Routes', () => {
  test('GET /api/health returns healthy status', async () => {
    const res = await request(server).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('healthy');
    expect(res.body).toHaveProperty('uptime');
  });

  test('GET /api/health/live returns alive', async () => {
    const res = await request(server).get('/api/health/live');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('alive');
  });

  test('GET /api/health/ready returns ready', async () => {
    const res = await request(server).get('/api/health/ready');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ready');
  });
});

describe('Tasks Routes', () => {
  test('GET /api/tasks returns list', async () => {
    const res = await request(server).get('/api/tasks');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('tasks');
    expect(Array.isArray(res.body.tasks)).toBe(true);
  });

  test('POST /api/tasks creates a task', async () => {
    const res = await request(server)
      .post('/api/tasks')
      .send({ title: 'Test task', priority: 'high' });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test task');
    expect(res.body).toHaveProperty('id');
  });

  test('POST /api/tasks without title returns 400', async () => {
    const res = await request(server).post('/api/tasks').send({});
    expect(res.statusCode).toBe(400);
  });

  test('GET /api/tasks/:id returns 404 for invalid id', async () => {
    const res = await request(server).get('/api/tasks/invalid-id-000');
    expect(res.statusCode).toBe(404);
  });
});

describe('System Route', () => {
  test('GET /api/system returns system info', async () => {
    const res = await request(server).get('/api/system');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('memory');
    expect(res.body).toHaveProperty('cpus');
  });
});
