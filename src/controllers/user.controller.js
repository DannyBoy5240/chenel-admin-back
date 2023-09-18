const User = require("../models/user.model");
const UserDoc = require("../models/userdoc.model");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

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

    const salt = await bcrypt.genSalt(10);
    const en_password = await bcrypt.hash(password, salt);

    // new User create
    await User.create({
      email,
      fullName,
      password: en_password,
    });

    // new UserDoc create
    await UserDoc.create({
      email,
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

    const salt = await bcrypt.genSalt(10);
    const en_password = await bcrypt.hash(password, salt);

    await User.create({
      email,
      fullName,
      password: en_password,
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

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
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

    // if (user.member_status !== "ACTIVATE") {
    //   return res.status(200).json({
    //     success: false,
    //     message: `Your account is on ${user.member_status}`,
    //   });
    // }

    // jwt
    const payload = {
      user: {
        email: email,
        roles: user.roles,
      },
    };

    jwt.sign(payload, "jwtSecret", { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      return res.status(200).json({ token, success: true });
    });

    // return res.status(200).json({
    //   success: true,
    //   roles: user.roles,
    // });
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

// View User List
const viewList = async (req, res) => {
  try {
    const users = await User.find({});

    if (users.length === 0) {
      res.status(200).json({
        success: false,
        message: "No users found",
      });
      return;
    }

    const userList = users.map((user) => ({
      email: user.email,
      fullName: user.fullName,
      gender: user.gender,
      phoneNumber: user.phoneNumber,
      address: user.address,
      roles: user.roles,
      regTime: user.createdAt,
    }));

    return res.status(200).json({
      success: true,
      users: userList,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// View certain doc by email
const viewUserDoc = async (req, res) => {
  const email = req.body.email;
  try {
    const userdoc = await UserDoc.find({ email: email });

    if (userdoc.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No user doc found",
      });
      return;
    }

    return res.status(200).json({
      success: true,
      users: userdoc[0],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// View Docs with Writers by Manager
const viewWriterDoc = async (req, res) => {
  const { writer } = req.body;
  try {
    const userdocs = await UserDoc.find({
      writer: writer,
    });

    if (userdocs.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No user doc found",
      });
    }

    const users = [];
    for (const userdoc of userdocs) {
      const curuser = await User.findOne({ email: userdoc.writer });
      if (curuser) {
        users.push({
          userdoc: userdoc,
          user: curuser,
        });
      }
    }

    return res.status(200).json({
      success: true,
      users: users,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// View All Documents
const viewAllDocs = async (req, res) => {
  try {
    const userdocs = await UserDoc.find({});

    if (userdocs.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No user doc found",
      });
    }

    return res.status(200).json({
      success: true,
      docs: userdocs,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add New User Dynamically
const addNewUser = async (req, res) => {
  const data = req.body;

  try {
    // user existing checking
    const isExistingUser = await User.findOne({ email: data.email });

    if (isExistingUser) {
      return res.status(200).json({
        success: false,
        message: "User already exists!",
      });
    }

    // new user create
    const salt = await bcrypt.genSalt(10);
    const en_password = await bcrypt.hash("chenelcustomer!", salt);

    await User.create({
      email: data.email,
      fullName: data.name,
      password: en_password,
    });

    // new user_doc create
    await UserDoc.create({
      email: data.email,
      qusans: data.qusans,
      status: data.status,
    });

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update User Doc responsible Writer Dynamically
const updateUserWriter = async (req, res) => {
  const data = req.body;

  try {
    for (const info of data.info) {
      await UserDoc.updateOne(
        { email: info.email },
        { $set: { writer: data.writer.email } }
      );
    }

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update User Doc responsible Clerk Dynamically
const updateUserClerk = async (req, res) => {
  const data = req.body;

  try {
    for (const info of data.info) {
      await UserDoc.updateOne(
        { email: info.email },
        { $set: { clerk: data.clerk.email } }
      );
    }

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  // authentication
  signUp,
  employeeSignUp,
  signIn,
  passportUpload,
  // browse
  viewList,
  viewUserDoc,
  viewWriterDoc,
  viewAllDocs,
  // user create
  addNewUser,
  // update user data
  updateUserWriter,
  updateUserClerk,
};
