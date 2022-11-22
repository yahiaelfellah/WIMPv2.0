const axios = require("axios");
// get env properties
require("dotenv").config();

exports.update = (req, id) => {
  return axios.patch(
    process.env.USER_URL,
    {
      flow: id,
    },
    {
      headers: {
        authorization : req.headers["authorization"]
      },
    }
  );
};
