const { Extension, INPUT_METHOD, PLATFORMS } = require("deckboard-kit");
const LightController = require("./lib/LightController");
const { Control } = require("magic-home");

class PowerControlExtension extends Extension {
  constructor() {
    super();

    const device = {
      label: "Device IP Address",
      ref: "device",
      type: INPUT_METHOD.INPUT_TEXT,
    };

    const patterns = Control.patternNames.map((pattern) => ({
      label: pattern,
      value: pattern,
    }));

    const speeds = [...Array(101).keys()].map((number) => ({
      label: number,
      value: number,
    }));

    this.name = "Magic home light control";
    this.platforms = [PLATFORMS.WINDOWS, PLATFORMS.MAC];
    this.inputs = [
      {
        label: "Power control",
        value: "power-control",
        icon: "power-off",
        color: "#34495e",
        input: [
          {
            label: "Action",
            ref: "powerAction",
            type: INPUT_METHOD.INPUT_SELECT,
            items: [
              {
                label: "Turn on",
                value: "turn-on",
              },
              {
                label: "Turn off",
                value: "turn-off",
              },
              {
                label: "Toggle",
                value: "toggle",
              },
            ],
          },
          device,
        ],
      },
      {
        label: "Color control",
        value: "color-control",
        icon: "lightbulb",
        input: [
          {
            label: "Color",
            ref: "color",
            type: INPUT_METHOD.INPUT_TEXT,
          },
          device,
        ],
      },
      {
        label: "Set pattern",
        value: "set-pattern",
        icon: "chess-board",
        input: [
          {
            label: "Pattern",
            ref: "pattern",
            type: INPUT_METHOD.INPUT_SELECT,
            items: patterns,
          },
          {
            label: "Speed",
            ref: "speed",
            type: INPUT_METHOD.INPUT_SELECT,
            items: speeds,
          },
          device,
        ],
      },
    ];
  }

  execute(action, { powerAction, device, color, pattern, speed }) {
    switch (action) {
      case "power-control": {
        switch (powerAction) {
          case "turn-on":
            LightController.setTurnedOn(device, true);
            break;
          case "turn-off":
            LightController.setTurnedOn(device, false);
            break;
          case "toggle":
            LightController.toggle(device);
            break;
          default:
            break;
        }
      }
      case "color-control": {
        LightController.setColor(device, color);
        break;
      }
      case "set-pattern": {
        LightController.setPattern(device, pattern, speed);
        break;
      }
      default:
        break;
    }
  }
}

process.on("uncaughtException", (err) => {
  console.log("Caught exception: " + err);
});

module.exports = new PowerControlExtension();
