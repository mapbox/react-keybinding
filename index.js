var parseEvents = require('./src/parse_events.js'),
    isInput = require('./src/is_input.js'),
    match = require('./src/match.js');

var Keybinding = {
  __keybinding: function(event) {
    if (isInput(event)) return;
    for (var i = 0; i < this.matchers.length; i++) {
      if (match(this.matchers[i].expectation, event)) {
        if (typeof this.matchers[i].action === 'function') {
          this.matchers[i].action(event);
        } else {
          if (typeof this.keybinding !== 'function') {
            throw new Error('non-function keybinding action given but no .keybinding method found on component');
          }
          this.keybinding(event, this.matchers[i].action);
        }
      }
    }
  },
  componentDidMount: function() {
    this.matchers = parseEvents(this.keybindings || {});
    window.addEventListener('keydown', this.__keybinding);
  },
  componentWillUnmount: function() {
    window.removeEventListener('keydown', this.__keybinding);
  }
};

module.exports = Keybinding;
