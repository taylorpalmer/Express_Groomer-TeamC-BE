const request = require('supertest');
const express = require('express');
const Profiles = require('../../api/groomers/groomerModel');
const profileRouter = require('../../api/groomers/groomerRouter');
const server = express();
server.use(express.json());

jest.mock('../../api/profile/profileModel');
// mock the auth middleware completely
jest.mock('../../api/middleware/authRequired', () =>
  jest.fn((req, res, next) => next())
);

describe('groomers router endpoints', () => {
  beforeAll(() => {
    // This is the module/route being tested
    server.use(['/profile', '/groomers'], profileRouter);
    jest.clearAllMocks();
  });

  describe('GET /groomers', () => {
    it('should return 200', async () => {
      Profiles.findAll.mockResolvedValue([]);
      const res = await request(server).get('/groomers');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(0);
      expect(Profiles.findAll.mock.calls.length).toBe(1);
    });
  });

  describe('GET /groomers/:id', () => {
    it('should return 200 when profile found', async () => {
      Profiles.findById.mockResolvedValue({
        id: 1,
        name: 'Louie',
        lastname: 'Smith',
        description: 'fdasdfasdfas fasd asdf as ',
        address: '23 Hellen Rd',
        zip: '23442552',
        phone: '3453556636',
        email: 'louie@example.com',
        city: 'Atlanta',
        state: 'Georgia',
        country: 'USA',
        photo_url: 'https://someplace.com/pic.jpg',
        walk_rate: '1200',
        day_care_rate: '14000',
        vet_visit_rate: '1200',
      });
      const res = await request(server).get('/groomers/1');

      expect(res.status).toBe(200);
      expect(res.body.name).toBe('Louie Smith');
      expect(res.body.lastname).toBe('Smith');
      expect(res.body.address).toBe('23 Hellen Rd');
      expect(res.body.zip).toBe('23442552');
      expect(res.body.phone).toBe('3453556636');
      expect(res.body.city).toBe('Atlanta');
      expect(res.body.state).toBe('Georgia');
      expect(res.body.country).toBe('USA');
      expect(res.body.photo_url).toBe('https://someplace.com/pic.jpg');
      expect(res.body.walk_rate).toBe('1200');
      expect(res.body.day_care_rate).toBe('14000');
      expect(res.body.vet_visit_rate).toBe('1200');
      expect(Profiles.findById.mock.calls.length).toBe(1);
    });

    it('should return 404 when no user found', async () => {
      Profiles.findById.mockResolvedValue();
      const res = await request(server).get('/groomers/1');

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('ProfileNotFound');
    });
  });

  describe('POST /groomers', () => {
    it('should return 200 when profile is created', async () => {
      const groomer = {
        name: 'John',
        lastname: 'Doe',
        description: 'fdasdfasdfas fasd asdf as ',
        address: '2 Cassiopeia Rd',
        zip: '23485552',
        phone: '3453796636',
        email: 'john@example.com',
        city: 'Atlanta',
        state: 'Georgia',
        country: 'USA',
        photo_url: 'https://someplace.com/pic.jpg',
        walk_rate: '1200',
        day_care_rate: '14000',
        vet_visit_rate: '1200',
      };
      Profiles.findById.mockResolvedValue(undefined);
      Profiles.create.mockResolvedValue([
        Object.assign({ id: '1000' }, groomer),
      ]);
      const res = await request(server).post('/customers').send(groomer);

      expect(res.status).toBe(200);
      expect(res.body.groomers.id).toBe('1000');
      expect(Profiles.create.mock.calls.length).toBe(1);
    });
  });

  describe('PUT /groomers', () => {
    it('should return 200 when profile is created', async () => {
      const groomer = {
        name: 'OtherName',
      };
      Profiles.findById.mockResolvedValue(groomer);
      Profiles.update.mockResolvedValue([groomer]);

      const res = await request(server).put('/groomers/').send(groomer);
      expect(res.status).toBe(200);
      expect(res.body.profile.name).toBe('OtherName');
      expect(Profiles.update.mock.calls.length).toBe(1);
    });
  });
});
