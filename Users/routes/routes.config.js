// const IdentityProvider = require('./controllers/identity.provider');
//const config = require('../env.config');
const IdentityProvider = require('./controllers/indentity.provider');

//const Surfer = config.permissionLevels.Surfer;

exports.routesConfig = (app) => {
    app.post('/users', [
        IdentityProvider.insert
    ]);
    app.get('/users', [
        IdentityProvider.list
    ]);
    app.get('/users/:userId', [
        IdentityProvider.getById
    ]);

    app.put('/users/:userId', [
        IdentityProvider.putById
    ]);

    app.patch('/users/:userId', [

        IdentityProvider.patchById
    ]);
    app.delete('/users/:userId', [
        IdentityProvider.removeById
    ]);
};