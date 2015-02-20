var test = require('tape');

var parseCode = require('./src/parse_code.js');

test('parseCode', function(t) {
    t.deepEqual(parseCode('a'), {
        altKey: false, ctrlKey: false, keyCode: 65, metaKey: false, shiftKey: false }, 'a');
    t.deepEqual(parseCode('b'), {
        altKey: false, ctrlKey: false, keyCode: 66, metaKey: false, shiftKey: false }, 'b');
    t.deepEqual(parseCode('['), {
        altKey: false, ctrlKey: false, keyCode: 219, metaKey: false, shiftKey: false }, '[');
    t.deepEqual(parseCode('⌘V'), {
        altKey: false, ctrlKey: false, keyCode: 86, metaKey: true, shiftKey: false }, 'command c');
    t.deepEqual(parseCode('⇧a'), {
        altKey: false, ctrlKey: false, keyCode: 65, metaKey: false, shiftKey: true }, 'shift a');
    t.deepEqual(parseCode('⎋'), {
        altKey: false, ctrlKey: false, keyCode: 27, metaKey: false, shiftKey: false }, 'escape');
    t.end();
});

var match = require('./src/match.js');

test('match', function(t) {
    t.equal(
        match(
            { altKey: false, ctrlKey: false, keyCode: 65, metaKey: false, shiftKey: false },
            { altKey: false, ctrlKey: false, keyCode: 65, metaKey: false, shiftKey: false }
        ), true);
    t.equal(
        match(
            { altKey: false, ctrlKey: false, keyCode: 65, metaKey: false, shiftKey: false },
            { altKey: true, ctrlKey: false, keyCode: 65, metaKey: false, shiftKey: false }
        ), false);
    t.end();
});

var parseEvents = require('./src/parse_events.js');

test('parseEvents', function(t) {
    t.deepEqual(parseEvents({'a':'b'}), [{
      expectation: {
        altKey: false, ctrlKey: false, keyCode: 65, metaKey: false, shiftKey: false
      },
      action: 'b'
    }], 'a');
    t.end();
});
