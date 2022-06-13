import fetch from "node-fetch";
import { getCoapLedStatus, getPIRStatus, getMicStatus } from "./coap.js";

// ipList and topology
const TOPOLOGY_ROUTE = "http://localhost:80/topology";
let ipList = [];

// Interval between data collection (ms)
const DATA_POLL_INTERVAL = 5000;

const fetchData = async () => {
  const startTime = Date.now()

  // Get IPs
  const response = await fetch(TOPOLOGY_ROUTE);
  const topology = await response.json();
  ipList = topology.connectedDevices;

  // Send coap request for each IP in ipList except last IP (Border Router)
  console.log("CoAP Requests: {");
  for (let i = 0; i < ipList.length - 1; i++) {
    /* Rudimentary detection for nodes that don't support CoAP
    if (ipList[i].includes("1ca1")) {
      continue;
    } */
    console.log("\tNode IP:", ipList[i]);

    // Get data from nodes
    // let ledStates = getCoapLedStatus(ipList[i]);
    let pirState = await getPIRStatus(ipList[i]);
    let micVal = await getMicStatus(ipList[i]);

    // Print data from nodes
    // console.log('    -ledStates:', ledStates);
    console.log("\t\t- Motion:", pirState);
    console.log("\t\t- Sound Intensity (dB):", micVal);
  }
  console.log("}\n");

  const timeElapsed = Date.now() - startTime
  if (timeElapsed < DATA_POLL_INTERVAL) {
    await sleep(DATA_POLL_INTERVAL - timeElapsed)
  }
  fetchData()
}

const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// Start the data fetching
fetchData()
