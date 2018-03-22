var React = require('react'),
    Keybinding = require('../../src/components/keybinding');

var HelloMessage = React.createClass({
  mixins: [Keybinding],
  keybindings: {
    '⌘S': function(e) {
      console.log('save!');
      e.preventDefault();
    },
    '⌘C': 'COPY'
  },
  keybinding: function(event, action) {
    // event is the browser event
    // action is 'COPY'
    console.log(arguments);
  },
  render: function() {
    return React.createElement("div", null, "Hello");
  }
});

React.render(React.createElement(HelloMessage, {name: "John"}), document.body);
