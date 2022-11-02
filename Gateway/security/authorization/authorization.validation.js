const jwt = require('jsonwebtoken'),
    refreshSecret = require('../env.config.js').actualRefreshSecret,
    crypto = require('crypto');
const fs = require('fs');
const cert = fs.readFileSync( './security/tls/token-public-key.pem');
exports.validJWTNeeded = (req, res, next) => {
    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ');
            if (authorization[0] !== 'Bearer') {
                return res.status(401).send();
            } else {

                var aud = 'urn:' + (req.get('origin') ? req.get('origin') : "yahia.xyz");
                req.jwt = jwt.verify(authorization[1], cert, { issuer: "urn:yahia.xyz", audience: aud, algorithms: ['RS512'] });
                return next();
            }
        } catch (err) {
            return res.status(403).send(err);
        }
    } else {
        return res.status(401).send();
    }
};

exports.verifyRefreshBodyField = (req, res, next) => {
    console.log(req.body);
    if (req.body && req.body.refreshToken) {
        return next();
    } else {
        return res.status(400).send({ error: 'need to pass refreshToken field' });
    }
};

exports.validRefreshNeeded = (req, res, next) => {
    let decoded = req.body.refreshToken.split('$');
    let salt = decoded[0];
    console.log(req.body)
    let refreshToken = decoded[1];
    let hash = crypto.createHmac('sha512', salt).update(req.jwt.userId + refreshSecret + req.jwt.jti).digest("base64");
    if (hash === refreshToken) {
        req.body = req.jwt;
        return next();
    } else {
        return res.status(400).send({ error: 'Invalid refresh token' });
    }
};