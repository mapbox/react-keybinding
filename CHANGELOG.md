## 1.2.0

* Implement keybinding formatter that simplifies and shortens longform
  keycodes for display in interfaces.

## 1.1.1

* Never push `undefined` onto the array of keybindings. This is useful
  if you have a component that reads keybindings but doesn't have any of its own.
