const jwt = require("jsonwebtoken"),
  config = require("../env.config");

const Master = config.permissionLevels.Master;

exports.PermissionLevelRequired = (req, res, next) => {
  let authorization = req.headers["authorization"].split(" ");
  req.jwt = jwt.decode(authorization[1]);
  let user_permission_level = parseInt(req.jwt.roles);
  if (user_permission_level & Master) {
    req.user = {
      anonymous: true,
      permissions: "*",
    };
  } else {
    req.user = {
      anonymous: true,
      permission: "read",
    };
  }

  return next();
};


