import "./Modal.scss";

import { Button, Dialog } from "@blueprintjs/core";
import React, { Component } from "react";

import { connect } from "react-redux";
import { hideModal } from "../../redux/actions";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  onClose = () => {
    this.props.hideModal();
  };

  render() {
    const {
      title,
      isOpen,
      onCancel,
      onPrimary,
      onSecondary,
      transitionDuration,
      icon,
      cancelText,
      primaryText,
      secondartyText,
      isCloseButtonShown,
      body
    } = this.props.modalProps;

    return (
      <Dialog
        className="bp3-dark modal"
        icon={icon}
        isCloseButtonShown={isCloseButtonShown}
        transitionDuration={transitionDuration}
        onClose={this.onClose}
        isOpen={isOpen}
        title={title}
      >
        <div className="bp3-dialog-body">{body}</div>
        <div className="bp3-dialog-footer">
          <div>
            {onSecondary && (
              <Button
                className="bp3-button bp3-intent-danger left"
                onClick={onSecondary}
              >
                {secondartyText}
              </Button>
            )}
          </div>
          <div>
            {onCancel && (
              <Button className="bp3-button bp3-minimal" onClick={onCancel}>
                {cancelText}
              </Button>
            )}
            {onPrimary && (
              <Button
                className="bp3-button bp3-intent-primary"
                onClick={onPrimary}
              >
                {primaryText}
              </Button>
            )}
          </div>
        </div>
      </Dialog>
    );
  }
}

const mapStateToProps = state => ({
  ...state.modal
});

const mapDispatchToProps = dispatch => {
  return {
    hideModal: () => dispatch(hideModal())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);
