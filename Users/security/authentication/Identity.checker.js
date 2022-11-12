const IdentityModel = require('../../routes/models/identity.model');
const crypto = require('crypto');
const uuid= require('uuid');
const validityTime = require('../env.config.js').jwtValidityTimeInSeconds;

exports.hasAuthValidFields = (req, res, next) => {
    let errors = [];
    if (req.body) {
        if (!req.body.username) {
            errors.push('Missing email field');
        }
        if (!req.body.password) {
            errors.push('Missing password field');
        }

        if (errors.length) {
            return res.status(400).send({errors: errors.join(',')});
        } else {
            return next();
        }
    } else {
        return res.status(400).send({errors: 'Missing email and password fields'});
    }
};

exports.isPasswordAndUserMatch = (req, res, next) => {
    
    IdentityModel.findByUserName(req.body.username)
        .then((user)=>{
             if(!user[0]){
                res.status(404).send({errors:"user not found , please check the database or the admin"});
            }else{
                let passwordFields = user[0].password.split('$');
                let salt = passwordFields[0];
                let hash = crypto.scryptSync(req.body.password,salt,64,{N:16384}).toString("base64");
                if (hash === passwordFields[1]) {
                    var now = Math.floor(Date.now() / 1000);
                    req.body = {
                        iss: 'urn:yahia.xyz',
                        aud: 'urn:'+(req.get('origin')?req.get('origin'):"yahia.xyz"),
                        sub: user[0].email,
                        name: user[0].firstName + ' ' + user[0].lastName,
                        userId: user[0]._id,
                        roles: user[0].permissionLevel,
                        jti: uuid.v4(),
                        iat: now,
                        exp: now+validityTime
                    };
                    return next();
                } else {
                    return res.status(400).send({errors: ['Invalid e-mail or password']});
                }
            }
        });
};

exports.isUserStillExistsWithSamePrivileges = (req, res, next) => {
    IdentityModel.findByEmail(req.body.sub)
        .then((user)=>{
            if(!user[0]){
                res.status(404).send({});
            }
            req.body.roles = user[0].permissionLevel;
            return next();
        });
};