const path = require('path');

const rootPath = __dirname;

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, 'public/uploads'),
    mongo: {
        db: 'mongodb://localhost/app-music',
        options: {useNewUrlParser: true},
    },
    facebook: {
        appId: '970259470300289',
        appSecret: 'cf48f1e7fcda38c97c3583357d37a401'
    },
    google: {
        appId: '324167406660-o6ge0kgc0d1vknbjsb1366ao5np0vdns.apps.googleusercontent.com',
        appSecret: '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'
    },
};