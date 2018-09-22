/*
 * Gamepad Utility
 */

GamepadUtility = class {
    constructor() {
        this.gamepads = [];
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
            Array.prototype.forEach.call(navigator.getGamepads(), (pad, pIndex) => {
                if(pad) {
                    pad.buttons.forEach((btn, bIndex) => {
                        this.gamepads[pIndex].buttons[bIndex].pressed = btn.pressed;
                        this.gamepads[pIndex].buttons[bIndex].touched = btn.touched;
                        this.gamepads[pIndex].buttons[bIndex].value   = btn.value;
                    });
                }
            });
    }

    checkGamepads() {
        if(this.gamepads.length < 1) this.setup();
        return this.gamepads.length > 0 ? true : false;
    }

    buttonPress(name) {
        if(this.checkGamepads())
            switch(name) {
                case "leftTrigger":
                    for(let pad of this.gamepads)
                        if(pad.hand === "left") return pad.buttons[1].pressed;
                    return false;
                case "rightTrigger":
                    for(let pad of this.gamepads)
                        if(pad.hand === "right") return pad.buttons[1].pressed;
                    return false;
                default:
                    return false;
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
