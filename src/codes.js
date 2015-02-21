/**
 * Keycodes, modifier codes,
 * and anything else that can be typed,
 * compiled into a big lookup table.
 */
module.exports.modifierCodes = {
    // Shift key, ⇧
    '⇧': 16, shift: 16,
    // CTRL key, on Mac: ⌃
    '⌃': 17, ctrl: 17,
    // ALT key, on Mac: ⌥ (Alt)
    '⌥': 18, alt: 18, option: 18,
    // META, on Mac: ⌘ (CMD), on Windows (Win), on Linux (Super)
    '⌘': 91, meta: 91, cmd: 91, 'super': 91, win: 91
};

module.exports.modifierProperties = {
    16: 'shiftKey',
    17: 'ctrlKey',
    18: 'altKey',
    91: 'metaKey'
};

module.exports.keyCodes = {
    // Backspace key, on Mac: ⌫ (Backspace)
    '⌫': 8, backspace: 8,
    // Tab Key, on Mac: ⇥ (Tab), on Windows ⇥⇥
    '⇥': 9, '⇆': 9, tab: 9,
    // Return key, ↩
    '↩': 13, 'return': 13, enter: 13, '⌅': 13,
    // Pause/Break key
    'pause': 19, 'pause-break': 19,
    // Caps Lock key, ⇪
    '⇪': 20, caps: 20, 'caps-lock': 20,
    // Escape key, on Mac: ⎋, on Windows: Esc
    '⎋': 27, escape: 27, esc: 27,
    // Space key
    space: 32,
    // Page-Up key, or pgup, on Mac: ↖
    '↖': 33, pgup: 33, 'page-up': 33,
    // Page-Down key, or pgdown, on Mac: ↘
    '↘': 34, pgdown: 34, 'page-down': 34,
    // END key, on Mac: ⇟
    '⇟': 35, end: 35,
    // HOME key, on Mac: ⇞
    '⇞': 36, home: 36,
    // Insert key, or ins
    ins: 45, insert: 45,
    // Delete key, on Mac: ⌦ (Delete)
    '⌦': 46, del: 46, 'delete': 46,
    // Left Arrow Key, or ←
    '←': 37, left: 37, 'arrow-left': 37,
    // Up Arrow Key, or ↑
    '↑': 38, up: 38, 'arrow-up': 38,
    // Right Arrow Key, or →
    '→': 39, right: 39, 'arrow-right': 39,
    // Up Arrow Key, or ↓
    '↓': 40, down: 40, 'arrow-down': 40,
    // odities, printing characters that come out wrong:
    // Num-Multiply, or *
    '*': 106, star: 106, asterisk: 106, multiply: 106,
    // Num-Plus or +
    '+': 107, 'plus': 107,
    // Num-Subtract, or -
    '-': 109, subtract: 109,
    // Semicolon
    ';': 186, semicolon:186,
    // = or equals
    '=': 187, 'equals': 187,
    // Comma, or ,
    ',': 188, comma: 188,
    //'-': 189, //???
    // Period, or ., or full-stop
    '.': 190, period: 190, 'full-stop': 190,
    // Slash, or /, or forward-slash
    '/': 191, slash: 191, 'forward-slash': 191,
    // Tick, or `, or back-quote
    '`': 192, tick: 192, 'back-quote': 192,
    // Open bracket, or [
    '[': 219, 'open-bracket': 219,
    // Back slash, or \
    '\\': 220, 'back-slash': 220,
    // Close backet, or ]
    ']': 221, 'close-bracket': 221,
    // Apostrophe, or Quote, or '
    '\'': 222, quote: 222, apostrophe: 222
};

// NUMPAD 0-9
var i = 95, n = 0;
while (++i < 106) {
    module.exports.keyCodes['num-' + n] = i;
    ++n;
}

// 0-9
i = 47; n = 0;
while (++i < 58) {
    module.exports.keyCodes[n] = i; ++n;
}

// F1-F25
i = 111; n = 1;
while (++i < 136) {
    module.exports.keyCodes['f' + n] = i; ++n;
}

// ;-a-z
i = 63;
while (++i < 91) {
    module.exports.keyCodes[String.fromCharCode(i).toLowerCase()] = i;
}

module.exports.shiftedKeys = {};

// these non-letter keys imply a shift key on US keyboards
[[ '~', '`' ],
 [ '!', '1' ],
 [ '@', '2' ],
 [ '#', '3' ],
 [ '$', '4' ],
 [ '%', '5' ],
 [ '^', '6' ],
 [ '&', '7' ],
 [ '*', '8' ],
 [ '(', '9' ],
 [ ')', '0' ],
 [ '_', '-' ],
 [ '+', '=' ],
 [ ':', ';' ],
 [ '\"', '\'' ],
 [ '<', ',' ],
 [ '>', '.' ],
 [ '?', '/' ]
].forEach(function(key) {
  module.exports.shiftedKeys[key[0]] = module.exports.keyCodes[key[1]];
});
