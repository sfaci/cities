const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

const app = require('../../app').app;

chai.use(chaiHttp);
chai.should();

describe('cities', () => {
    describe('POST /cities', () => {
        it('should register a new city', (done) => {
            chai.request(app)
                .post('/cities')
                .send({
                    name: 'cityName',
                    population: 100,
                    altitude: 200,
                    foundationDate: '2005-10-10',
                    area: 1000
                })
                .end((error, response) => {
                    response.should.have.status(201);
                    //expect(response.body).to.have.property('id'); // TODO Falta añadir el id en el service
                    expect(response.body).to.have.property('name');
                    expect(response.body).to.have.property('population');
                    expect(response.body).to.have.property('altitude');
                    expect(response.body).to.have.property('foundationDate');
                    expect(response.body).to.have.property('age');
                    expect(response.body).to.have.property('area');
                    expect(response.body).to.have.property('density');
                    done();
                });
        });

        it('validation should fail because name is mandatory', (done) => {
            chai.request(app)
                .post('/cities')
                .send({
                    population: 100,
                    altitude: 200,
                    foundationDate: '2005-10-10',
                    area: 1000
                })
                .end((error, response) => {
                    response.should.have.status(400);
                    expect(response.body.status).to.equal('bad-request');
                    expect(response.body.message).to.equal('name field is mandatory');
                    done();
                });
        });

        it('validation should fail because population must be greater than 0', (done) => {
            chai.request(app)
                .post('/cities')
                .send({
                    name: "cityName",
                    population: 0,
                    altitude: 200,
                    foundationDate: '2005-10-10',
                    area: 1000
                })
                .end((error, response) => {
                    response.should.have.status(400);
                    expect(response.body.status).to.equal('bad-request');
                    expect(response.body.message).to.equal('population must be greater than 0');
                    done();
                });
        });
    });
});

