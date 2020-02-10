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
                    res.text.should.match(/([{\w":.,@}])+/g)
                    done();
                });
        });
        
        it("should get a driver", (done) => {
            chai.request(app)
                .get('/getDriverById/-M-Qzy8qLVwxMx6xMY62')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.text.should.includes("name")  
                    res.text.should.includes("lastName")  
                    res.text.should.includes("document")  
                    res.text.should.includes("address")  
                    done();
                });
        });

    });
    describe("POST /", () => {
        it("should create a driver", (done) => {
            const driver = { name: "name", lastName: "lastName", document: "123456", address: "Fake addres 12", phone: "1234567" }
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