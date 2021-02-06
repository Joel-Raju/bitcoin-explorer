import chai from 'chai';
import request from 'supertest';
import app from '../index';
import blockList from './fixture/block-list.fixture';
import transactionDetails from './fixture/transaction-details';

const expect = chai.expect;

describe('API Tests', function () {
  it('should return version number', function (done) {
    request(app)
      .get('/api')
      .end(function (err, res) {
        expect(res.body.version).to.be.ok;
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
});

describe('Block List test', function () {
  it('should return the list of blocks', function (done) {
    request(app)
      .get('/api/blocks')
      .query({ timestamp: 1549313453 })
      .send()
      .end(function (err, res) {
        expect(res.body).to.be.eql(blockList);
        expect(res.statusCode).to.be.equal(200);
        done();
      });
  });
});

describe('Transaction Details test', function () {
  it('should return transaction details', function (done) {
    request(app)
      .get(
        '/api/transactions/c149a2c7623988791a864b52060386ac2cef3aaba12db1ba1cfb53d25bf178de'
      )
      .send()
      .end(function (err, res) {
        expect(res.body).to.be.eql(transactionDetails);
        expect(res.statusCode).to.be.equal(200);
        done();
      });
  });
});
