const { Extension, INPUT_METHOD, PLATFORMS } = require("deckboard-kit");
const lights = require("./lib/lightControl");

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
        ],
      },
    ];
  }

  execute(action, { powerAction }) {
    switch (action) {
      case "light-control": {
        switch (powerAction) {
          case "turn-on":
            lights.setTurnedOn(true);
            break;
          case "turn-off":
            lights.setTurnedOn(false);
            break;
          case "toggle":
            lights.toggle();
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
