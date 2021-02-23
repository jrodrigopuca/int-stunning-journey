const request = require('supertest');
const app = require('../src/app');
const should = require('should');

/**
 * Consideraciones:
 * - se evalua a cada uno de los endpoints
 * - se considera que se debería devolver con un código 200
 * - se considera que se debería devolver con result verdadero
 */

describe('GET /v1', ()=>{
    it('dar la bienvenida', (done)=>{
        request(app)
            .get('/v1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(res){
                (res.body.result).should.be.true;
            })
            .expect(200, done);
    })
})

describe('GET /v1/location', ()=>{
    it('mostrar la ubicación', (done)=>{
        request(app)
            .get('/v1/location')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(res){
                (res.body.result).should.be.true;
            })
            .expect(200, done)
    })
})

describe('GET /v1/current', ()=>{
    it('traer datos del clima local', (done)=>{
        request(app)
            .get('/v1/current')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(res){
                (res.body.result).should.be.true;
            })
            .expect(200, done);
    })

    it('traer datos del clima de otra ciudad', (done)=>{
        request(app)
            .get('/v1/current/Jujuy')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(res){
                (res.body.result).should.be.true;
            })
            .expect(200, done);
    })
})

describe('GET /v1/forecast', ()=>{
    it('traer datos del pronostico local', (done)=>{
        request(app)
            .get('/v1/forecast')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(res){
                (res.body.result).should.be.true;
            })
            .expect(200, done);
    })

    it('traer datos del pronostico de otra ciudad', (done)=>{
        request(app)
            .get('/v1/forecast/London')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(res){
                (res.body.result).should.be.true;
            })
            .expect(200, done);
    })
})