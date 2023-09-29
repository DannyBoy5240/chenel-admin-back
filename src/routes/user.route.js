const router = require("express").Router();
const {
  // authentication import
  signUp,
  employeeSignUp,
  signIn,
  emailVerify,
  approveUser,
  removeUser,
  passportUpload,
  workpermitUpload,
  securityUpload,
  contactUs,
  getDocuments,
  //
  viewList,
  viewUserDoc,
  viewWriterDoc,
  viewAllDocs,
  getUserDocStatus,
  //
  addNewUser,
  userSubmitDoc,
  updateUserWriter,
  updateUserClerk,
  updateWriterDoc,
} = require("../controllers/user.controller");

// const auth = require("../middleware/auth");

const multer = require("multer");
const upload = multer({ dest: "../chenel-admin-front/public/uploads/" });

// authentication middle
router.post("/signUp", signUp);
router.post("/signUp/employee", employeeSignUp);
router.post("/signIn", signIn);
router.post("/emailverify", emailVerify);

router.post("/approveUser", approveUser);
router.post("/removeUser", removeUser);

router.post("/upload/passport", upload.single("passport"), passportUpload);
router.post("/upload/workpermit", upload.single("workpermit"), workpermitUpload);
router.post("/upload/security", upload.single("security"), securityUpload);

router.post("/contactus", contactUs);
router.post("/getdocuments", getDocuments);

// view user info middle
router.post("/userList", viewList);
router.post("/viewdoc", viewUserDoc);
router.post("/viewriterdoc", viewWriterDoc);
router.post("/viewalldocs", viewAllDocs);
router.post("/getuserdocstatus", getUserDocStatus);

router.post("/addNewUser", addNewUser);
router.post("/usersubmitdoc", userSubmitDoc);

router.post("/updateUserWriter", updateUserWriter);
router.post("/updateUserClerk", updateUserClerk);

router.post("/updatewriterdoc", updateWriterDoc);

module.exports = router;
