var React = require('react'),
  PropTypes = require('prop-types'),
  createReactClass = require('create-react-class'),
  parseEvents = require('./src/parse_events.js'),
  isInput = require('./src/is_input.js'),
  match = require('./src/match.js');

  // This function takes a component...
function withKeybindings(WrappedComponent) {
  // ...and returns another component...
  return createReactClass({
    /**
    * Housekeeping to pass around a single array of all
    * currently-active keybinding objects.
    */
    childContextTypes: { __keybindings: PropTypes.array },
    contextTypes: { __keybindings: PropTypes.array },
    getChildContext: function() {
      return { __keybindings: this.__getKeybindings() };
    },
    __getKeybindings: function() {
      this.__keybindings = this.__keybindings ||
        (this.context && this.context.__keybindings) || [];
      return this.__keybindings;
    },

    /**
    * This is the only method meant to be exposed to the user: it
    * returns the global keybinding index for the purposes of documentation
    * generation.
    */
    getAllKeybindings: function() {
      return this.__getKeybindings();
    },

    /**
    * Internal method: avoids firing keybindings in textareas,
    * figures out if they match any of the bindings from this component,
    * and then either fires an inline method or the .keybinding() method.
    */
    __keybinding: function(event) {
      if (isInput(event) && !this.keybindingsOnInputs) return;
      for (var i = 0; i < this.matchers.length; i++) {
        if (match(this.matchers[i].expectation, event)) {
          if (typeof this.matchers[i].action === 'function') {
            this.matchers[i].action.apply(this, [event]);
          } else {
            if (typeof this.props.keybinding !== 'function') {
              throw new Error('non-function keybinding action given but no .keybinding method found on component');
            }
            this.props.keybinding.call(this, event, this.matchers[i].action);
          }
        }
      }
    },

    /**
    * When the component mounts, bind our event listener and
    * add our keybindings to the global index.
    */
    componentDidMount: function() {
      if (this.props.keybindings !== undefined) {
        this.matchers = parseEvents(this.props.keybindings, !!this.props.keybindingsPlatformAgnostic);
        document.addEventListener('keydown', this.__keybinding);
        this.__getKeybindings().push(this.props.keybindings);
      }
    },

    /**
    * When the component unmounts, unbind our event listener and
    * remove our keybindings from the global index.
    */
    componentWillUnmount: function() {
      if (this.props.keybindings !== undefined && this.__keybinding !== undefined) {
        document.removeEventListener('keydown', this.__keybinding);
        this.__getKeybindings()
          .splice(this.__getKeybindings().indexOf(this.props.keybindings), 1);
      }
    },
    render: function() {
      const props = Object.assign({}, this.props, {
        getAllKeybindings: this.getAllKeybindings
      });
      return  React.createElement(WrappedComponent, props);
    }
  });

}

module.exports = withKeybindings;
