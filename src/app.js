var sqlite3 = require('co-sqlite3');

var koa = require('koa');
var koahal = require('koa-hal');
var app = module.exports = koa();
var routes = require('koa-route');

app.use(koahal());

// DB
app.use(function * (next) {
    // TODO: make this configurable
    this.db = yield sqlite3('test/digikam4.db');
    yield next;
});

// Error handling
app.use(function *(next) {
    try {
        yield next;
    } catch (err) {
        this.status = err.status || 500;
        this.body = err.message;
        this.app.emit('error', err, this);
    }
});

app.use(function * (next) {
    yield next;
});

var albumRoutes = require('./routes/albumRoutes.js');
var imageRoutes = require('./routes/imageRoutes.js');
app.use(routes.get('/albums', albumRoutes.all));
app.use(routes.get('/images', imageRoutes.get));
app.use(routes.get('/image/:id', imageRoutes.get));


app.listen(3000);
console.log('Listening on port 3000');
