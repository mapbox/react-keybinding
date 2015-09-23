var codes = require('./codes.js');

function findShortestIdentifiers(set) {
  var reversed = {}, k;
  for (k in set) {
    var id = set[k];
    if (reversed[id] === undefined) reversed[id] = [];
    reversed[id].push(k);
  }
  function shorter(a, b) {
    return a.length - b.length;
  }
  for (k in reversed) {
    reversed[k] = reversed[k].sort(shorter)[0];
  }
  return reversed;
}

var shortest = {
  modifierCodes: findShortestIdentifiers(codes.modifierCodes),
  keyCodes: findShortestIdentifiers(codes.keyCodes)
};

/**
 * Format a key code combination into an array of shortest-possible
 * key identifiers
 * @param {Object} input parsed keybinding
 * @returns {Array<String>} array of identifiers
 * @example
 * formatCode(parseCode('a'));
 */
module.exports = function formatCode(input) {
  var formatted = [];
  var isShifted = input.keyCode in codes.unshiftedKeys;
  if (input.shiftKey && !isShifted) {
    formatted.push(shortest.modifierCodes[16]);
  }
  if (input.metaKey) formatted.push(shortest.modifierCodes[91]);
  if (input.altKey) formatted.push(shortest.modifierCodes[18]);
  if (input.ctrlKey) formatted.push(shortest.modifierCodes[17]);

  if (input.keyCode !== null) {
    if (isShifted) {
      formatted.push(codes.unshiftedKeys[input.keyCode]);
    } else {
      var shortCode = shortest.keyCodes[input.keyCode];
      formatted.push(shortCode ? shortCode : input.keyCode);
    }
  }

  return formatted;
};
