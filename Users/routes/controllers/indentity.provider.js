const IdentityModel = require('../models/identity.model');
const crypto = require('crypto');

exports.insert = (req, res) => {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.scryptSync(req.body.password,salt,64,{N:16384}).toString("base64");
    req.body.password = salt + "$" + hash;
    req.body.permissionLevel = 1;
    IdentityModel.createIdentity(req.body)
        .then((result) => {
            res.status(201).send({id: result._id});
        });
};

exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    IdentityModel.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
};

exports.getById = (req, res) => {
    IdentityModel.findById(req.params.userId)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.putById = (req, res) => {
    if (req.body.password) {
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.scryptSync(req.body.password,salt,64,{N:16384}).toString("base64");
        req.body.password = salt + "$" + hash;
    }
    IdentityModel.putIdentity(req.params.userId, req.body)
        .then((result)=>{
            res.status(204).send({});
        });
};

exports.patchById = (req, res) => {
    if (req.body.password) {
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.scryptSync(req.body.password,salt,64,{N:16384}).toString("base64");
        req.body.password = salt + "$" + hash;
    }
    IdentityModel.patchIdentity(req.params.userId, req.body)
        .then((result) => {
            res.status(204).send({});
        });
};

exports.patchFlowsById =(req,res) => {
    IdentityModel.patchIdentityFlows(req.params.userId,req.body.flow).then((result) => {
        res.status(204).send({});
    })
}

exports.removeById = (req, res) => {
    IdentityModel.removeById(req.params.userId)
        .then((result)=>{
            res.status(204).send({});
        });
};