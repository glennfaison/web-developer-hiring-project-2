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
const InsurerSeeder = require('./insurer.seeder');
const createApplication = require('../../app');
const mongooseConfig = require('../../config/mongoose-mock');

const { expect } = chai;
chai.use(chaiHttp);
const app = createApplication();

describe('Insurers Endpoint Test', () => {
  before(async () => {
    await mongooseConfig.init();
  });

  after(async () => {
    await mongooseConfig.closeConnection();
  });

  beforeEach(async () => {
    await mongooseConfig.clearDb();
  });

  describe('POST /api/v1/insurers', () => {
    it('should fail with a status 404, an empty body, and an error', async () => {
      const res = await chai.request(app).post('/api/v1/insurers');
      expect(res.error).to.be.an('error');
      expect(res.body).to.be.empty;
      expect(res).to.have.status(HttpStatus.NOT_FOUND);
    });
  });

  describe('GET /api/v1/insurers', () => {
    it('should fetch all insurers and have a status of 200', async () => {
      const res = await chai.request(app).get('/api/v1/insurers');
      expect(res.error).to.be.false;
      expect(res.body.data).to.be.an('array');
      expect(res).to.have.status(HttpStatus.OK);
    });
  });

  describe('GET /api/v1/insurers/:id', () => {
    it('should fetch insurer details by id if they exist', async () => {
      const [insurer] = await InsurerSeeder.generateAndSave();
      const res = await chai.request(app).get(`/api/v1/insurers/${insurer._id}`);
      expect(res.error).to.be.false;
      expect(res.body.data).to.be.an('object');
      expect(res).to.have.status(HttpStatus.OK);
    });

    it('should return 404 if there\'s no insurer with the given id', async () => {
      const fakeId = crypto.randomBytes(24).toString('hex').substring(0, 24);

      const res = await chai.request(app).get(`/api/v1/insurers/${fakeId}`);
      expect(res.error).to.be.an('error');
      expect(res).to.have.status(HttpStatus.NOT_FOUND);
    });
  });

  describe('PUT /api/v1/insurers/:id', () => {
    it('should return 404 if there\'s no insurer with the given id', async () => {
      const insurer = { companyName: faker.company.companyName() };
      const fakeId = crypto.randomBytes(24).toString('hex').substring(0, 24);
      const res = await chai.request(app).put(`/api/v1/insurers/${fakeId}`).send({ insurer });
      expect(res.error).to.be.an('error');
      expect(res).to.have.status(HttpStatus.NOT_FOUND);
    });

    it('should update insurer information', async () => {
      const [insurer] = await InsurerSeeder.generateAndSave();
      const editedInsurer = { companyName: faker.company.companyName() };
      const res = await chai.request(app).put(`/api/v1/insurers/${insurer._id}`)
        .send({
          insurer: editedInsurer,
        });
      // some properties should not change
      expect(res.body.data._id).to.equal(insurer._id.toString());
      expect(res.body.data.email).to.equal(insurer.email);
      // the remaining properties can change
      expect(res.body.data.companyName).to.equal(editedInsurer.companyName);
      expect(res).to.have.status(HttpStatus.OK);
    });
  });

  describe('DELETE /api/v1/insurers', () => {
    it('should return a status code of 404', async () => {
      const res = await chai.request(app).delete('/api/v1/insurers');
      expect(res.error).to.be.an('error');
      expect(res).to.have.status(HttpStatus.NOT_FOUND);
    });
  });
});
