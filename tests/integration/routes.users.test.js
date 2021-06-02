const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const db = require("../../db/connection");


const server = require('../../server');

describe('routes : users', () => {

  beforeEach(() => {

    // return db.sequelize.sync();
  });

  afterEach(() => {
    
// return db.sequelize.sync();
  });

  describe('GET /users/userid/{id}', () => {
    it('should get user details with specific id', (done) => {
      chai.request(server)
      .get('/users/userid/1')
      .send({
        id:1
      })
      .end((err, res) => {
        should.not.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(200);
        res.type.should.eql('application/json');
        // res.body.status.should.eql('success');
        done();
      });
    });
  });
})