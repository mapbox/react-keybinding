var React = require('react'),
    Keybinding = require('../');

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
  displayName: "HelloMessage",
  render: function() {
    return React.createElement("div", null, "Hello ", this.props.name);
  }
});

React.render(React.createElement(HelloMessage, {name: "John"}), document.body);
