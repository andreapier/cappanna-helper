import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { resetOrder, loadOrdersListRequested } from "actions";
import Header from "components/Orders/List/Header";
import { withRouter } from "react-router-dom";

class ConnectedHeader extends Component {
  render() {
    return <Header {...this.props} />;
  }
}

ConnectedHeader.propTypes = {
  loadOrdersListRequested: PropTypes.func.isRequired,
  goToNewOrder: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadOrdersListRequested: () => dispatch(loadOrdersListRequested()),
    goToNewOrder: () => {
      dispatch(resetOrder());
      ownProps.history.push("/order/new");
    }
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(ConnectedHeader)
);
