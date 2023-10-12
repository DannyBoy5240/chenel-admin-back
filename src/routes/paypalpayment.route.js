const router = require("express").Router();
const { paypalPayment, paypalPaymentSuccess, paypalPaymentCancel } = require("../controllers/paypalpayment.controller");

router.post("/makePayment", paypalPayment);
router.get("/success", paypalPaymentSuccess);
router.get("/cancel", paypalPaymentCancel);

module.exports = router;
