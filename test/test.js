var co = require('co');

var app = require('../src/app.js');
var request = require('supertest').agent(app.listen());

describe('Albums:', function() {

    it('gets albums', function(done) {
        request
            .get('/albums')
            .expect(200, done);
    });

    it('gets the first album', function(done) {
        co(function *() {
            var albums;
            request
                .get('/albums')
                .end(function(err, res) {
                    albums = res;
                });
            console.log('got %d albums', albums.length);
            request
                .get('/album/' + albums[0].id)
                .expect(200, done);
        });
    });  
});
