var parseCode = require('./parse_code.js');

/**
 * Given an object of mappings from
 * keybinding strings to actions,
 * return an array of parsed keystroke
 * expectations and actions.
 * @param {Object} keybindings
 * @returns {Array<Object>} matchers
 */
module.exports = function(keybindings) {
  var matchers = [];
  for (var code in keybindings) {
    matchers.push({
      expectation: parseCode(code),
      action: keybindings[code]
    });
  }
  return matchers;
};
