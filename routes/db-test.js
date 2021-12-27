const mongoose = require('mongoose');

const connect = async (dbName) => {
  await mongoose.disconnect();

  const url = `mongodb://telmo:secret@127.0.0.1:27017/${dbName}?authSource=admin`;
  await mongoose.connect(url, { useNewUrlParser: true });
};

// Remove and close the database and server.
const close = async () => {
  await mongoose.disconnect();

  console.log('closing db');
};

// Remove all data from collections
const clear = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany();
  }
};

module.exports = {
  connect,
  close,
  clear,
};
