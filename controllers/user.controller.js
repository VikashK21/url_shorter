const userC = new (require("../services/user.service"))();

class userCtr {
  loginS = async (req, res) => {
    try {
      const result = await userC.login(req.body);
      console.log(result);
      res.status(202).json(result);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

  addDashboard = async (req, res) => {
    try {
      const result = await userC.addingDash(req.body);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

  visits = async (req, res) => {
    try {
      const result = await userC.visits(req.body);
      res.status(202).json(result);
    } catch (err) {
      res.statu(400).json(err.message);
    }
  };
}

module.exports = userCtr;
