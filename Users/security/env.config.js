module.exports = {
    "jwtValidityTimeInSeconds": 4080,
    "refresh_secret": "Oh!42My@Go6*d9753!",
    "actualRefreshSecret": null,
    "initRefreshSecret": function () {
        this.actualRefreshSecret = this.refresh_secret.concat('$' + (new Date(Date.now())).toISOString());
    }
};