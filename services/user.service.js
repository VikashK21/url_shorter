require("../models/db.config");
const User = require("../models/db.schema");

class userServ {
  async login(data) {
    try {
      const result = await User.findOne({ email: data.email });
      if (result) {
        return { result, msg: "You are successfully Logged In." };
      }
      const user = new User({ ...data, urls: [], short_urls: [], visits: [] });
      const result2 = await user.save();
      return {
        result2,
        msg: "Your account created and successfully Logged In."
      };
    } catch (err) {
      return err.message;
    }
  }

  async addingDash(data) {
    try {
      const { email } = data;
      const result2 = await User.findOne({ email });
      if (
        result2.urls.includes(data.urls) ||
        result2.short_urls.includes(data.short_urls)
      ) {
        console.log("already exits!!");
        return "The url or the short-url already exits!";
      }
      data = {
        urls: [...result2.urls, data.urls],
        short_urls: [...result2.short_urls, data.short_urls],
        visits: [...result2.visits, 0]
      };
      const result = await User.updateOne({ email }, data);
      return result;
    } catch (err) {
      return err.message;
    }
  }

  async visits(data) {
    try {
      const { email, visits } = data;
      const result2 = await User.findOne({ email });
      let visits2 = result2.visits;
      visits2[visits] = visits2[visits] + 1;
      const result = await User.updateOne({ email }, { visits: visits2 });
      return result;
    } catch (err) {
      return err.message;
    }
  }
}

module.exports = userServ;
