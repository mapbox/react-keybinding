var React = require('react'),
  parseEvents = require('./src/parse_events.js'),
  isInput = require('./src/is_input.js'),
  match = require('./src/match.js');

var Keybinding = {
  childContextTypes: {
    __keybindings: React.PropTypes.array
  },
  contextTypes: {
    __keybindings: React.PropTypes.array
  },
  getChildContext: function() {
    return {
      __keybindings: this.__getKeybindings()
    };
  },
  __getKeybindings: function() {
    this.__keybindings = this.__keybindings ||
      (this.context && this.context.__keybindings) || [];
    return this.__keybindings;
  },
  getAllKeybindings: function() {
    return this.__getKeybindings();
  },
  __keybinding: function(event) {
    if (isInput(event)) return;
    for (var i = 0; i < this.matchers.length; i++) {
      if (match(this.matchers[i].expectation, event)) {
        if (typeof this.matchers[i].action === 'function') {
          this.matchers[i].action.apply(this, event);
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
    document.addEventListener('keydown', this.__keybinding);
    this.__getKeybindings().push(this.keybindings);
  },
  componentWillUnmount: function() {
    document.removeEventListener('keydown', this.__keybinding);
    this.__getKeybindings()
      .splice(this.__getKeybindings().indexOf(this.keybindings), 1);
  }
};

module.exports = Keybinding;
