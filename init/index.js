const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");

const Mongo_URL = "mongodb://127.0.0.1:27017/StaySphere";

main()
   .then(() => {
    console.log("Connected to DB!");
   }).catch(err => {
    console.log(err);
   });

async function main() {
    await mongoose.connect(Mongo_URL);
}


const initDB = async () => {
    await Listing.deleteMany({});
    initdata.data = initdata.data.map((obj) => ({
        ...obj,
        owner: "6a7847a0027ecc3439c329cc",
    }));
    await Listing.insertMany(initdata.data);
    console.log("data is initialised!");
}
initDB();