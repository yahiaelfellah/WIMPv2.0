module.exports = {
    "refresh_secret": "Oh!42My@Go6*d9753!",
    "jwtValidityTimeInSeconds": 4080,
    "actualRefreshSecret": null,
    "permissionLevels": {
        "Surfer": 1,
        "Member": 32768,
        "Master": 1073741824
    },
    "initRefreshSecret": function () {
        this.actualRefreshSecret = this.refresh_secret.concat('$' + (new Date(Date.now())).toISOString());
    }
};