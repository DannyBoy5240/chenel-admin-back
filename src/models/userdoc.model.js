const mongoose = require("mongoose");
const { DOC_STATUS } = require("../configs/enums");

const userDocSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Must be provided email"],
    },
    qusans: {
      type: Array,
      default: [
        {
          qus: "What is your full legal name?",
          ans: "",
        },
        {
          qus: "Do you have any other names or aliases you have used?",
          ans: "",
        },
        {
          qus: "When were you born?",
          ans: "",
        },
        {
          qus: "Where were you born (city and country)?",
          ans: "",
        },
        {
          qus: "Are you male or female?",
          ans: "",
        },
        {
          qus: "What is your Social Security Number?",
          ans: "",
        },
        {
          qus: "What is your Alien Registration Number (A-Number)?",
          ans: "",
        },
        {
          qus: "What is your current mailing and physical address, those for the last five years?",
          ans: "",
        },
        {
          qus: "What is your phone number?",
          ans: "",
        },
        {
          qus: "What is your email address?",
          ans: "",
        },
        {
          qus: "What is your current immigration status?",
          ans: "",
        },
        {
          qus: "When did you enter the United States?",
          ans: "",
        },
        {
          qus: "Where did you enter the United States?",
          ans: "",
        },
        {
          qus: "What was your port of entry?",
          ans: "",
        },
        {
          qus: "What type of visa did you use to enter the United States?",
          ans: "",
        },
        {
          qus: "What is your I-94 Arrival/Departure Record number?",
          ans: "",
        },
        {
          qus: "Have you ever had a previous visa denied or revoked?",
          ans: "",
        },
        {
          qus: "Have you previously applied for any immigration benefits?",
          ans: "",
        },
        {
          qus: "Have you ever been out of status in the United States?",
          ans: "",
        },
        {
          qus: "What is your marital status?",
          ans: "",
        },
        {
          qus: "What is your spouse's full name?",
          ans: "",
        },
        {
          qus: "When was your spouse born?",
          ans: "",
        },
        {
          qus: "What is your spouse's immigration status?",
          ans: "",
        },
        {
          qus: "Do you have any children? If yes, provide their names and dates of birth.",
          ans: "",
        },
        {
          qus: "Where are you currently employed?",
          ans: "",
        },
        {
          qus: "What is your job title?",
          ans: "",
        },
        {
          qus: "What are your job responsibilities?",
          ans: "",
        },
        {
          qus: "When did you start your current job?",
          ans: "",
        },
        {
          qus: "Have you worked for any other employers for the past five years? If yes, provide details.",
          ans: "",
        },
        {
          qus: "List the countries you have visited outside the United States.",
          ans: "",
        },
        {
          qus: "Provide the purpose and dates of your last international trip.",
          ans: "",
        },
        {
          qus: "Have you ever been arrested or convicted of a crime? If yes, provide details.",
          ans: "",
        },
        {
          qus: "Do you have any health conditions that might affect your application?",
          ans: "",
        },
        {
          qus: "Have you ever been diagnosed with a communicable disease of public health significance?",
          ans: "",
        },
        {
          qus: "Have you ever been a member of or associated with any terrorist organizations?",
          ans: "",
        },
        {
          qus: "Have you ever engaged in espionage or sabotage?",
          ans: "",
        },
      ],
    },
    writer: {
      type: String,
      default: "",
    },
    clerk: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: DOC_STATUS.EDITING,
      enum: Object.values(DOC_STATUS),
    },
  },
  { timestamps: true }
);

const UserDoc = mongoose.model("UserDoc", userDocSchema);

module.exports = UserDoc;
