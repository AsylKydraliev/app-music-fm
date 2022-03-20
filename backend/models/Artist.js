const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    photo: String,
    info: String,
    isPublished: {
        type: Boolean,
        default: false,
    }
});

const Artist = mongoose.model('Artist', ArtistSchema);

module.exports = Artist;