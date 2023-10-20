const User = require("../models/user.model");
const UserDoc = require("../models/userdoc.model");

const { Roles, MEMBER_STATUS } = require("../configs/enums");

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
    //   service: "gmail",
    //   auth: {
    //     user: "dannyboy02524@gmail.com",
    //     pass: "bktj uryh beqq jtth",
    //   },
    // });

    // // const token = crypto.randomBytes(20).toString("hex"); // Generate a random token
    // const token = await jwt.sign({email, success: true}, "secret-key", {expiresIn: "1h"});

    // // Send the verification email
    // const mailOptions = {
    //   from: "chenel@gmail.com",
    //   to: email,
    //   subject: "Chenel Service Email Verification",
    //   text: `Click the following link to verify your email: http://195.201.246.182:3000/verify-email/${token}`,
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

    const isExistingPhone = await User.findOne({ phoneNumber });
    if (isExistingPhone) {
      return res.status(200).json({
        success: false,
        message: "Phone is already used",
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

    // send email verification link to email
    // const transporter = nodemailer.createTransport({
    //   // Configure the email transporter (e.g., Gmail, SMTP server)
    //   // ...
    //   host: "smtp.gmail.com",
    //   port: 587,
    //   secure: false,
    //   service: "gmail",
    //   auth: {
    //     user: "dannyboy02524@gmail.com",
    //     pass: "bktj uryh beqq jtth",
    //   },
    // });

    // // const token = crypto.randomBytes(20).toString("hex"); // Generate a random token
    // const token = await jwt.sign({email, success: true}, "secret-key", {expiresIn: "1h"});

    // // Send the verification email
    // const mailOptions = {
    //   from: "chenel@gmail.com",
    //   to: email,
    //   subject: "Chenel Service Email Verification",
    //   text: `Click the following link to verify your email: http://195.201.246.182:3000/verify-email/${token}`,
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

// SignIn Handler
const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(200).json({
        success: false,
        message: "user_not_found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(200).json({
        success: false,
        message: "password_incorrect",
      });
    }

    if (user.email_verified == false) {
      return res.status(200).json({
        success: false,
        message: "email_not_verified",
      });
    }

    if (user.member_status !== "ACTIVATED") {
      return res.status(200).json({
        success: false,
        message: `account_on_${user.member_status}`,
      });
    }

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
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Emaily Verify
const emailVerify = async (req, res) => {
  const { email } = req.body;
  try {
    await User.updateOne({ email: email }, { $set: { email_verified: true } });
    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Approve Pending User
const approveUser = async (req, res) => {
  const { email } = req.body;
  try {
    await User.updateOne(
      { email: email },
      { $set: { member_status: MEMBER_STATUS.ACTIVATE } }
    );
    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove User
const removeUser = async (req, res) => {
  const { email } = req.body;

  try {
    await User.deleteOne({ email });
    return res.status(200).json({
      success: true,
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

  try {
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { passport: fileName },
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

// Workpermit Upload
const workpermitUpload = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // The uploaded file can be accessed as req.file
  const uploadedFile = req.file;
  const fileName = uploadedFile.filename;
  const email = req.body.email;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { workpermit: fileName },
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

// Security Upload
const securityUpload = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // The uploaded file can be accessed as req.file
  const uploadedFile = req.file;
  const fileName = uploadedFile.filename;
  const email = req.body.email;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { security: fileName },
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

// formDocUpload Upload
const formDocUpload = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // The uploaded file can be accessed as req.file
  const uploadedFile = req.file;
  const fileName = uploadedFile.filename;
  const email = req.body.email;

  try {
    const updatedDoc = await UserDoc.findOneAndUpdate(
      { email: email },
      { formdoc: fileName, status: "CLERKCONFIRM" },
      { new: true }
    );

    if (!updatedDoc) {
      return res.status(404).json({ error: "User Doc not found" });
    }

    return res.status(200).json({
      success: true,
      user: updatedDoc,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// contactUs
const contactUs = async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    // send email verification link to email
    const transporter = nodemailer.createTransport({
      // Configure the email transporter (e.g., Gmail, SMTP server)
      // ...
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      service: "gmail",
      auth: {
        user: "dannyboy02524@gmail.com",
        pass: "bktj uryh beqq jtth",
      },
    });

    // Send the verification email
    const mailOptions = {
      from: "chenel@gmail.com",
      to: "Taxgration@gmail.com",
      subject: "Chenel Service Supporting Messages",
      html: `<div style="max-width: 500px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <h1>Contact Us</h1>
        <div>
            <label for="name" style="display: block; margin-bottom: 10px;">Name:</label>
            <input type="text" id="name" name="name" value=${name} disabled required style="width: 100%; padding: 10px; margin-bottom: 20px; border: 1px solid #ccc; border-radius: 4px;">

            <label for="email" style="display: block; margin-bottom: 10px;">Email:</label>
            <input type="email" id="email" name="email" value=${email} disabled required style="width: 100%; padding: 10px; margin-bottom: 20px; border: 1px solid #ccc; border-radius: 4px;">

            <label for="subject" style="display: block; margin-bottom: 10px;">Subject:</label>
            <input type="text" id="subject" name="subject" value=${subject} disabled required style="width: 100%; padding: 10px; margin-bottom: 20px; border: 1px solid #ccc; border-radius: 4px;">

            <label for="message" style="display: block; margin-bottom: 10px;">Message:</label>
            <textarea id="message" name="message" rows="4" value=${message} disabled required style="width: 100%; padding: 10px; margin-bottom: 20px; border: 1px solid #ccc; border-radius: 4px;"></textarea>
        </div>
    </div>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send("Email sending failed.");
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).send("Verification email sent.");
      }
    });

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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
      birthday: user.birthday,
      address: user.address,
      phoneNumber: user.phoneNumber,
      roles: user.roles,
      regTime: user.createdAt,
      status: user.member_status,
    }));

    return res.status(200).json({
      success: true,
      users: userList,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Documents
const getDocuments = async (req, res) => {
  const { email } = req.body;
  try {
    const users = await User.find({ email });

    if (users.length === 0) {
      res.status(200).json({
        success: false,
        message: "No users found",
      });
      return;
    }

    return res.status(200).json({
      success: true,
      passport: users[0].passport,
      workpermit: users[0].workpermit,
      security: users[0].security,
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

// Get User Doc Status
const getUserDocStatus = async (req, res) => {
  const email = req.body.email;
  try {
    const userdocs = await UserDoc.find({ email });

    if (userdocs.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No user doc found",
      });
    }

    return res.status(200).json({
      success: true,
      status: userdocs[0].status,
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

// Update User Doc
const userSubmitDoc = async (req, res) => {
  const data = req.body;

  try {
    await UserDoc.updateOne(
      { email: data.email },
      { $set: { qusans: data.qusans, status: "PENDING" } }
    );

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
        { $set: { writer: data.writer.email, status: "WRITERCHECKING" } }
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

// Update User Doc responsible Clerk Dynamically
const updateWriterDoc = async (req, res) => {
  const data = req.body;

  try {
    await UserDoc.updateOne(
      { email: data.email },
      {
        $set: {
          writerdoc: data.writerdoc,
          status: data.status,
        },
      }
    );

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
  emailVerify,
  approveUser,
  removeUser,
  passportUpload,
  workpermitUpload,
  securityUpload,
  formDocUpload,
  contactUs,
  getDocuments,
  // browse
  viewList,
  viewUserDoc,
  viewWriterDoc,
  viewAllDocs,
  getUserDocStatus,
  // user create
  addNewUser,
  // user doc submit by themself
  userSubmitDoc,
  // update user data
  updateUserWriter,
  updateUserClerk,
  // udate data for writer
  updateWriterDoc,
};
