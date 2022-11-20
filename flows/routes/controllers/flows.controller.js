const axios = require("axios");
const flowModel = require("../models/flows.model");

const config = {
  headers: {
    "Node-RED-API-Version": "v2",
    "Node-RED-Deployment-Type": "full",
  },
};

create_flow_data = (_id, _data) => {
  // check if _data is an array
  return {
    id: _id,
    label: _id,
    nodes: Array.isArray(_data) ? _data : Array(_data),
  };
};

exports.insert = async (res, id, data) => {
  try {
    const res = await axios.post(
      process.env.FLOW_URL,
      create_flow_data(id, data)
    );
    const _ = await flowModel.patchFlowId(id, res.data.id);
    res.status(201).send({ id: id, flowId: res.data.id });
  } catch (error) {
    res.status(400).send({
      errors:
        error && error.response && error.response.data
          ? error.response.data
          : error,
    });
  }
};

exports.put = async (id, data) => {
  return await axios.put(
    `${process.env.FLOW_URL}/${id}`,
    create_flow_data(id, data)
  );
};

exports.getFlows = async (id) => {
  const res = await axios.get(process.env.FLOW_URL);
  return res;
};
