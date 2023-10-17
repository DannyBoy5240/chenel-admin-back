const mongoose = require("mongoose");
const { Roles, MEMBER_STATUS } = require("../configs/enums");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Must be provided email"],
    },
    password: {
      type: String,
      required: [true, "Must be provided password"],
    },
    fullName: {
      type: String,
      required: [true, "Must be provided full name"],
    },
    email_verified: {
      type: Boolean,
      default: false,
    },
    gender: {
      type: Boolean,
      default: false, // default is male
    },
    roles: {
      type: String,
      default: Roles.CUSTOMER,
      enum: Object.values(Roles),
    },
    member_status: {
      type: String,
      default: MEMBER_STATUS.PENDING,
      enum: Object.values(MEMBER_STATUS),
    },
    phoneNumber: {
      type: String,
      default: "",
    },
    birthday: {
      type: Date,
      default: Date.now(),
    },
    relationship: {
      type: String,
      default: "",
    },
    isProfileDone: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    passport: {
      type: String,
      default: "",
    },
    workpermit: {
      type: String,
      default: "",
    },
    security: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
