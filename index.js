const { Extension, INPUT_METHOD, PLATFORMS } = require("deckboard-kit");
const lightController = require("./lib/lightController");

class PowerControlExtension extends Extension {
  constructor() {
    super();

    this.name = "Magic home light control";
    this.platforms = [PLATFORMS.WINDOWS, PLATFORMS.MAC];
    this.inputs = [
      {
        label: "Light control",
        value: "light-control",
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
          {
            label: "Device IP Address",
            ref: "device",
            type: INPUT_METHOD.INPUT_TEXT,
          },
        ],
      },
    ];
  }

  execute(action, { powerAction, device }) {
    switch (action) {
      case "light-control": {
        switch (powerAction) {
          case "turn-on":
            lightController.setTurnedOn(device, true);
            break;
          case "turn-off":
            lightController.setTurnedOn(device, false);
            break;
          case "toggle":
            lightController.toggle(device);
            break;
          default:
            break;
        }
      }
      default:
        break;
    }
  }
}

module.exports = new PowerControlExtension();
