import React from 'react';
import ReactDOM from 'react-dom';
import './CommentModal.css';

const AddCommentModal = document.getElementById('add-comment-modal');

class CommentModal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    AddCommentModal.appendChild(this.el);
  }

  componentWillUnmount() {
    AddCommentModal.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

export default CommentModal;
