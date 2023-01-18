const DeivceModel = require("../models/devices.model");
const { sender } = require('../../messaging/device.messaging');
const jwt = require("jsonwebtoken")

/// This one will help to create the empty device with right flow
exports.create = (req,res) => {
    DeivceModel.create(req.body).then((result) => {
        res.status(201).send({id:result._id})
        // Data To Send to The Flow Microservice 
        /* e.g  data = {
            action : "action",
            body : {
                ...data
            }
        } 
        */
        sender({
            action : 'new_flow',
            authorization : jwt.decode(req.headers["authorization"].split(" ")[1]),
            body : {
                deviceId: result._id, 
            }
        });
    })
 }

exports.insert = (req,res) => {
    //DeivceModel
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

exports.removeById = (req,res) => {
    DeviceModel.removeById(req.params.deviceId).then((result) => {
        res.status(200).send(result);
    })
}