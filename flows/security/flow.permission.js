const jwt = require("jsonwebtoken"),config = require("./env.config");
const Master = config.permissionLevels.Master;

exports.PermissionLevelRequired = (req, res, next) => {
  try{
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
  }catch{
    return res.status(403).send();

  }


  return next();
};


