var React = require('react'),
    ReactDOM = require('react-dom'),
    withKeybindings = require('../'),
    createReactClass = require('create-react-class');

var HelloMessage = withKeybindings(createReactClass({
  render: function() {
    return React.createElement("div", null, "Hello");
  }
}));

ReactDOM.render(React.createElement(HelloMessage, {
  name: "John",
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
}), document.body);
