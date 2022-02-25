const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const artists = require('./Routes/artist');
const albums = require('./Routes/album');
const config = require('./config');
const app = express();

const port = 8000;

app.use(cors({origin: 'http://localhost:4200'}));
app.use(express.json());
app.use(express.static('public'));
app.use('/artists', artists);
app.use('/albums', albums);

const run = async () => {
    await mongoose.connect(config.mongo.db, config.mongo.options);

    app.listen(port, () => {
        console.log(`App listen on port ${port}!`);
    });

    process.on('exit', () => {
        mongoose.disconnect();
    });
};

run().catch(e => console.error(e));