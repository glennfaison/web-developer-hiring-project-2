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
const clientSeeder = require('../client/client.seeder');
const createApplication = require('../../app');
const mongooseConfig = require('../../config/mongoose-mock');

const { expect } = chai;
chai.use(chaiHttp);
const app = createApplication();

describe('Auth Endpoint Test', () => {
  before(async () => {
    await mongooseConfig.init();
  });

  after(async () => {
    await mongooseConfig.closeConnection();
  });

  beforeEach(async () => {
    await mongooseConfig.clearDb();
  });

  describe('POST /api/v1/auth/register', () => {
    it('should fail to register without the \'email\' field', async () => {
      const [client] = await clientSeeder.generate();
      delete client.email;
      const res = await chai.request(app).post('/api/v1/auth/register')
        .send({ client });
      expect(res.error).to.be.an('error');
      expect(res).to.have.status(HttpStatus.UNPROCESSABLE_ENTITY);
    });

    it('should fail to register without the \'password\' field', async () => {
      const [client] = await clientSeeder.generate();
      delete client.password;
      const res = await chai.request(app).post('/api/v1/auth/register')
        .send({ client });
      expect(res.error).to.be.an('error');
      expect(res).to.have.status(HttpStatus.UNPROCESSABLE_ENTITY);
    });

    it('should register a client', async () => {
      const [client] = await clientSeeder.generate();
      const res = await chai.request(app).post('/api/v1/auth/register')
        .send({ client });
      expect(res.error).to.be.false;
      expect(res.body.data).to.have.property('email');
      expect(res.body.data.email).to.equal(client.email);
      expect(res).to.have.status(HttpStatus.CREATED);
    });
  });

  describe('PUT /api/v1/auth/login', () => {
    it('should fail to sign a client in without the \'email\' field', async () => {
      const [client] = await clientSeeder.generateAndSave();
      delete client.email;
      const res = await chai.request(app).put('/api/v1/auth/login')
        .send({ client });
      expect(res.error).to.be.an('error');
      expect(res).to.have.status(HttpStatus.UNPROCESSABLE_ENTITY);
    });

    it('should fail to sign a client in without the \'password\' field', async () => {
      const [client] = await clientSeeder.generateAndSave();
      delete client.password;
      const res = await chai.request(app).put('/api/v1/auth/login')
        .send({ client });
      expect(res.error).to.be.an('error');
      expect(res).to.have.status(HttpStatus.UNPROCESSABLE_ENTITY);
    });

    it('should fail to sign in a client in with an \'email\' field that doesn\'t exist in the database', async () => {
      const [client] = await clientSeeder.generateAndSave();
      client.email = faker.internet.email();
      const res = await chai.request(app).put('/api/v1/auth/login')
        .send({ client });
      expect(res.error).to.be.an('error');
      expect(res).to.have.status(HttpStatus.UNPROCESSABLE_ENTITY);
    });

    it('should fail to sign in a client in with the wrong \'password\' field', async () => {
      const [client] = await clientSeeder.generateAndSave();
      client.password = faker.internet.password();
      const res = await chai.request(app).put('/api/v1/auth/login')
        .send({ client });
      expect(res.error).to.be.an('error');
      expect(res).to.have.status(HttpStatus.UNPROCESSABLE_ENTITY);
    });

    it('should sign in a client in', async () => {
      const [client] = await clientSeeder.generateAndSave();
      const res = await chai.request(app).put('/api/v1/auth/login')
        .send({ client });
      expect(res.error).to.be.false;
      expect(res.body.data).to.have.property('authToken');
      expect(res.body.data).to.have.property('client');
      expect(res).to.have.status(HttpStatus.OK);
    });
  });
});
