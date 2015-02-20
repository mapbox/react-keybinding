# react-keybinding

Declarative, lightweight, and robust keybindings mixin for React.

* Straightforward `'⌘S'` string syntax for declaring bindings
* Run a function when a keybinding is hit or pass an action
  to the `keybinding` method of that component
* Doesn't fire keybindings accidentally triggered in inputs,
  select boxes, or textareas.
* Dependency-free

## Installation

Install with [npm](https://www.npmjs.com/) and use in your React
projects with either [browserify](http://browserify.org/) or
[webpack](http://webpack.github.io/).

```sh
$ npm install react-keybinding
```

## Example

```js
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
    // event is the browser event, action is 'COPY'
    console.log(arguments);
  },
  render: function() {
    return React.createElement("div", null, "Hello");
  }
});
React.render(React.createElement(HelloMessage, {name: "John"}), document.body);
```

### API

This module exposes a single mixin called `Keybinding`.

Where you use this mixin on Components, it expects a property called
`keybindings` of the format:

```js
keybindings: {
  // keys are strings: they can contain meta and shift symbols,
  // numbers, strings, etc
  '⌘S': function(e) {
    // bindings can map to functions that they call directlyj
  },
  // or to constants that are passed to the component's
  // 'keybinding' method.
  '⌘C': 'COPY'
}
```
