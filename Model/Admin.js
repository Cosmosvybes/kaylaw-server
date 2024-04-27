const { admin } = require("../utils/mongodb");

const getAdmin = async (email) => {
  const response = await admin.findOne({ email: email });
  return response;
};

module.exports = { getAdmin };
