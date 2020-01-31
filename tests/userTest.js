const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../main');
chai.use(chaiHttp);
chai.should();

describe("Users: ", () => {
    describe("GET /", () => {
        it("should get all the users", (done) => {
            chai.request(app)
                .get('/getUsers')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.text.should.match(/([{\w":.,@}])+/g)
                    done();
                });
        });
        
        it("should get a user", (done) => {
            chai.request(app)
                .get('/getUserById/AutomationTest')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.text.should.includes("username")  
                    res.text.should.includes("email")  
                    done();
                });
        });

    });
    describe("POST /", () => {
        it("should create a user", (done) => {
            const user = { id: "AutomationTest", name: "testAut", email: "test@aut.com" }
            chai.request(app)
                .post('/createUser')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(201);
                    done();
                });
        })
    })
});