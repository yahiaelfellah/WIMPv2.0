const IdentityChecker = require('./authentication/identity.checker');
const Authenticator = require('./authentication/authentication.handler');
// const config = require('../env.config');

// const Master = config.permissionLevels.Master; // uncomment if needed
//const Member = config.permissionLevels.Member; //uncomment if needed
//const Surfer = config.permissionLevels.Surfer; //uncomment if needed

exports.routesConfig = function (app) {
    app.post('/auth', [
        IdentityChecker.hasAuthValidFields,
        IdentityChecker.isPasswordAndUserMatch,
        Authenticator.login
    ]);
    app.post('/refresh', [
        IdentityChecker.isUserStillExistsWithSamePrivileges,
        Authenticator.refresh_token
    ]);
};