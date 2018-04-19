import React, { Component } from "react";
import { connect } from "react-redux";
import ErrorSnackbar from "components/Snackbar/ErrorSnackbar";
import { setError } from "actions";

class ConnectedErrorSnackbar extends Component {
  render() {
    if (!this.props.message) {
      return null;
    }

    return <ErrorSnackbar {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    message: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleClose: () => dispatch(setError(null))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  ConnectedErrorSnackbar
);
