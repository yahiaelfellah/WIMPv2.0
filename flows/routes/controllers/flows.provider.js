const flowModel = require("../models/flows.model");
const controller = require("../controllers/flows.controller");
const jwt = require("jsonwebtoken")
exports.insert =  (req, res) => {
  flowModel.create(req.body).then((result) => {
    if(result){
        req.jwt = jwt.decode(req.headers["authorization"].split(" ")[1]);
        req._id = result._id;
        controller.create(res,req);
    }else {
        res.status(409).send({ errors : "flow already exists in the database "});
    }
  });
};


exports.list = (req, res) => {
  let page = 0;
  let limit = 10;
  if (req.query) {
    limit =
      req.query.limit && req.query.limit <= 100
        ? parseInt(req.query.limit)
        : 10;
    if (req.query.page) {
      req.query.page = parseInt(req.query.page);
      page = Number.isInteger(req.query.page) ? req.query.page : 0;
    }
  }
  flowModel.list(limit, page).then((result) => {
    res.status(200).send(result);
  });
};


/// This one is used in order to load the flow in the node red ! 
exports.getById = (req, res) => {
  flowModel.findById(req.params.id).then((result) => {
    req.jwt = jwt.decode(req.headers["authorization"].split(" ")[1]);
    req._id = result._id;
    req.body.flowData = result.flowData;
    controller.insert(req,res)
    //res.status(200).send({ flowId : result.flowId});
  });
};

exports.putById = (req, res) => {
  flowModel.putIdentity(req.params.id, req.body).then((result) => {
    req.status(204).send({});
  });
};



groupeByAndDeleteUndefined = (data) => {
  const groupeBy =  data.reduce((group, flow) => {
    const { z } = flow;
    group[z] = group[z] ?? [];
    group[z].push(flow);
    return group;
  }, {});  
  delete groupeBy["undefined"];
  return groupeBy;
}


exports.updateFlows = (req,res) => {
  controller.list().then(async(result) => {
    const groupByZ = groupeByAndDeleteUndefined(result.data);
    for(var id in groupByZ){
      const res = await flowModel.patchFlowByFlowId(id,{flowData:groupByZ[id]});
      console.log(res);
    }
    res.status(200).send(groupByZ);
 
  });
}


exports.removeById = (req, res) => {
  IdentityModel.removeById(req.params.id).then((result) => {
    res.status(204).send({});
  });
};



