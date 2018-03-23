const test = require('tape');
const React = require('react/addons');
import { withKeybinding } from '../src/components/with_keybinding.js';

test('withKeybinding', function(t) {
  let HelloMessage = React.createClass({
    render: function() { return React.createElement('div', null); }
  });

  HelloMessage = withKeybinding(HelloMessage);
  t.ok(HelloMessage.WrappedComponent, 'should pass through wrapped component');
  t.ok(HelloMessage.childContextTypes, 'should pass through child context types');
  t.ok(HelloMessage.contextTypes, 'should pass through context types');
  t.ok(React.createElement(HelloMessage), 'returns a valid react component');
  t.end();
});
