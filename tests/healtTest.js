// Import the dependencies for testing
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../main');
// Configure chai
chai.use(chaiHttp);
chai.should();
describe("Health", () => {
    describe("GET /", () => {
        it("should get 200 ok response", (done) => {
             chai.request(app)
                 .get('/')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                  });
         });
       
    });
});