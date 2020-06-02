const crypto = require('crypto');
const {
  describe,
  it,
  before,
  after,
  beforeEach,
} = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const HttpStatus = require('http-status-codes');
const faker = require('faker');
const UserSeeder = require('./user.seeder');
const createApplication = require('../../app');
const mongooseConfig = require('../../config/mongoose-mock');

const { expect } = chai;
chai.use(chaiHttp);
const app = createApplication();

describe('Users Endpoint Test', () => {
  before(async () => {
    await mongooseConfig.init();
  });

  after(async () => {
    await mongooseConfig.closeConnection();
  });

  beforeEach(async () => {
    await mongooseConfig.clearDb();
  });

  describe('POST /api/v1/users', () => {
    it('should fail with a status 404, an empty body, and an error', async () => {
      const res = await chai.request(app).post('/api/v1/users');
      expect(res.error).to.be.an('error');
      expect(res.body).to.be.empty;
      expect(res).to.have.status(HttpStatus.NOT_FOUND);
    });
  });

  describe('GET /api/v1/users', () => {
    it('should fetch all users and have a status of 200', async () => {
      const res = await chai.request(app).get('/api/v1/users');
      expect(res.error).to.be.false;
      expect(res.body.data).to.be.an('array');
      expect(res).to.have.status(HttpStatus.OK);
    });
  });

  describe('GET /api/v1/users/:id', () => {
    it('should fetch user details by id if they exist', async () => {
      const [user] = await UserSeeder.generateAndSave();
      const res = await chai.request(app).get(`/api/v1/users/${user._id}`);
      expect(res.error).to.be.false;
      expect(res.body.data).to.be.an('object');
      expect(res).to.have.status(HttpStatus.OK);
    });

    it('should return 404 if there\'s no user with the given id', async () => {
      const fakeId = crypto.randomBytes(24).toString('hex').substring(0, 24);

      const res = await chai.request(app).get(`/api/v1/users/${fakeId}`);
      expect(res.error).to.be.an('error');
      expect(res).to.have.status(HttpStatus.NOT_FOUND);
    });
  });

  describe('PUT /api/v1/users/:id', () => {
    it('should return 404 if there\'s no user with the given id', async () => {
      const user = { displayName: faker.internet.userName() };
      const fakeId = crypto.randomBytes(24).toString('hex').substring(0, 24);
      const res = await chai.request(app).put(`/api/v1/users/${fakeId}`).send({ user });
      expect(res.error).to.be.an('error');
      expect(res).to.have.status(HttpStatus.NOT_FOUND);
    });

    it('should update user information', async () => {
      const [user] = await UserSeeder.generateAndSave();
      const editedUser = { firstName: faker.name.firstName() };
      const res = await chai.request(app).put(`/api/v1/users/${user._id}`)
        .send({
          user: editedUser,
        });
      // some properties should not change
      expect(res.body.data._id).to.equal(user._id.toString());
      expect(res.body.data.email).to.equal(user.email);
      // the remaining properties can change
      expect(res.body.data.firstName).to.equal(editedUser.firstName);
      expect(res).to.have.status(HttpStatus.OK);
    });
  });

  describe('DELETE /api/v1/users', () => {
    it('should return a status code of 404', async () => {
      const res = await chai.request(app).delete('/api/v1/users');
      expect(res.error).to.be.an('error');
      expect(res).to.have.status(HttpStatus.NOT_FOUND);
    });
  });
});
