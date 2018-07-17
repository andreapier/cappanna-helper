import React, { Component } from "react";
import { connect } from "react-redux";
import Footer from "components/Orders/New/Confirmation/Footer";
import { confirmOrder } from "actions";
import { withRouter } from "react-router-dom";

class ConnectedFooter extends Component {
  render() {
    return <Footer {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    order: state.newOrder,
    userId: state.user.userId
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    goBack: ownProps.history.goBack,
    confirmOrder: (order, userId) => dispatch(confirmOrder(order, userId))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ConnectedFooter)
);