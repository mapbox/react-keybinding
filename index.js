var parseEvents = require('./src/parse_events.js'),
    isInput = require('./src/is_input.js'),
    match = require('./src/match.js');

var Keybinding = {
  childContextTypes: {
    __keybindings: React.PropTypes.object
  },
  contextTypes: {
    __keybindings: React.PropTypes.object
  },
  getChildContext: function() {
    return {
      __keybindings: this.__getKeybinds()
    };
  },
  __getKeybindings: function() {
    this.__keybindings = this.__keybindings ||
      (this.context && this.context.__keybindings) ||
      { bindings: [] };
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
    window.addEventListener('keydown', this.__keybinding);
    this.getKeybindings().push(this.keybindings);
  },
  componentWillUnmount: function() {
    window.removeEventListener('keydown', this.__keybinding);
    this.getKeybindings()
      .splice(this.getKeybindings().indexOf(this.keybindings), 1);
  }
};

module.exports = Keybinding;
