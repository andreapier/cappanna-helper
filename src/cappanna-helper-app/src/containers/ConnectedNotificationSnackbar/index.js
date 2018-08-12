import React, { Component } from "react";
import { connect } from "react-redux";
import NotificationSnackbar from "components/Snackbar/NotificationSnackbar";
import { resetNotification } from "actions";

class ConnectedNotificationSnackbar extends Component {
  render() {
    if (!this.props.message) {
      return null;
    }

    return <NotificationSnackbar {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    type: state.message.type,
    message: state.message.message
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleClose: () => dispatch(resetNotification())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  ConnectedNotificationSnackbar
);
