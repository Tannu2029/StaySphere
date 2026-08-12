if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "../.env" });
}

const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");

const dbUrl = process.env.ATLASDB_URL;

async function main() {
  await mongoose.connect(dbUrl);
}

main()
  .then(() => {
    console.log("Connected to Atlas DB!");
    initDB();
  })
  .catch((err) => {
    console.log("DB Connection Error:", err);
  });

const initDB = async () => {
  await Listing.deleteMany({});
  initdata.data = initdata.data.map((obj) => ({
    ...obj,
    owner: "6a7847a0027ecc3439c329cc", 
  }));
  await Listing.insertMany(initdata.data);
  console.log("Data is initialised in Atlas DB!");
};