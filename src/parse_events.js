var parseCode = require('./parse_code.js');

/**
 * Given an object of mappings from
 * keybinding strings to actions,
 * return an array of parsed keystroke
 * expectations and actions.
 * @param {Object} keybindings
 * @param {Boolean} platformAgnostic convert platform specific keybindgs
 * @returns {Array<Object>} matchers
 */
module.exports = function(keybindings, platformAgnostic) {
  var matchers = [];
  for (var code in keybindings) {
    var event = parseCode(code);
    matchers.push({
      expectation: event,
      action: keybindings[code]
    });
    if (platformAgnostic && (event.metaKey ? !event.ctrlKey : event.ctrlKey)) {
      // meta xor ctrl
      matchers.push({
        expectation: {
          keyCode: event.keyCode,
          shiftKey: event.shiftKey,
          ctrlKey: !event.ctrlKey,
          altKey: event.altKey,
          metaKey: !event.metaKey
        },
        action: keybindings[code]
      });
    }
  }
  return matchers;
};
