const { spawn } = require("child_process");
const NodeCache = require("node-cache");
const portfinder = require("portfinder");
const { sender } = require("../../messaging/flows.messaging");

const cache = new NodeCache(); // create a new cache instance
/**
 * Start A Node Red Instance
 * TODO: Check the OS we are running on in order to have
 * TODO: Send The information to user in order to store the information of the process
 */
exports.startNodeRed = async (id) => {
  console.info("--------- Getting Instruction to run a Node Red Instance ------------------------")
  const port = await portfinder.getPortPromise();
  const nodeRedProcess = spawn("node-red.cmd", ["-v", "-p", port], {
    detached: true,
    stdio: "ignore",
  });
  nodeRedProcess.unref();
  nodeRedProcess.on("error", (err) => {
    console.error("Failed to spawn Node-RED process:", err);  
  });
  // Check if the Node-RED process is running
  if (nodeRedProcess.pid !== null) {
    console.info("Node-RED process is running with PID:", nodeRedProcess.pid);
    cache.set(`node-red-${nodeRedProcess.pid}`, nodeRedProcess);
    // sender({
    //   action: "patch_nodered_instance",
    //   data: {
    //     id: id,
    //     body: nodeRedProcess,
    //   },
    // });
  } else {
    console.log("Node-RED process is not running");
  }
};
/**
 * Kill the Node Process
 * @param { String } pid
 */
exports.CloseNodeRed = (pid) => {
  const nodeRedProcess = cache.get(`node-red-${pid}`);
  nodeRedProcess.kill("SIGTERM");
  // Listen for the process to exit
  nodeRedProcess.on("exit", (code, signal) => {
    console.info(
      `Node-RED process exited with code ${code} and signal ${signal}`
    );
  });
};
/**
 * Return the status of the Running Process
 * @returns
 */
exports.statusNodeRed = () => {
  const keys = cache.keys(); // get a list of all keys in the cache

  const runningProcesses = [];
  for (const key of keys) {
    const value = cache.get(key);
    if (value && !value.killed) {
      runningProcesses.push(value.pid);
    }
  }
  return runningProcesses;
};
