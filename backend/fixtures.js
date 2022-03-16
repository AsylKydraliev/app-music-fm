const mongoose = require('mongoose');
const {nanoid} = require("nanoid");
const config = require("./config");
const User = require("./models/User");
const Artist = require("./models/Artist");
const Album = require("./models/Album");
const Track = require("./models/Track");

const run = async () => {
    await mongoose.connect(config.mongo.db, config.mongo.options);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    await User.create({
        email: 'user@gmail.com',
        displayName: 'user',
        password: '123',
        token: nanoid(),
        role: 'user',
        avatar: 'user.png',
    }, {
        email: 'admin@gmail.com',
        displayName: 'admin',
        password: '123',
        token: nanoid(),
        role: 'admin',
        avatar: 'user.png',
    });

    const [TheWeekend, KanyeWest, Drake] = await Artist.create({
        title: 'TheWeekend',
        photo: 'weekend.jpeg',
        info: 'The best artist 2020!'
    }, {
        title: 'KanyeWest',
        photo: 'west.jpg',
        info: 'Top performer 2021!'
    }, {
        title: 'Drake',
        photo: 'drake.jpg',
        info: 'Amazing performer 2022!'
    });

    const [Long, Fourth, Songs] = await Album.create({
            title: 'Long story short',
            artist_id: TheWeekend,
            year: '2020',
            image: 'album.jpeg',
        }, {
            title: 'Fourth dimension',
            artist_id: KanyeWest,
            year: '2021',
            image: 'album.jpeg',
        }, {
            title: 'Songs for two',
            artist_id: Drake,
            year: '2022',
            image: 'album.jpeg',
        },
    );

    await Track.create({
            title: 'Commercial brake',
            album: Long,
            duration: '3:16',
        }, {
            title: 'New song',
            album: Fourth,
            duration: '3:20',
        }, {
            title: 'For two song',
            album: Songs,
            duration: '3:21',
        }, {
            title: 'Song for new year',
            album: Long,
            duration: '3:16',
        }, {
            title: 'Song for summer',
            album: Long,
            duration: '3:16',
        }, {
            title: 'Song for autumn',
            album: Long,
            duration: '3:16',
        }, {
            title: 'Song for winter Fourth',
            album: Fourth,
            duration: '3:20',
        },{
            title: 'Song for new year Fourth',
            album: Fourth,
            duration: '3:20',
        }, {
            title: 'Song for summer Fourth',
            album: Fourth,
            duration: '3:20',
        }, {
            title: 'Song for autumn Fourth',
            album: Fourth,
            duration: '3:20',
        }, {
            title: 'For two song Songs',
            album: Songs,
            duration: '3:21',
        },{
            title: 'For child song Songs',
            album: Songs,
            duration: '3:21',
        },{
            title: 'For new year song Songs',
            album: Songs,
            duration: '3:21',
        },{
            title: 'For five song Songs',
            album: Songs,
            duration: '3:21',
        },
    );

    await mongoose.connection.close();
};

run().catch(e => console.error(e));