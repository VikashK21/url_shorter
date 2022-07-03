const router = require("express").Router();
const userCtr = new (require("../controllers/user.controller"))();

router.patch("/", userCtr.addDashboard);
router.patch("/visit", userCtr.visits)  

router.post("/login", userCtr.loginS);

module.exports = router;
    