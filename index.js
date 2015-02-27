'use strict';

var React = require('react'),
  createSideEffect = require('react-side-effect'),
  parseEvents = require('./src/parse_events.js'),
  isInput = require('./src/is_input.js'),
  match = require('./src/match.js');

function onKeyPress(event) {
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
}

function extractEvents(propsList) {
  var innermostProps = propsList[propsList.length - 1];
  if (innermostProps) {
    return innermostProps.events;
  }
}

var Keybinding = createSideEffect(function handleChange(propsList) {
  var events = extractEvents(propsList);
  this.matchers = parseEvents(events);

  if (typeof document !== 'undefined') {
    document.addEventListener('keypress', onKeyPress);
  }

}, {
  displayName: 'Keybinding',
  propTypes: {
    keys: React.PropTypes.object.isRequired
  }
});

module.exports = Keybinding;
