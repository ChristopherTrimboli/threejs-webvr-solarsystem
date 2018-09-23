/*
 * Gamepad Utility
 */

// Gamepad button index map for Oculus Rift, Go and Gear VR
const btnMap = {
    stick:   0,
    trigger: 1,
}

GamepadUtility = class {
    constructor() {
        this.gamepads = [];
        this.gamepad = {
            left:  {
                trigger: {
                    press: () => {return this.buttonState("left", btnMap.trigger, "press")},
                    touch: () => {return this.buttonState("left", btnMap.trigger, "touch")},
                    value: () => {return this.buttonState("left", btnMap.trigger, "value")}
                },
                stick: {
                    press: () => {return this.buttonState("left", btnMap.stick, "press")},
                    touch: () => {return this.buttonState("left", btnMap.stick, "touch")},
                    value: () => {return this.buttonState("left", btnMap.stick, "value")}
                }
            },
            right: {
                trigger: {
                    press: () => {return this.buttonState("right", btnMap.trigger, "press")},
                    touch: () => {return this.buttonState("right", btnMap.trigger, "touch")},
                    value: () => {return this.buttonState("right", btnMap.trigger, "value")}
                },
                stick: {
                    press: () => {return this.buttonState("right", btnMap.stick, "press")},
                    touch: () => {return this.buttonState("right", btnMap.stick, "touch")},
                    value: () => {return this.buttonState("right", btnMap.stick, "value")}
                }
            }
        }
        this.setup();
    }

    setup() {
        Array.prototype.forEach.call(navigator.getGamepads(), (pad) => {
            if(pad) {
                var gamepad = new Gamepad(pad.id, pad.hand, pad.pose);
                pad.buttons.forEach(() => {gamepad.buttons.push(new GamepadButton());});
                this.gamepads.push(gamepad);
            }
        });
    }

    update() {
        if(this.checkGamepads())
            Array.prototype.forEach.call(navigator.getGamepads(), (pad, padIndex) => {
                if(pad) {
                    pad.buttons.forEach((btn, btnIndex) => {
                        this.gamepads[padIndex].buttons[btnIndex].pressed = btn.pressed;
                        this.gamepads[padIndex].buttons[btnIndex].touched = btn.touched;
                        this.gamepads[padIndex].buttons[btnIndex].value   = btn.value;
                    });
                }
            });
    }

    checkGamepads() {
        if(this.gamepads.length < 1) this.setup();
        return this.gamepads.length > 0 ? true : false;
    }

    buttonState(hand, btnIndex, action) {
        if(this.checkGamepads())
            switch(action) {
                case "press":
                    for(let pad of this.gamepads)
                        if(pad.hand === hand) return pad.buttons[btnIndex].pressed;
                    return false;
                case "touch":
                    for(let pad of this.gamepads)
                        if(pad.hand === hand) return pad.buttons[btnIndex].touched;
                    return false;
                case "value":
                    for(let pad of this.gamepads)
                        if(pad.hand === hand) return pad.buttons[btnIndex].value;
                    return 0;
            }
        else return false;
    }
}

Gamepad = class {
    constructor(id, hand, pose) {
        this.id = id;
        this.hand = hand;
        this.axes = [];
        this.buttons = [];
        this.pose = pose;
    }
}

GamepadButton = class {
    constructor() {
        this.pressed;
        this.touched;
        this.value;
    }
}
