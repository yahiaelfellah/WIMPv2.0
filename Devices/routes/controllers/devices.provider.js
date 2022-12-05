const DeivceModel = require("../models/devices.model");
 
exports.insert = (req,res) => {
    DeivceModel.createDevice(req.body).then((result) => {
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
    DeivceModel.list(limit,page).then((result) => {
        res.status(200).send(result);
    })
}

exports.findById = (req,res) => {
    DeviceModel.findById(req.params.deviceId).then((result) => {
        res.status(200).send(result);
    })
}

exports.findByFlowId = (req,res) => {
    DeivceModel.findByflowId(req.params.flowId).then((result) =>{
        res.status(200).send(result);
    })
}