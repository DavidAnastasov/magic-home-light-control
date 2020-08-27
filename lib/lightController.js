const { Discovery, Control } = require("magic-home");

const discoverDevices = () => {
  return new Promise((res) => {
    let discovery = new Discovery();

    discovery
      .scan(500)
      .then((devices) => {
        const json = devices.map((device) => JSON.stringify(device));

        const allDevices = JSON.parse([...new Set(json)]);

        res(allDevices);
      })
      .catch(() => res([]));
  });
};

const setTurnedOn = (address, mode) => {
  let light = new Control(address, { command_timeout: 500 });

  light.setPower(mode).catch(() => {
    discoverDevices().then((devices) => {
      if (devices.length > 0) setTurnedOn(devices[0].address, mode);
    });
  });

  toggleValue = mode;
};

let toggleValue = true;
const toggle = (address) => {
  setTurnedOn(address, !toggleValue);
};

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

const setColor = (address, color) => {
  let light = new Control(address, { command_timeout: 500 });

  const rgb = hexToRgb(color);
  light.setColor(rgb.r, rgb.g, rgb.b).catch(() => {
    discoverDevices().then((devices) => {
      if (devices.length > 0) setTurnedOn(devices[0].address, mode);
    });
  });

  toggleValue = true;
};

module.exports = {
  discoverDevices,
  setTurnedOn,
  toggle,
  setColor,
};
