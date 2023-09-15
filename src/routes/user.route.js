const router = require("express").Router();
const {
  signUp,
  employeeSignUp,
  signIn,
  passportUpload,
} = require("../controllers/user.controller");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post("/signUp", signUp);
router.post("/signUp/employee", employeeSignUp);
router.post("/signIn", signIn);

router.post("/upload/passport", upload.single("passport"), passportUpload);

module.exports = router;
