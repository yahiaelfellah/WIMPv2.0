const DepartementModel = require('../models/departement.model');
const crypto = require('crypto');


exports.insert = (req, res) => {
    DepartementModel.createDepartement(req.body)
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
    DepartementModel.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
};

exports.getById = (req, res) => {
    DepartementModel.findById(req.params.departement)
        .then((result) => {
            res.status(200).send(result);
        });
};

// exports.putById = (req, res) => {
//     if (req.body.password) {
//         let salt = crypto.randomBytes(16).toString('base64');
//         let hash = crypto.scryptSync(req.body.password,salt,64,{N:16384}).toString("base64");
//         req.body.password = salt + "$" + hash;
//     }
//     DepartementModel.putIdentity(req.params.userId, req.body)
//         .then((result)=>{
//             res.status(204).send({});
//         });
// };

// exports.patchById = (req, res) => {
//     if (req.body.password) {
//         let salt = crypto.randomBytes(16).toString('base64');
//         let hash = crypto.scryptSync(req.body.password,salt,64,{N:16384}).toString("base64");
//         req.body.password = salt + "$" + hash;
//     }
//     DepartementModel.patchIdentity(req.params.userId, req.body)
//         .then((result) => {
//             res.status(204).send({});
//         });
// };

// exports.patchFlowsById =(req,res) => {
//     DepartementModel.patchIdentityFlows(req.params.userId,req.body.flow).then((result) => {
//         res.status(204).send({message : "updated successfully"});
//     })
// }

// exports.patchDevicesById = (req,res) => {
//     DepartementModel.patchIdentityDevices(req.params.userId,req.body.device).then((result) => {
//         res.status(204).send({message: "updated successefully "})
//     } )
// }

// exports.removeById = (req, res) => {
//     DepartementModel.removeById(req.params.userId)
//         .then((result)=>{
//             res.status(204).send({});
//         });
// };