const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../main');
chai.use(chaiHttp);
chai.should();

describe("Trucks: ", () => {
    describe("GET /", () => {
        it("should get all the trucks", (done) => {
            chai.request(app)
                .get('/getTrucks')
                .end((err, res) => {
                    res.should.have.status(200);
                    //res.text.should.be.equal('Welcome to a transfrio api')
                    done();
                });
        });
        
        it("should get a truck", (done) => {
            chai.request(app)
                .get('/getTruckById/:id')
                .end((err, res) => {
                    res.should.have.status(200);
                    //res.text.should.be.equal('Welcome to a transfrio api')
                    done();
                });
        });

    });
    describe("POST /", () => {
        it("should create a truck", (done) => {
            const truck = { id: "AutomationTest", brand: "Suzuki", licensePlate: "ABC123", model:"Grand Vitara", year:"1999" }
            chai.request(app)
                .post('/createTruck')
                .send(truck)
                .end((err, res) => {
                    res.should.have.status(201);
                    done();
                });
        })
    })
});