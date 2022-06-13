import coap from "coap";

const ledPath = "/led";
const pirPath = "/pir";
const micPath = "/mic";

const ledStates = {
  rled: null,
  gled: null,
};

const getOptions = {
  observe: false,
  host: null,
  pathname: "/",
  method: "get",
  confirmable: true,
  retrySend: 0,
  options: {},
};

export function getCoapLedStatus(targetIP) {
  getOptions.host = targetIP;
  getOptions.pathname = ledPath;

  const getRequest = coap.request(getOptions);
  getRequest.on("response", (getResponse) => {
    if (getResponse.payload.length > 2) {
      ledStates.rled = !!getResponse.payload.readUInt8(0);
      ledStates.gled = !!getResponse.payload.readUInt8(1);
    }
  });
  getRequest.on("timeout", (e) => console.log(e));
  getRequest.end();
  return ledStates;
}

export function getPIRStatus(targetIP) {
  getOptions.host = targetIP;
  getOptions.pathname = pirPath;

  return new Promise((resolve, reject) => {
    const getRequest = coap.request(getOptions);
    getRequest.on("response", (getResponse) => {
      let pirVal;
      //console.log(getResponse);
      if (getResponse.payload.length > 0) {
        pirVal = getResponse.payload.readUInt8(0);
      } else {
        pirVal = undefined;
      }
      resolve(pirVal);
    });
    getRequest.on("timeout", (e) => console.log(e));
    setTimeout(() => {
      resolve(undefined);
    }, 9999);
    getRequest.end();
  });
}

export function getMicStatus(targetIP) {
  getOptions.host = targetIP;
  getOptions.pathname = micPath;
  
  return new Promise((resolve, reject) => {
    const getRequest = coap.request(getOptions);
    getRequest.on("response", (getResponse) => {
      // console.log(getResponse);
      let micVal;
      if (getResponse.payload.length > 0) {
        micVal = getResponse.payload.readFloatLE(0);
      } else {
        micVal = undefined;
      }
      resolve(micVal);
    });
    getRequest.on("timeout", (e) => console.log(e));
    setTimeout(() => {
      resolve(undefined);
    }, 9999);
    getRequest.end();
  });
}

