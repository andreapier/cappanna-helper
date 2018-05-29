import React, { Component } from "react";
import { connect } from "react-redux";
import Footer from "components/Orders/Confirmation/Footer";
import history from "./../../../history";
import { confirmOrder } from "actions";

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

const mapDispatchToProps = dispatch => {
  return {
    goBack: history.goBack,
    confirmOrder: (order, userId) => dispatch(confirmOrder(order, userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedFooter);
