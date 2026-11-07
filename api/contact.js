const { handleContactRequest } = require('../contact-api');

module.exports = (req, res) => {
  return handleContactRequest(req, res);
};
