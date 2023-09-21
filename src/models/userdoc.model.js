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
    writerdoc: {
      type: Array,
      default: [
        {
          qus: "What is your name? Can you spell it? Do you have a document that shows your name such as a passport or work permit or driver's license?",
          ans: "",
        },
        {
          qus: "What is your date of birth? See if it corresponds to whatever document that the client has provided.",
          ans: "",
        },
        {
          qus: "Where were you born? What city were you born in? What department is that? Are your parents from that same city? Where else in Haiti do you have family members (close or extended; this question is important because later, the client might flee there to save her life)?",
          ans: "",
        },
        {
          qus: "Where were you born (city and country)?",
          ans: "",
        },
        {
          qus: "How big was your family? How many brothers? How many sisters? Were your parents married? Did either have other romantic or extramarital relations?",
          ans: "",
        },
        {
          qus: "Have you spent your whole life where you were born? Have you moved to other places? Reasons for moving?",
          ans: "",
        },
        {
          qus: "What is your religion? Are you associated with a political party? Are you a member of an organization or club or group or movement, etc.? Your position in such an organization? Your responsibilities? Were you ever persecuted as a result? If yes, what happened? What is the whole story? Ask ensuing questions to frame the story. Identify the group who persecuted our client, more importantly, the main person (character).",
          ans: "",
        },
        {
          qus: "Have you ever been persecuted for any other reason? Has someone ever slapped you? Punched you? Give her a minute to think. Has someone ever told lies about you, to defame you? Have you ever fought someone? Have you ever been the victim of a rape (a friend maybe)? Have you ever had an accident? Do you hate anyone (psychological ploy to get the person to open up, to answer your questions)? Have you ever been shot at? Have you seen a dead body on the street? What happened? Who died? Why? Where? How? Do you have anything to share that might be relevant to your asylum, though it may not be related? What is it that you were thinking of but thought wasn't important to share with us? What is it that you thought of but didn't want to share with us? Is there something that you're afraid of sharing with us? Have you moved to another part of the country to flee persecution? Where? Remember the WHO (the persecutor) must prevalent.",
          ans: "",
        },
        {
          qus: "Has he or she gone to see the authorities? What happened? Remember the US Government gives asylum to those who were persecuted by the government or by forces where the government was unable or unwilling to protect them. Therefore, we must question them about the effort that they made in seeking governmental protection, and we must clearly show that in those stories. If the client was in a foreign country, where he or she was persecuted because of her race or nationality, we must show the disregard of the government or the authorities of that third country to protect her.",
          ans: "",
        },
        {
          qus: "Are your parents still living? If someone died, get the whole story of his or her death, regardless of the date. Were they involved in politics, religion, or some social groups? What were their roles? How did their organizational involvement affect their lives and or our client? Ask a series of questions about them as if they were our client, as if the story that we’re writing is about them, that is if our client doesn’t have a viable story for the asylum.",
          ans: "",
        },
        {
          qus: "Use the same line of parents questioning for the siblings. Did they live in the same house, city, etc.? Was there strife between them? Why? What happened? Has our client lost a sibling, meaning through death? What happened?",
          ans: "",
        },
        {
          qus: "Question the clients also about extended family members, aunts, uncles, cousins, grandparents, etc. Does he or she know about any harm that came to any of them? What happened? What can our client share with us? (How can you include that information in the asylum?)",
          ans: "",
        },
        {
          qus: "We've had cases where it is extremely difficult to find information to construct a good story for the client. In similar cases, we need to direct our questioning toward friends, work colleagues, notable individuals in the community (besides close family ties), etc. Has any of your friends suffered harms, political, religious, or social (based on ethnic association, background, or organizational association)? How did that affect you or the community?",
          ans: "",
        },
        {
          qus: "When did you leave Haiti? How did you leave? Where did you go? How was your re-establishment in the foreign country? Did you have friends or family members there? Did you experience racism? How about discrimination? Were you or any of your family members or friends mistreated because they were Haitians? Have you heard tales of racism and discrimination against Haitians? What happened? How do the authorities in that or those countries generally treat Haitians? Draw the stories from the clients so that the story that is told is their story.",
          ans: "",
        },
        {
          qus: "When did you decide to leave the host country? What date? What route did you take?",
          ans: "",
        },
        {
          qus: "Have you already been to the US? Were you ever deported from any country? Why did you choose the US?",
          ans: "",
        },
        {
          qus: "Notes : ( Remember the story must be the client. She must remember the names, the dates, the places, etc. She must have directly or indirectly experienced the feats or heard about them or can readily relate to them. As a writer, you’re rendering her tales fluid to be more presentable to a judge. You’re doing coordination. )",
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
