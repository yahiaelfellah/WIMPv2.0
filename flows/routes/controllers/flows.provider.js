const flowModel = require("../models/flows.model");
const controller = require("../controllers/flows.controller");

exports.insert =  (req, res) => {
  flowModel.create(req.body).then(async(result) => {
    controller.insert(res,result._id , req.body.flowData);
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
