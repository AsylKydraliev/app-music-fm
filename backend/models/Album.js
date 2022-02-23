const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    artist_id: {
        type: String,
        required: true
    },
    year: String,
    image: String
});

const Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;