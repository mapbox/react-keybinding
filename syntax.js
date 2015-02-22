var fs = require('fs');
var codes = require('./src/codes');

/**
 * This file generates the file SYNTAX.md, which lists
 * all of the available key combinations supported by this mixin.
 */
function pairs(o) {
  return Object.keys(o).map(function(k) { return [k, o[k]]; });
}

var out = fs.createWriteStream('SYNTAX.md', { flags: 'w' });

out.write('# Syntax\n\n');

out.write('## keyCodes\n\n');
out.write('| input | keyCode |\n');
out.write('|------------|------------------|\n');

pairs(codes.keyCodes).forEach(function(pair) {
  out.write('| `` ' + pair[0] + ' `` | ' + pair[1] + ' |\n');
});

out.write('\n\n## shift key combinations\n\n');
out.write('| input | keyCode |\n');
out.write('|------------|------------------|\n');

pairs(codes.shiftedKeys).forEach(function(pair) {
  out.write('| `` ' + pair[0] + ' `` | shift + ' + pair[1] + ' |\n');
});

out.write('\n\n## modifiers\n\n');
out.write('| input | keyCode |\n');
out.write('|------------|------------------|\n');

pairs(codes.modifierCodes).forEach(function(pair) {
  out.write('| `` ' + pair[0] + ' `` | ' + pair[1] + ' |\n');
});

out.end();
