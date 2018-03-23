module.exports = function platform(code, os) {
    if (os === 'mac') return code;

    var replacements = {
        '⌘': 'Ctrl',
        '⇧': 'Shift',
        '⌥': 'Alt',
        '⌫': 'Backspace',
        '⌦': 'Delete'
    }, keys = [];

    if (os === 'win') {
        if (code === '⌘⇧Z') return 'Ctrl+Y';
    }

    for (var i = 0; i < code.length; i++) {
        if (code[i] in replacements) {
            keys.push(replacements[code[i]]);
        } else {
            keys.push(code[i]);
        }
    }

    return keys.join('+');
}
