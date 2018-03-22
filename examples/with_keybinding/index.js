import React from 'react';
import PropTypes from 'prop-types';
import { withKeybinding } from '../../src/components/with_keybinding';

let ListAllKeybindings = class ListAllKeybindings extends React.PureComponent {
  state = { keybindings: [] };

  static propTypes = {
    getAllKeybindings: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.setState({ keybindings: this.props.getAllKeybindings() });
  }

  formatKeybindings = () => {
    return (
      <ul>
        {this.state.keybindings.map(keyObject => {
          Object.keys(keyObject).map(key => {
            return <li>key</li>
          })
        })}
      </ul>
    )
  }

  render() {
    return (
      <div>
        {this.formatKeybindings()}
      </div>
    )
  }
}

ListAllKeybindings = withKeybinding(ListAllKeybindings);

export { ListAllKeybindings };
