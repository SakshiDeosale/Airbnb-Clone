const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const dns = require("dns");

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const MONGO_URL = process.env.ATLAS_DB_URL;

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) =>({
    ...obj,
    owner:"6a50c9264c494fbded9f1353"
    }));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();