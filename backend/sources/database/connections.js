const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // mongodb connection string
    const con = await mongoose.connect(process.env.mongo_uri);
    console.log(`MongoDB connected on: ${con.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
