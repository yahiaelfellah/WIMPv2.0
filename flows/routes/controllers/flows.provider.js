const flowModel = require("../models/flows.model");
const controller = require("../controllers/flows.controller");
const jwt = require("jsonwebtoken")
exports.insert =  (req, res) => {
  flowModel.create(req.body).then((result) => {
    if(result){
        let authorization = req.headers["authorization"].split(" ");
        req.jwt = jwt.decode(authorization[1]);
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

exports.getById = (req, res) => {
  flowModel.findById(req.params.id).then((result) => {
    res.status(200).send(result);
  });
};

exports.putById = (req, res) => {
  IdentityModel.putIdentity(req.params.id, req.body).then((result) => {
    req.status(204).send({});
  });
};

exports.removeById = (req, res) => {
  IdentityModel.removeById(req.params.id).then((result) => {
    res.status(204).send({});
  });
};



