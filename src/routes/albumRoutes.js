var hal = require('halson');

module.exports = {
    all: function *all() {
        // TODO: ignoring AlbumRoot for now
        var albums = yield this
            .db.all('SELECT id, relativePath, date from Albums')
            .map(function(album) {
                return hal(album)
                    .addLink('self', '/albums/' + album.id)
                    .addLink('images', '/images?album=' + album.id);
            });
        this.body = hal({albums: albums}).addLink('self', '/albums');
    }
}











