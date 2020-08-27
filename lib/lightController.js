const { Discovery } = require("magic-home");
const { Control } = require("magic-home");
const { log } = require("deckboard-kit");

const discoverDevices = () => {
  return new Promise((res, rej) => {
    let discovery = new Discovery();

    discovery.scan(300).then((devices) => {
      if (devices.length > 0) {
        res(devices[0]);
      } else rej("No devices found");
    });
  });
};

const setTurnedOn = (mode) => {
  discoverDevices()
    .then((device) => {
      let light = new Control(device.address);
      light.setPower(mode);
      toggleValue = mode;
    })
    .catch((error) => {
      log(error);
    });
};

let toggleValue = true;
const toggle = () => {
  turn(!toggleValue);
};

module.exports = {
  discoverDevices,
  setTurnedOn,
  toggle,
};
