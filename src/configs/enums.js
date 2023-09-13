const Roles = {
  ADMIN: "ADMIN",
  MANAGER: "MANAGER",
  WRITER: "WRITER",
  CLERK: "CLERK",
  CUSTOMER: "CUSTOMER",
};

const VERIFY_CODE_TYPES = {
  VALIDATE_EMAIL: "VALIDATE_EMAIL",
  FORGOT_PASSWORD: "FORGOT_PASSWORD",
};

const MEMBER_STATUS = {
  PENDING: "PENDING",
  ACTIVATE: "ACTIVATE",
  DEACTIVATE: "DEACTIVATE",
  SUSPENDED: "SUSPENDED",
};

module.exports = {
  Roles,
  VERIFY_CODE_TYPES,
  MEMBER_STATUS,
};