process.env.NODE_ENV = 'test';

var expect  = require('chai').expect;
var request = require('request');

it('Get campaigns', function(done) {
    request('http://localhost:8000/api/get-campaigns' , function(error, response, body) {
        var res = JSON.parse(response.body)

        expect(response.statusCode).to.equal(200);
        expect(res.campaigns).to.be.a('array');

        done();
    });
});


it('Get campaign', function(done) {
    request('http://localhost:8000/api/get-campaign/1' , function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
    });
});
