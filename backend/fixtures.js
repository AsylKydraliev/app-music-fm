const mongoose = require('mongoose');
const {nanoid} = require("nanoid");
const config = require("./config");
const User = require("./models/User");
const Artist = require("./models/Artist");

const run = async () => {
  await mongoose.connect(config.mongo.db, config.mongo.options);

  const collections = await mongoose.connection.db.listCollections().toArray();

  for (const coll of collections) {
    await mongoose.connection.db.dropCollection(coll.name);
  }

  const [user, admin] = await User.create({
    email: 'user@gmail.com',
    name: 'user',
    password: '123',
    token: nanoid(),
  }, {
    email: 'admin@gmail.com',
    name: 'admin',
    password: '123',
    token: nanoid(),
  });

  const [cpu, hdd, gpu] = await Artist.create({
    title: 'CPUs',
  }, {
    title: 'HDDs',
  }, {
    title: 'GPUs',
  });

  await Product.create({
    user: user,
    category: cpu,
    title: 'Intel Core i7 10700 KF',
    price: 500,
    description: '8 Cores / 16 Threads, Socket Type LGA 1200, Up to 5.1 GHz Unlocked',
    image: 'cpu.png'
  }, {
    user: admin,
    category: hdd,
    title: 'Seagate BarraCuda 4TB',
    price: 90,
    description: 'Store more, compute faster, and do it confidently with the proven reliability of BarraCuda internal hard drives',
    image: 'cpu.png'
  }, {
    user: user1,
    category: gpu,
    title: 'Gigabyte Nvidia GeForce RTX 3070 Vision OC',
    price: 1000,
    description: 'Powerful GeForce RTX™ 30 VISION series accelerates your work with incredible boosts in performance',
    image: 'cpu.png'
  });

  await mongoose.connection.close();
};

run().catch(e => console.error(e));