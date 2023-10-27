const router = require("express").Router();
const {
  // authentication import
  signUp,
  employeeSignUp,
  signIn,
  emailVerify,
  resetPassword,
  updatePassword,
  approveUser,
  removeUser,
  passportUpload,
  workpermitUpload,
  securityUpload,
  formDocUpload,
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

const path = require("path");
const multer = require("multer");
// Define the storage engine with a custom filename function
const storage = multer.diskStorage({
  destination: "../chenel-admin-front/public/uploads/",
  filename: function (req, file, cb) {
    // Generate a new filename with the desired file extension
    const fileExtension = path.extname(file.originalname); // Get the original file extension
    const newFilename = Date.now() + fileExtension; // Add a timestamp and the original extension
    cb(null, newFilename);
  },
});
const upload = multer({ storage: storage });

// authentication middle
router.post("/signUp", signUp);
router.post("/signUp/employee", employeeSignUp);
router.post("/signIn", signIn);
router.post("/emailverify", emailVerify);
router.post("/resetpassword", resetPassword);
router.post("/updatepassword/", updatePassword);

router.post("/approveUser", approveUser);
router.post("/removeUser", removeUser);

router.post("/upload/passport", upload.single("passport"), passportUpload);
router.post(
  "/upload/workpermit",
  upload.single("workpermit"),
  workpermitUpload
);
router.post("/upload/security", upload.single("security"), securityUpload);

router.post("/upload/formdoc", upload.single("formdoc"), formDocUpload);

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
