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

var React = require('react/addons'),
    happen = require('happen'),
    TestUtils = React.addons.TestUtils;
var Keybinding = require('./');

if (process.browser) {

  test('Keybinding: action', function(t) {
    var HelloMessage = React.createClass({
      mixins: [Keybinding],
      keybindings: { 'C': 'COPY' },
      keybinding: function(event, action) {
        t.equal(action, 'COPY');
        t.equal(typeof event, 'object');
        hello_message.componentWillUnmount();
        t.end();
      },
      render: function() { return React.createElement('div', null); }
    });

    var hello_message = TestUtils.renderIntoDocument(
      React.createElement(HelloMessage));

    happen.once(window, {
      type: 'keydown',
      keyCode: 67
    });
  });

  test('Keybinding: action with meta', function(t) {
    var HelloMessage = React.createClass({
      mixins: [Keybinding],
      keybindings: { 'cmd+C': 'COPY' },
      keybinding: function(event, action) {
        t.equal(action, 'COPY');
        t.equal(typeof event, 'object');
        t.deepEqual(this.getAllKeybindings(), [{ 'cmd+C': 'COPY' }], 'getAllKeybindings');
        hello_message.componentWillUnmount();
        t.deepEqual(this.getAllKeybindings(), [], 'getAllKeybindings after unmount');
        t.end();
      },
      render: function() { return React.createElement('div', null); }
    });

    var hello_message = TestUtils.renderIntoDocument(
      React.createElement(HelloMessage));

    happen.once(window, {
      type: 'keydown',
      keyCode: 67,
      metaKey: true
    });
  });

} else {

  test('headless', function(t) {
    var HelloMessage = React.createClass({
      mixins: [Keybinding],
      keybindings: { 'C': 'COPY' },
      keybinding: function(event, action) {
      },
      render: function() { return React.createElement('div', null); }
    });
    t.ok(React.renderToString(React.createElement(HelloMessage)));
    t.end();
  });

}
