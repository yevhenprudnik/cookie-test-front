import React from "react";
import ReactDOM from "react-dom";
import "./LoaderModal.css";

const LoadModal = document.getElementById("load-modal");

class LoaderModal extends React.Component {
    constructor(props) {
        super(props);
        this.el = document.createElement("div");
    }

    componentDidMount() {
      LoadModal.appendChild(this.el);
    }

    componentWillUnmount() {
      LoadModal.removeChild(this.el);
    }

    render() {
        return ReactDOM.createPortal(this.props.children, this.el)
    }
}

export default LoaderModal;