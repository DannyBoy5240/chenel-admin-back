const router = require("express").Router();
const { signUp } = require("../controllers/user.controller");

router.post("/signUp", signUp);

module.exports = router;
