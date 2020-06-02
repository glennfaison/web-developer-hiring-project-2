const { describe, it } = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const HttpStatus = require('http-status-codes');

const createApplication = require('../../app');

const { expect } = chai;
chai.use(chaiHttp);
const app = createApplication();

describe('ping test', () => {
  describe('POST /api/v1/ping', () => {
    it('should fail with a status 404, an empty body, and an error', async () => {
      const res = await chai.request(app).post('/api/v1/ping');
      expect(res.error).to.be.an('error');
      expect(res.body).to.be.empty;
      expect(res).to.have.status(HttpStatus.NOT_FOUND);
    });
  });

  describe('PUT /api/v1/ping', () => {
    it('should fail with a status 404, an empty body, and an error', async () => {
      const res = await chai.request(app).put('/api/v1/ping');
      expect(res.error).to.be.an('error');
      expect(res.body).to.be.empty;
      expect(res).to.have.status(HttpStatus.NOT_FOUND);
    });
  });

  describe('DELETE /api/v1/ping', () => {
    it('should fail with a status 404, an empty body, and an error', async () => {
      const res = await chai.request(app).delete('/api/v1/ping');
      expect(res.error).to.be.an('error');
      expect(res.body).to.be.empty;
      expect(res).to.have.status(HttpStatus.NOT_FOUND);
    });
  });

  describe('GET /api/v1/ping', () => {
    it('should return a status code of 200', async () => {
      const res = await chai.request(app).get('/api/v1/ping');
      expect(res).to.have.status(HttpStatus.OK);
    });

    it('should return the text \'pong\'', (done) => {
      chai.request(app).get('/api/v1/ping').end((_err, res) => {
        expect(res.text).to.equal('pong');
        done();
      });
    });

    it('should have an empty body', (done) => {
      chai.request(app).get('/api/v1/ping').end((_err, res) => {
        expect(res.body).to.be.empty;
        done();
      });
    });
  });
});
