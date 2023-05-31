import React from 'react';
import ReactDOM from 'react-dom';
import './ProfileSettings.css';

const ProfileSettingsModal = document.getElementById('settings-modal');

class SettingsModal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    ProfileSettingsModal.appendChild(this.el);
  }

  componentWillUnmount() {
    ProfileSettingsModal.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

export default SettingsModal;
