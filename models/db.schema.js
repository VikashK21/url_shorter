const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  urls: {
    type: Object
  },
  short_urls: {
    type: Object
  },
  visits: {
    type: Object
  }
});

const User = mongoose.model("USER", userSchema);

module.exports = User;
