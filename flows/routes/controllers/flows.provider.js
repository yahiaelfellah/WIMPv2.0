const flowModel = require("../models/flows.model");
 
exports.insert = (req,res) => {
    flowModel.create(req.body).then((result) => {
        res.status(201).send({id:result._id})
    })
 }
 exports.list = (req,res) => {
    let page = 0 ; 
    let limit = 10;
    if(req.query){
         limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
        if(req.query.page){
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ?req.query.page:0;
        }
    }
    flowModel.list(limit,page).then((result) => {
        res.status(200).send(result);
    })
}

exports.findById = (req,res) => {
    flowModel.findById(req.params.deviceId).then((result) => {
        res.status(200).send(result);
    })
}

exports.findByOwner = (req,res) => {
    flowModel.findByOwner(req.params.deviceOwner).then((result) => {
        res.status(200).send(result);
    })
}