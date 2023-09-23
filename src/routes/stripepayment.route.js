const router = require("express").Router();
const { stripePayment } = require("../controllers/stripepayment.controller");

router.post("/create-checkout-session", stripePayment);

module.exports = router;
