const IdentityChecker = require('./authentication/identity.checker');
const Authenticator = require('./authentication/authentication.handler');


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