const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

let mongodbUrl = "mongodb://localhost:27017/DesaPulauBuaya";

async function connectToDatabase() {
  if (process.env.DB_CONNECT) {
    mongodbUrl = `${process.env.DB_CONNECT}`;
  }
  mongoose.connect(
    mongodbUrl,
    {
      useNewUrlParser: true,
    },
    () => console.log("Connected to database")
  );
}

module.exports = {
  connectToDatabase: connectToDatabase,
};
