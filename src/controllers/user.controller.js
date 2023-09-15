const User = require("../models/user.model");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// User Customer SignUp Handler
const signUp = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const isExistingUser = await User.findOne({ email });

    if (isExistingUser) {
      return res.status(200).json({
        success: false,
        message: "User already exists!",
      });
    }

    await User.create({
      email,
      fullName,
      password,
    });

    // send email verification link to email
    // const transporter = nodemailer.createTransport({
    //   // Configure the email transporter (e.g., Gmail, SMTP server)
    //   // ...
    //   host: "smtp.gmail.com",
    //   port: 587,
    //   secure: false,
    //   auth: {
    //     user: "ngyentuandev@gmail.com",
    //     pass: "flztqkcsxpgxgdtc",
    //   },
    // });

    // const token = crypto.randomBytes(20).toString("hex"); // Generate a random token

    // // Send the verification email
    // const mailOptions = {
    //   from: "chenel@service.com",
    //   to: email,
    //   subject: "Email Verification",
    //   text: `Click the following link to verify your email: http://localhost:3000/verify-email/${token}`,
    // };

    // transporter.sendMail(mailOptions, (error, info) => {
    //   if (error) {
    //     console.log(error);
    //     res.status(500).send("Email sending failed.");
    //   } else {
    //     console.log("Email sent: " + info.response);
    //     res.status(200).send("Verification email sent.");
    //   }
    // });

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Company Employee SignUp Handler
const employeeSignUp = async (req, res) => {
  const {
    fullName,
    email,
    password,
    gender,
    birthday,
    phoneNumber,
    address,
    relationship,
    roles,
  } = req.body;

  try {
    const isExistingUser = await User.findOne({ email });

    if (isExistingUser) {
      return res.status(200).json({
        success: false,
        message: "User already exists",
      });
    }

    await User.create({
      email,
      fullName,
      password,
      gender,
      birthday,
      phoneNumber,
      address,
      relationship,
      roles,
    });

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// SignIn Handler
const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(200).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.password !== password) {
      return res.status(200).json({
        success: false,
        message: "Password is incorrect",
      });
    }

    // if (user.email_verified == false) {
    //   return res.status(200).json({
    //     success: false,
    //     message: "Email is not verified",
    //   });
    // }

    if (user.member_status !== "ACTIVATE") {
      return res.status(200).json({
        success: false,
        message: `Your account is on ${user.member_status}`,
      });
    }

    return res.status(200).json({
      success: true,
      roles: user.roles,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Passport Upload
const passportUpload = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // The uploaded file can be accessed as req.file
  const uploadedFile = req.file;
  const fileName = uploadedFile.filename;
  const email = req.body.email;

  console.log("email -> ", email, " name -> ", fileName);

  try {
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { avatar: fileName },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

  // res
  //   .status(200)
  //   .json({ message: "File uploaded successfully", file: uploadedFile });
};

module.exports = {
  signUp,
  employeeSignUp,
  signIn,
  passportUpload,
};
