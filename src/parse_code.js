var codes = require('./codes.js');

/**
 * parse a key code given as a string
 * into an object of expectations used
 * to match keystrokes.
 * @param {String} input
 * @returns {Object} expectations
 * @example
 * parseCode('a');
 */
module.exports = function parseCode(input) {

    var code = input.toLowerCase()
        .match(/(?:(?:[^+⇧⌃⌥⌘])+|[⇧⌃⌥⌘]|\+\+|^\+$)/g);

    var event = {
        keyCode: 0,
        shiftKey: false,
        ctrlKey: false,
        altKey: false,
        metaKey: false
    };

    for (var i = 0; i < code.length; i++) {
        // Normalise matching errors
        if (code[i] === '++') code[i] = '+';

        if (code[i] in codes.modifierCodes) {
            event[codes.modifierProperties[codes.modifierCodes[code[i]]]] = true;
        } else if (code[i] in codes.shiftedKeys) {
            event.keyCode = codes.shiftedKeys[code[i]];
            event.shiftKey = true;
        } else if (code[i] in codes.keyCodes) {
            event.keyCode = codes.keyCodes[code[i]];
        }
    }

    return event;
};
