const mongoose = require("mongoose");
// require("dotenv").config({ path: "../.env" });
const DB = process.env.DB;


mongoose
  .connect(DB)
  .then(() => {
    console.log("Connected to the Database.");
  })
  .catch(err => {
    console.log("Connection Failed", err);
  });
