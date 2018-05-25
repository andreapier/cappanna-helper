import React, { Component } from "react";
import { connect } from "react-redux";
import WaitDialog from "components/WaitDialog";

class ConnectedWaitDialog extends Component {
  render() {
    return <WaitDialog {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    loading: state.api.loading,
    message: state.api.message
  };
};

export default connect(mapStateToProps)(ConnectedWaitDialog);
