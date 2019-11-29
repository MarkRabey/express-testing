const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('Server', () => {
  describe('GET /', () => {
    it('it should return a message that the server has started', done => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').eql('Server is online');
          done();
        });
    })
  });
})