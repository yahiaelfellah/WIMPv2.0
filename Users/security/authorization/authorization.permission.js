const jwt = require('jsonwebtoken'), config = require('../env.config');

const Master = config.permissionLevels.Master;

exports.minimumPermissionLevelRequired = (required_permission_level) => {
    return (req, res, next) => {

        let authorization = req.headers['authorization'].split(' ');
        req.jwt = jwt.decode(authorization[1]);
        let user_permission_level = parseInt(req.jwt.roles);
        if (user_permission_level & required_permission_level || user_permission_level > required_permission_level) {
            return next();
        } else {
            return res.status(403).send({err:'minimum permission level '});
        }
    };
};

exports.onlySameUserOrAdminCanDoThisAction = (req, res, next) => {
    let user_permission_level = parseInt(req.jwt.roles);
    let userId = req.jwt.userId;
    if (req.params && req.params.userId && userId === req.params.userId) {
        return next();
    } else {
        if (user_permission_level & Master) {
            return next();
        } else {
            return res.status(403).send({
                err: 'problem with onlySameUserOrAdminCanDoThisAction'
            });
        }
    }

};

exports.sameUserCantDoThisAction = (req, res, next) => {
    let userId = req.jwt.userId;
    if (req.params.userId !== userId) {
        return next();
    } else {
        return res.status(400).send();
    }

};