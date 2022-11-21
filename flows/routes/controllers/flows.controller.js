const axios = require("axios");
const flowModel = require("../models/flows.model");


/*
 Use this when u call the /flows in the headers of the requests
*/
// const config = {
//   headers: {
//     "Node-RED-API-Version": "v2",
//     "Node-RED-Deployment-Type": "full",
//   },
// };

create_flow_data = (req) => {
  // check if _data is an array
  return {
    id: req._id,
    label: req.jwt.name.split(" ")[0],
    nodes: Array.isArray(req.body.flowData) ? req.body.flowData : Array(req.body.flowData),
  };
};

exports.create = async (res, req) => {
  try {
    const result = await axios.post(
      process.env.FLOW_URL,
      create_flow_data(req)
    );
    const _ = await flowModel.pathFlowById( req._id, { flowId : result.data.id});
    res.status(201).send({ id: req.id, flowId: result.data.id });
  } catch (error) {
    res.status(409).send({
      errors:
        error && error.response && error.response.data
          ? error.response.data
          : error,
    });
  }
};


exports.insert = async (req,res) => {
    try{
        const result = await axios.post(
            process.env.FLOW_URL,
            create_flow_data(req)
          );
        res.status(201).send({ message : "flow loaded successfully"})
    }catch(error){
        res.status(409).send({
            errors:
              error && error.response && error.response.data
                ? error.response.data
                : error,
          })
    }

}

exports.put = async (res, id, data) => {
  try {
    const res = await axios.put(
      `${process.env.FLOW_URL}/${id}`,
      create_flow_data(id, data)
    );
  } catch (error) {
    res.status(409).send({
      errors:
        error && error.response && error.response.data
          ? error.response.data
          : error,
    });
  }
};



