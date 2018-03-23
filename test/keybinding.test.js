var test = require('tape');
var formatCode = require('../src/helpers/format_code.js');
var parseCode = require('../src/helpers/parse_code.js');
var match = require('../src/helpers/match.js');
var parseEvents = require('../src/helpers/parse_events.js');
var React = require('react/addons');
var happen = require('happen');
var TestUtils = React.addons.TestUtils;
var Keybinding = require('../src/components/keybinding');

test('formatCode', function(t) {
    t.deepEqual(formatCode(parseCode('shift')), ['⇧'], 'shift');
    t.deepEqual(formatCode(parseCode('shift+a')), ['⇧', 'a'], 'modifier and char');
    t.deepEqual(formatCode(parseCode('+')), ['+'], 'shifted key');
    t.deepEqual(formatCode(parseCode('*')), ['*'], 'shifted key');
    t.deepEqual(formatCode(parseCode('^')), ['^'], 'shifted key');
    t.deepEqual(formatCode(parseCode('cmd+^')), [ '⌘', '^' ], 'cmd+shifted key');
    t.deepEqual(formatCode(parseCode('shift+cmd')), ['⇧', '⌘'], 'multiple modifiers');
    t.deepEqual(formatCode(parseCode('arrow-up')), ['↑'], 'longcode');
    t.end();
});

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
    t.deepEqual(parseCode('?'), {
        altKey: false, ctrlKey: false, keyCode: 191, metaKey: false, shiftKey: true }, '?');
    t.end();
});

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

test('parseEvents', function(t) {
    t.deepEqual(parseEvents({'a':'b'}), [{
      expectation: {
        altKey: false, ctrlKey: false, keyCode: 65, metaKey: false, shiftKey: false
      },
      action: 'b'
    }], 'a');
    t.end();
});

test('parseEvents platformAgnostic', function(t) {
    t.deepEqual(parseEvents({'a':'b'}, true), [{
      expectation: {
        altKey: false, ctrlKey: false, keyCode: 65, metaKey: false, shiftKey: false
      },
      action: 'b'
    }], 'ignore neither cmd nor ctrl');
    t.deepEqual(parseEvents({'cmd+a':'b'}, true), [
      {
        expectation: {
          altKey: false, ctrlKey: false, keyCode: 65, metaKey: true, shiftKey: false
        },
        action: 'b'
      },
      {
        expectation: {
          altKey: false, ctrlKey: true, keyCode: 65, metaKey: false, shiftKey: false
        },
        action: 'b'
      }
    ], 'convert cmd to ctrl');
    t.deepEqual(parseEvents({'ctrl+a':'b'}, true), [
      {
        expectation: {
          altKey: false, ctrlKey: true, keyCode: 65, metaKey: false, shiftKey: false
        },
        action: 'b'
      },
      {
        expectation: {
          altKey: false, ctrlKey: false, keyCode: 65, metaKey: true, shiftKey: false
        },
        action: 'b'
      }
    ], 'convert ctrl to cmd');
    t.deepEqual(parseEvents({'cmd+ctrl+a':'b'}, true), [{
      expectation: {
        altKey: false, ctrlKey: true, keyCode: 65, metaKey: true, shiftKey: false
      },
      action: 'b'
    }], 'ignore both cmd and ctrl');
    t.end();
});

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

    happen.once(document, {
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

    happen.once(document, {
      type: 'keydown',
      keyCode: 67,
      metaKey: true
    });
  });

  test('Keybinding: ?', function(t) {
    var HelloMessage = React.createClass({
      mixins: [Keybinding],
      keybindings: { '?': function() { t.pass(); t.end();  } },
      render: function() { return React.createElement('div', null); }
    });

    var hello_message = TestUtils.renderIntoDocument(
      React.createElement(HelloMessage));

    happen.once(document, { type: 'keydown', keyCode: 191, shiftKey: true });
  });

  test('Keybinding: none by myself', function(t) {
    var HelloMessage = React.createClass({
      mixins: [Keybinding],
      componentDidMount: function() {
        t.deepEqual(this.getAllKeybindings(), []);
        t.end();
      },
      render: function() { return React.createElement('div', null); }
    });
    var hello_message = TestUtils.renderIntoDocument(
      React.createElement(HelloMessage));
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
