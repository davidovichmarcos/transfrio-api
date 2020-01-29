const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../main');
chai.use(chaiHttp);
chai.should();

describe("Driver: ", () => {
    describe("GET /", () => {
        it("should get all the drivers", (done) => {
            chai.request(app)
                .get('/getDrivers')
                .end((err, res) => {
                    res.should.have.status(200);
                    //res.text.should.be.equal('Welcome to a transfrio api')
                    done();
                });
        });
        
        it("should get a driver", (done) => {
            chai.request(app)
                .get('/getDriverById/:id')
                .end((err, res) => {
                    res.should.have.status(200);
                    //res.text.should.be.equal('Welcome to a transfrio api')
                    done();
                });
        });

    });
    describe("POST /", () => {
        it("should create a driver", (done) => {
            const driver = { driverId: "AutomationTest", name: "name", lastName: "lastName", document: "123456", address: "Fake addres 12" }
            chai.request(app)
                .post('/createDriver')
                .send(driver)
                .end((err, res) => {
                    res.should.have.status(201);
                    done();
                });
        })
    })
});