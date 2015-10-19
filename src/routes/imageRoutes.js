module.exports = {
    get: function *get() {
        if(!!this.request.query.album) {
            var images = yield this.db.all('SELECT id, name, status, category, modificationDate, fileSize from Images where album = ?', this.request.query.album);
            if(!images || images.length == 0) {
                this.throw('album not found', 404);
            }
        }
        else {
            this.throw('album id neded [?album=<id>]', 400);
        }
    }
}
