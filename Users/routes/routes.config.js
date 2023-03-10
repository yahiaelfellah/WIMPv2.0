// const IdentityProvider = require('./controllers/identity.provider');
//const config = require('../env.config');
const IdentityProvider = require('./controllers/indentity.provider');
const DepartementProvider = require('./controllers/departement.provider');
const AuthorizationPermission = require('../security/authorization/authorization.permission');
const config = require('../security/env.config');
const Surfer = config.permissionLevels.Surfer;
const Member = config.permissionLevels.Member;

exports.routesConfig = (app) => {
    app.post('/users', [
        AuthorizationPermission.minimumPermissionLevelRequired(Surfer),
        IdentityProvider.insert
    ]);
    app.get('/users', [
        AuthorizationPermission.minimumPermissionLevelRequired(Surfer),
        IdentityProvider.list
    ]);
    app.get('/users/:userId', [
        AuthorizationPermission.minimumPermissionLevelRequired(Surfer),
        AuthorizationPermission.onlySameUserOrAdminCanDoThisAction,
        IdentityProvider.getById
    ]);

    app.put('/users/:userId', [
        AuthorizationPermission.minimumPermissionLevelRequired(Surfer),
        AuthorizationPermission.sameUserCantDoThisAction,
        IdentityProvider.putById
    ]);

    app.patch('/users/:userId', [
        AuthorizationPermission.minimumPermissionLevelRequired(Surfer),
        AuthorizationPermission.onlySameUserOrAdminCanDoThisAction,
        IdentityProvider.patchById
    ]);
    app.patch('/users/:userId/flows', [
        AuthorizationPermission.minimumPermissionLevelRequired(Surfer),
        AuthorizationPermission.onlySameUserOrAdminCanDoThisAction,
        IdentityProvider.patchFlowsById
    ]);
    app.patch('/users/:userId/status',[
        AuthorizationPermission.minimumPermissionLevelRequired(Surfer),
        AuthorizationPermission.onlySameUserOrAdminCanDoThisAction,
        IdentityProvider.patchStatusById
    ])
    app.patch('/users/:userId/devices',[
        AuthorizationPermission.minimumPermissionLevelRequired(Surfer),
        AuthorizationPermission.onlySameUserOrAdminCanDoThisAction,
        IdentityProvider.patchDevicesById
    ])
    app.delete('/users/:userId', [
        AuthorizationPermission.minimumPermissionLevelRequired(Surfer),
        AuthorizationPermission.sameUserCantDoThisAction,
        IdentityProvider.removeById
    ]);
    app.get('/users/:userId/meetings',[
        AuthorizationPermission.minimumPermissionLevelRequired(Surfer),
        AuthorizationPermission.sameUserCantDoThisAction,
        
    ])

    app.get('/departement', [
        AuthorizationPermission.minimumPermissionLevelRequired(Surfer),
        DepartementProvider.list
    ])
    app.post('/departement',[
        AuthorizationPermission.minimumPermissionLevelRequired(Member),
        DepartementProvider.insert
    ])
};