import React from 'react';
import KeybindingMixin from './keybinding';

function withKeybinding(WrappedComponent: Function): Function {
  let Keybinding = class Keybinding extends React.Component {
    getChildContext = KeybindingMixin.getChildContext.bind(this);

    __getKeybindings = KeybindingMixin.__getKeybindings.bind(this);

    getAllKeybindings = KeybindingMixin.getAllKeybindings.bind(this);

    __keybinding = KeybindingMixin.__keybinding.bind(this);

    componentDidMount = KeybindingMixin.componentDidMount.bind(this);

    componentWillUnmount = KeybindingMixin.componentDidMount.bind(this);

    render() {
      return (
        <WrappedComponent
          {...this.props}
          getChildContext={this.getChildContext}
          getAllKeybindings={this.getAllKeybindings}
        />
      )
    }
  };

  Keybinding.WrappedComponent = WrappedComponent;
  Keybinding.childContextTypes = KeybindingMixin.childContextTypes;
  Keybinding.contextTypes = KeybindingMixin.contextTypes;
  return Keybinding;
}

export { withKeybinding };
