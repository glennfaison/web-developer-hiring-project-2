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
const ClientSeeder = require('./client.seeder');
const createApplication = require('../../app');
const mongooseConfig = require('../../config/mongoose-mock');

const { expect } = chai;
chai.use(chaiHttp);
const app = createApplication();

describe('Clients Endpoint Test', () => {
  before(async () => {
    await mongooseConfig.init();
  });

  after(async () => {
    await mongooseConfig.closeConnection();
  });

  beforeEach(async () => {
    await mongooseConfig.clearDb();
  });

  describe('POST /api/v1/clients', () => {
    it('should fail with a status 404, an empty body, and an error', async () => {
      const res = await chai.request(app).post('/api/v1/clients');
      expect(res.error).to.be.an('error');
      expect(res.body).to.be.empty;
      expect(res).to.have.status(HttpStatus.NOT_FOUND);
    });
  });

  describe('GET /api/v1/clients', () => {
    it('should fetch all clients and have a status of 200', async () => {
      const res = await chai.request(app).get('/api/v1/clients');
      expect(res.error).to.be.false;
      expect(res.body.data).to.be.an('array');
      expect(res).to.have.status(HttpStatus.OK);
    });
  });

  describe('GET /api/v1/clients/:id', () => {
    it('should fetch client details by id if they exist', async () => {
      const [client] = await ClientSeeder.generateAndSave();
      const res = await chai.request(app).get(`/api/v1/clients/${client._id}`);
      expect(res.error).to.be.false;
      expect(res.body.data).to.be.an('object');
      expect(res).to.have.status(HttpStatus.OK);
    });

    it('should return 404 if there\'s no client with the given id', async () => {
      const fakeId = crypto.randomBytes(24).toString('hex').substring(0, 24);

      const res = await chai.request(app).get(`/api/v1/clients/${fakeId}`);
      expect(res.error).to.be.an('error');
      expect(res).to.have.status(HttpStatus.NOT_FOUND);
    });
  });

  describe('PUT /api/v1/clients/:id', () => {
    it('should return 404 if there\'s no client with the given id', async () => {
      const client = { fullName: faker.name.lastName() };
      const fakeId = crypto.randomBytes(24).toString('hex').substring(0, 24);
      const res = await chai.request(app).put(`/api/v1/clients/${fakeId}`).send({ client });
      expect(res.error).to.be.an('error');
      expect(res).to.have.status(HttpStatus.NOT_FOUND);
    });

    it('should update client information', async () => {
      const [client] = await ClientSeeder.generateAndSave();
      const editedClient = { fullName: faker.name.firstName() };
      const res = await chai.request(app).put(`/api/v1/clients/${client._id}`)
        .send({
          client: editedClient,
        });
      // some properties should not change
      expect(res.body.data._id).to.equal(client._id.toString());
      expect(res.body.data.email).to.equal(client.email);
      // the remaining properties can change
      expect(res.body.data.fullName).to.equal(editedClient.fullName);
      expect(res).to.have.status(HttpStatus.OK);
    });
  });

  describe('DELETE /api/v1/clients', () => {
    it('should return a status code of 404', async () => {
      const res = await chai.request(app).delete('/api/v1/clients');
      expect(res.error).to.be.an('error');
      expect(res).to.have.status(HttpStatus.NOT_FOUND);
    });
  });
});
