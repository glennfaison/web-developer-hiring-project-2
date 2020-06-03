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
const PremiumSeeder = require('./premium.seeder');
const InsurerSeeder = require('../insurer/insurer.seeder');
const createApplication = require('../../app');
const mongooseConfig = require('../../config/mongoose-mock');

const { expect } = chai;
chai.use(chaiHttp);
const app = createApplication();

describe('Premiums Endpoint Test', () => {
  before(async () => {
    await mongooseConfig.init();
  });

  after(async () => {
    await mongooseConfig.closeConnection();
  });

  beforeEach(async () => {
    await mongooseConfig.clearDb();
  });

  describe('POST /api/v1/premiums', () => {
    it('should fail with a status 404, an empty body, and an error', async () => {
      const res = await chai.request(app).post('/api/v1/premiums');
      expect(res.error).to.be.an('error');
      expect(res.body).to.be.empty;
      expect(res).to.have.status(HttpStatus.NOT_FOUND);
    });
  });

  describe('GET /api/v1/premiums', () => {
    it('should fetch all premiums and have a status of 200', async () => {
      const res = await chai.request(app).get('/api/v1/premiums');
      expect(res.error).to.be.false;
      expect(res.body.data).to.be.an('array');
      expect(res).to.have.status(HttpStatus.OK);
    });
  });

  describe('GET /api/v1/premiums/:id', () => {
    it('should fetch premium details by id if they exist', async () => {
      await InsurerSeeder.generateAndSave();
      const [premium] = await PremiumSeeder.generateAndSave();
      const res = await chai.request(app).get(`/api/v1/premiums/${premium._id}`);
      expect(res.error).to.be.false;
      expect(res.body.data).to.be.an('object');
      expect(res).to.have.status(HttpStatus.OK);
    });

    it('should return 404 if there\'s no premium with the given id', async () => {
      const fakeId = crypto.randomBytes(24).toString('hex').substring(0, 24);

      const res = await chai.request(app).get(`/api/v1/premiums/${fakeId}`);
      expect(res.error).to.be.an('error');
      expect(res).to.have.status(HttpStatus.NOT_FOUND);
    });
  });

  describe('PUT /api/v1/premiums/:id', () => {
    it('should return 404 if there\'s no premium with the given id', async () => {
      const premium = { paymentAmount: faker.random.number() };
      const fakeId = crypto.randomBytes(24).toString('hex').substring(0, 24);
      const res = await chai.request(app).put(`/api/v1/premiums/${fakeId}`).send({ premium });
      expect(res.error).to.be.an('error');
      expect(res).to.have.status(HttpStatus.NOT_FOUND);
    });

    it('should update premium information', async () => {
      const [premium] = await PremiumSeeder.generateAndSave();
      const editedPremium = { paymentAmount: faker.random.number() };
      const res = await chai.request(app).put(`/api/v1/premiums/${premium._id}`)
        .send({
          premium: editedPremium,
        });
      // some properties should not change
      expect(res.body.data._id).to.equal(premium._id.toString());
      expect(res.body.data.email).to.equal(premium.email);
      // the remaining properties can change
      expect(res.body.data.companyName).to.equal(editedPremium.companyName);
      expect(res).to.have.status(HttpStatus.OK);
    });
  });

  describe('DELETE /api/v1/premiums', () => {
    it('should return a status code of 404', async () => {
      const res = await chai.request(app).delete('/api/v1/premiums');
      expect(res.error).to.be.an('error');
      expect(res).to.have.status(HttpStatus.NOT_FOUND);
    });
  });
});
