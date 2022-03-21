const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    artist_id: {
        type: Schema.Types.ObjectId,
        ref: 'Artist',
        required: true
    },
    year: String,
    image: String,
    isPublished: {
        type: Boolean,
        required: true,
        default: false,
    }
});

const Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;