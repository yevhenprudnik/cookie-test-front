import React from 'react';
import ReactDOM from 'react-dom';
import './PostModal.css';

const AddPostModal = document.getElementById('add-post-modal');

class PostModal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    AddPostModal.appendChild(this.el);
  }

  componentWillUnmount() {
    AddPostModal.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

export default PostModal;
