const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../main');
chai.use(chaiHttp);
chai.should();

describe("Health:", () => {
    describe("GET /", () => {
        it("should get 200 ok response", (done) => {
            chai.request(app)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.text.should.be.equal('Welcome to a transfrio api')
                    done();
                });
        });

    });
});