# react-keybinding

[![build status](https://secure.travis-ci.org/mapbox/react-keybinding.png)](http://travis-ci.org/mapbox/react-keybinding)

Declarative, lightweight, and robust keybindings HOC for React.

* Straightforward `'⌘S'` string syntax for declaring bindings
* Automatically binds & unbinds keybindings when components mount and unmount
* Allows listing of all currently-active keybindings
* Run a function when a keybinding is hit or pass an action
  to the `keybinding` method of that component
* Doesn't fire keybindings accidentally triggered in inputs,
  select boxes, or textareas.
* Optionally coerce platform specific keybindings (i.e. `'⌘S'` on Mac to `'^S'` on Windows)

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
    ReactDOM = require('react-dom'),
    Keybinding = require('../');
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
```

There's a runnable example in the `./examples` directory: to run it,

```sh
$ npm install
$ cd example
$ npm install
$ npm start
```

See [tmcw/ditty](https://github.com/tmcw/ditty) for an example of
react-keybinding in an application.

### API

This module exposes a single HOC called `withKeybindings`.

Where you use this HOC on Components, it expects a prop called
`keybindings` of the format:

```js
keybindings: {
  // keys are strings: they can contain meta and shift symbols,
  // numbers, strings, etc
  '⌘S': function(e) {
    // bindings can map to functions that they call directly
  },
  // or to constants that are passed to the component's
  // 'keybinding' method.
  '⌘C': 'COPY'
}
```

Platform agnostic keybindings will automatically listen for the `'Ctrl'`
equivalent of `'Cmd'` keybindings, and vice-versa. To automatically coerce
platform specific keybindings, provide a property called
`keybindingsPlatformAgnostic` of the format:

```js
keybindingsPlatformAgnostic: true,
keybindings: { ... }
```

The HOC provides a method for components called `.getAllKeybindings()`:
this yields an array of all `keybindings` properties on all active components.

## [Syntax](SYNTAX.md)

The full [range of codes and modifiers supported is listed in SYNTAX.md](SYNTAX.md).

## Tests

```sh
$ npm test
```
