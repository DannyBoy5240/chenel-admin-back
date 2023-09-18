const router = require("express").Router();
const {
  signUp,
  employeeSignUp,
  signIn,
  passportUpload,
  viewList,
  viewUserDoc,
  viewWriterDoc,
  viewAllDocs,
  addNewUser,
  updateUserWriter,
  updateUserClerk,
} = require("../controllers/user.controller");

// const auth = require("../middleware/auth");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// authentication middle
router.post("/signUp", signUp);
router.post("/signUp/employee", employeeSignUp);
router.post("/signIn", signIn);

router.post("/upload/passport", upload.single("passport"), passportUpload);

// view user info middle
router.post("/userList", viewList);
router.post("/viewdoc", viewUserDoc);
router.post("/viewriterdoc", viewWriterDoc);
router.post("/viewalldocs", viewAllDocs);

router.post("/addNewUser", addNewUser);

router.post("/updateUserWriter", updateUserWriter);
router.post("/updateUserClerk", updateUserClerk);

module.exports = router;
